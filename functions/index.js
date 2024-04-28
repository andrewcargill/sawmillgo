const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

async function generateUniqueRefId(db) {
  const chars = ["E", "F", "H", "L", "N", "T", "V", "X", "Z", "I"];
  let isUnique = false;
  let refId = "";

  while (!isUnique) {
    refId = "";
    for (let i = 0; i < 4; i++) {
      refId += chars[Math.floor(Math.random() * chars.length)];
    }

    const treesSnapshot = await db
      .collectionGroup("trees")
      .where("refId", "==", refId)
      .get();
    const logsSnapshot = await db
      .collectionGroup("logs")
      .where("refId", "==", refId)
      .get();
    const planksSnapshot = await db
      .collectionGroup("planks")
      .where("refId", "==", refId)
      .get();

    if (treesSnapshot.empty && logsSnapshot.empty && planksSnapshot.empty) {
      isUnique = true;
    }
  }
  return refId;
}

exports.updateItemsOnProjectChange = functions.firestore
  .document("sawmill/{sawmillId}/projects/{projectId}")
  .onUpdate(async (change, context) => {
    const db = admin.firestore();
    const projectId = context.params.projectId;
    const projectBeforeUpdate = change.before.data();
    const projectAfterUpdate = change.after.data();

    // Determine the new status based on the project's status
    let newItemStatus;
    if (["active", "paused"].includes(projectAfterUpdate.status)) {
      newItemStatus = "reserved";
    } else if (["sold", "with creator"].includes(projectAfterUpdate.status)) {
      newItemStatus = "sold";
    } else {
      console.log(`Unknown project status: ${projectAfterUpdate.status}`);
      return null;
    }

    // Prepare updates if the project name or status has changed
    let updates = { status: newItemStatus };
    if (projectBeforeUpdate.projectName !== projectAfterUpdate.projectName) {
      updates.projectName = projectAfterUpdate.projectName;
    }

    // Define the types of items to update
    const itemTypes = ["trees", "logs", "planks"];

    // Update each type of item in a batch
    for (const itemType of itemTypes) {
      const itemsQuerySnapshot = await db
        .collectionGroup(itemType)
        .where("projectId", "==", projectId)
        .get();

      if (!itemsQuerySnapshot.empty) {
        const batch = db.batch();
        itemsQuerySnapshot.forEach((doc) => {
          batch.update(doc.ref, updates);
        });
        await batch.commit();
        console.log(
          `Updated all ${itemType} for project ${projectId}. Changes: `,
          updates
        );
      }
    }
  });

exports.resetItemsOnProjectDeletion = functions.firestore
  .document("sawmill/{sawmillId}/projects/{projectId}")
  .onDelete(async (snapshot, context) => {
    const db = admin.firestore();
    const projectId = context.params.projectId;

    // Define the types of items to reset
    const itemTypes = ["trees", "logs", "planks"];
    const resets = {
      projectId: admin.firestore.FieldValue.delete(),
      projectName: admin.firestore.FieldValue.delete(),
    };

    // Reset each type of item in a batch
    for (const itemType of itemTypes) {
      const itemsQuerySnapshot = await db
        .collectionGroup(itemType)
        .where("projectId", "==", projectId)
        .get();

      if (!itemsQuerySnapshot.empty) {
        const batch = db.batch();
        itemsQuerySnapshot.forEach((doc) => {
          batch.update(doc.ref, resets);
        });
        await batch.commit();
        console.log(
          `Reset projectId and projectName for all ${itemType} where projectId was ${projectId}`
        );
      }
    }
  });

exports.onTreeUpdated = functions.firestore
  .document("sawmill/{sawmillId}/trees/{treeId}")
  .onUpdate(async (change, context) => {
    const db = admin.firestore();
    const sawmillId = context.params.sawmillId;
    const beforeData = change.before.data();
    const afterData = change.after.data();
    const projectIdBefore = beforeData.projectId;
    const projectIdAfter = afterData.projectId;
    const treeRefId = afterData.refId; // Use the refId from the tree's data

    let treeUpdates = {};

    // Handle project switch or removal
    if (projectIdAfter !== projectIdBefore) {
      // Handle removal from the old project
      if (projectIdBefore) {
        const oldProjectRef = db
          .collection("sawmill")
          .doc(sawmillId)
          .collection("projects")
          .doc(projectIdBefore);
        await oldProjectRef.update({
          treeRefIds: admin.firestore.FieldValue.arrayRemove(treeRefId),
        });
      }

      // Handle addition to the new project
      if (projectIdAfter) {
        const newProjectRef = db
          .collection("sawmill")
          .doc(sawmillId)
          .collection("projects")
          .doc(projectIdAfter);
        const newProjectSnap = await newProjectRef.get();

        if (!newProjectSnap.exists) {
          console.log(`Project with ID ${projectIdAfter} does not exist.`);
          return null;
        }

        const newProjectData = newProjectSnap.data();
        let newTreeStatus;

        if (["active", "paused"].includes(newProjectData.status)) {
          newTreeStatus = "reserved";
        } else if (["sold", "with creator"].includes(newProjectData.status)) {
          newTreeStatus = "sold";
        } else {
          console.log(`Unhandled project status: ${newProjectData.status}`);
          return null;
        }

        // Update the new project with the treeRefId
        await newProjectRef.update({
          treeRefIds: admin.firestore.FieldValue.arrayUnion(treeRefId),
        });

        // Set the new status for the tree
        treeUpdates.status = newTreeStatus;
      } else {
        // If no new project is assigned, set tree status to 'available'
        treeUpdates.status = "available";
      }
    }

    // Apply updates to the tree document
    if (Object.keys(treeUpdates).length > 0) {
      await change.after.ref.update(treeUpdates);
      console.log(`Tree document updated with:`, treeUpdates);
    }

    return null; // End function execution if there's no projectId change
  });

exports.onTreeDeleted = functions.firestore
  .document("sawmill/{sawmillId}/trees/{treeId}")
  .onDelete(async (snap, context) => {
    const db = admin.firestore();
    const sawmillId = context.params.sawmillId;
    const treeId = context.params.treeId;
    const treeData = snap.data();
    const projectId = treeData.projectId;
    const treeRefId = treeData.refId; // Ensure the tree document includes refId

    if (projectId) {
      const projectRef = db
        .collection("sawmill")
        .doc(sawmillId)
        .collection("projects")
        .doc(projectId);

      // Remove the tree's refId from the project's treeRefIds array
      try {
        await projectRef.update({
          treeRefIds: admin.firestore.FieldValue.arrayRemove(treeRefId),
        });
        console.log(
          `Removed tree refId ${treeRefId} from project ${projectId} upon deletion.`
        );
      } catch (error) {
        console.error("Error removing tree refId from project:", error);
      }
    }

    return null;
  });

exports.addTree = functions.firestore
  .document("sawmill/{sawmillId}/trees/{treeId}")
  .onCreate(async (snap, context) => {
    const db = admin.firestore(); // Ensure db is defined
    const sawmillId = context.params.sawmillId;
    const treeId = context.params.treeId;
    const treeData = snap.data();
    const projectId = treeData.projectId;

    try {
      // Generate a unique RefId for the tree
      const refId = await generateUniqueRefId(db);
      let updates = {
        refId: refId,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      };

      // If a projectId is specified, fetch the project to determine the tree's status
      if (projectId) {
        const projectRef = db
          .collection("sawmill")
          .doc(sawmillId)
          .collection("projects")
          .doc(projectId);
        const projectSnap = await projectRef.get();

        if (!projectSnap.exists) {
          console.log(`Project with ID ${projectId} does not exist.`);
          return null;
        }

        const projectData = projectSnap.data();
        let newTreeStatus;

        // Determine the new tree status based on the project's status
        if (["active", "paused"].includes(projectData.status)) {
          newTreeStatus = "reserved";
        } else if (["sold", "with creator"].includes(projectData.status)) {
          newTreeStatus = "sold";
        } else {
          console.log(`Unknown project status: ${projectData.status}`);
          return null;
        }

        updates["status"] = newTreeStatus;

        // Update the project document by adding the tree's refId to the project's treeRefIds array
        await projectRef.update({
          treeRefIds: admin.firestore.FieldValue.arrayUnion(refId),
        });
      }

      // Update the tree document with the new RefId and, if applicable, the new status
      await db
        .collection("sawmill")
        .doc(sawmillId)
        .collection("trees")
        .doc(treeId)
        .update(updates);
      console.log(
        `Assigned unique RefId ${refId} to tree ${treeId} in sawmill ${sawmillId} with status ${updates.status}.`
      );
    } catch (error) {
      console.error("Error processing tree:", error);
    }
  });

exports.addLog = functions.firestore
  .document("sawmill/{sawmillId}/logs/{logId}")
  .onCreate(async (snap, context) => {
    const db = admin.firestore();
    const sawmillId = context.params.sawmillId;
    const logId = context.params.logId;
    const logData = snap.data();
    const projectId = logData.projectId;
    const treeId = logData.treeId; // Assume treeId is part of log data

    try {
      // Generate a unique RefId for the log and set the createdAt timestamp
      const refId = await generateUniqueRefId(db);
      let updates = {
        refId: refId,
        createdAt: admin.firestore.FieldValue.serverTimestamp(), // Adding createdAt timestamp
      };

      if (projectId) {
        const projectRef = db
          .collection("sawmill")
          .doc(sawmillId)
          .collection("projects")
          .doc(projectId);
        const projectSnap = await projectRef.get();
        if (!projectSnap.exists) {
          console.log(`Project with ID ${projectId} does not exist.`);
          return null;
        }

        const projectData = projectSnap.data();
        updates["status"] = ["active", "paused"].includes(projectData.status)
          ? "reserved"
          : ["sold", "with creator"].includes(projectData.status)
          ? "sold"
          : null;
        if (!updates["status"]) {
          console.log(`Unknown project status: ${projectData.status}`);
          return null;
        }

        //update project document by adding the log's refId to the project's logRefIds array
        await projectRef.update({
          logRefIds: admin.firestore.FieldValue.arrayUnion(refId),
        });
      }

      // Update the log document with the new RefId, createdAt timestamp, and status
      await db
        .collection("sawmill")
        .doc(sawmillId)
        .collection("logs")
        .doc(logId)
        .update(updates);

      // If treeId exists, update the corresponding tree document
      if (treeId) {
        const treesCollection = db
          .collection("sawmill")
          .doc(sawmillId)
          .collection("trees");
        const querySnapshot = await treesCollection
          .where("refId", "==", treeId)
          .limit(1)
          .get();
        if (!querySnapshot.empty) {
          const treeDoc = querySnapshot.docs[0]; // Get the first document that matches
          await db.runTransaction(async (transaction) => {
            const treeData = treeDoc.data();
            const logIds = treeData.logIds || [];
            if (!logIds.includes(refId)) {
              // Ensure plankRefId is passed correctly
              logIds.push(refId); // Add the plank's refId to the array
              transaction.update(treeDoc.ref, { logIds: logIds });
            } else {
              console.warn("Log ID already exists in the tree's LogIds array.");
            }
          });
        } else {
          throw new Error(`No tree found with refId: ${treeId}`);
        }
      } else {
        throw new Error("treeId is undefined or not provided.");
      }
      console.log(
        `Assigned unique RefId ${refId} to log ${logId} in sawmill ${sawmillId}. Status: ${updates.status}`
      );
    } catch (error) {
      console.error("Error processing log:", error);
    }
  });

exports.onLogUpdated = functions.firestore
  .document("sawmill/{sawmillId}/logs/{logId}")
  .onUpdate(async (change, context) => {
    const db = admin.firestore();
    const sawmillId = context.params.sawmillId;
    const beforeData = change.before.data();
    const afterData = change.after.data();
    const projectIdBefore = beforeData.projectId;
    const projectIdAfter = afterData.projectId;
    const logRefId = afterData.refId; // Use the refId from the log's data

    let logUpdates = {};

    // Handle project switch or removal
    if (projectIdAfter !== projectIdBefore) {
      // Handle removal from the old project
      if (projectIdBefore) {
        const oldProjectRef = db
          .collection("sawmill")
          .doc(sawmillId)
          .collection("projects")
          .doc(projectIdBefore);
        await oldProjectRef.update({
          logRefIds: admin.firestore.FieldValue.arrayRemove(logRefId),
        });
      }

      // Handle addition to the new project
      if (projectIdAfter) {
        const newProjectRef = db
          .collection("sawmill")
          .doc(sawmillId)
          .collection("projects")
          .doc(projectIdAfter);
        const newProjectSnap = await newProjectRef.get();

        if (!newProjectSnap.exists) {
          console.log(`Project with ID ${projectIdAfter} does not exist.`);
          return null;
        }

        const newProjectData = newProjectSnap.data();
        let newLogStatus;

        if (["active", "paused"].includes(newProjectData.status)) {
          newLogStatus = "reserved";
        } else if (["sold", "with creator"].includes(newProjectData.status)) {
          newLogStatus = "sold";
        } else {
          console.log(`Unhandled project status: ${newProjectData.status}`);
          return null;
        }

        // Update the new project with the logRefId
        await newProjectRef.update({
          logRefIds: admin.firestore.FieldValue.arrayUnion(logRefId),
        });

        // Set the new status for the log
        logUpdates.status = newLogStatus;
      } else {
        // If no new project is assigned, set log status to 'available'
        logUpdates.status = "available";
      }
    }

    // Apply updates to the log document
    if (Object.keys(logUpdates).length > 0) {
      await change.after.ref.update(logUpdates);
      console.log(`Log document updated with:`, logUpdates);
    }

    return null; // End function execution if there's no projectId change
  });

exports.onLogDeleted = functions.firestore
  .document("sawmill/{sawmillId}/logs/{logId}")
  .onDelete(async (snap, context) => {
    const db = admin.firestore();
    const sawmillId = context.params.sawmillId;
    const logData = snap.data();
    const projectId = logData.projectId;
    const logRefId = logData.refId; // Ensure the log document includes refId
    const treeId = logData.treeId; // The refId of the tree this log is associated with

    // Remove the log's refId from the associated project
    if (projectId) {
      const projectRef = db
        .collection("sawmill")
        .doc(sawmillId)
        .collection("projects")
        .doc(projectId);
      try {
        await projectRef.update({
          logRefIds: admin.firestore.FieldValue.arrayRemove(logRefId),
        });
        console.log(
          `Removed log refId ${logRefId} from project ${projectId} upon deletion.`
        );
      } catch (error) {
        console.error("Error removing log refId from project:", error);
      }
    }
    // Remove the log's refId from the associated tree
    if (treeId) {
      const treeRef = db
        .collection("sawmill")
        .doc(sawmillId)
        .collection("trees")
        .where("refId", "==", treeId);
      const querySnapshot = await treeRef.get();

      if (!querySnapshot.empty) {
        const treeDoc = querySnapshot.docs[0]; // Assuming only one tree will have this refId
        try {
          await treeDoc.ref.update({
            logIds: admin.firestore.FieldValue.arrayRemove(logRefId),
          });
          console.log(`Removed log refId ${logRefId} from tree ${treeId}.`);
        } catch (error) {
          console.error(`Error removing log refId from tree ${treeId}:`, error);
        }
      } else {
        console.log(
          `No tree found with refId ${treeId}, no log refId removal needed.`
        );
      }
    }

    return null;
  });

exports.addPlank = functions.firestore
  .document("sawmill/{sawmillId}/planks/{plankId}")
  .onCreate(async (snap, context) => {
    const db = admin.firestore();
    const sawmillId = context.params.sawmillId;
    const plankId = context.params.plankId;
    const plankData = snap.data();
    const projectId = plankData.projectId;
    const logId = plankData.logId; // Assuming logId is stored in plank data

    try {
      const refId = await generateUniqueRefId(db);

      let updates = {
        refId: refId,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      };

      if (projectId) {
        const projectRef = db
          .collection("sawmill")
          .doc(sawmillId)
          .collection("projects")
          .doc(projectId);
        const projectSnap = await projectRef.get();

        if (!projectSnap.exists) {
          console.log(`Project with ID ${projectId} does not exist.`);
          return null;
        }

        const projectData = projectSnap.data();
        let newPlankStatus =
          projectData.status === "active" || projectData.status === "paused"
            ? "reserved"
            : projectData.status === "sold" ||
              projectData.status === "with creator"
            ? "sold"
            : null;

        if (newPlankStatus) {
          updates["status"] = newPlankStatus;
        } else {
          console.log(`Unknown project status: ${projectData.status}`);
          return null;
        }

        // Update the project document by adding the planks refId to the project's plankRefIds array
        await projectRef.update({
          plankRefIds: admin.firestore.FieldValue.arrayUnion(refId),
        });
      }

      // First, update the plank document with refId and possibly status
      await db
        .collection("sawmill")
        .doc(sawmillId)
        .collection("planks")
        .doc(plankId)
        .update(updates);

      // If a logId is provided, update the corresponding log document
      if (logId) {
        // Adjust query to find log by a 'refId' field
        const logsCollection = db
          .collection("sawmill")
          .doc(sawmillId)
          .collection("logs");
        const querySnapshot = await logsCollection
          .where("refId", "==", logId)
          .limit(1)
          .get();
        if (!querySnapshot.empty) {
          const logDoc = querySnapshot.docs[0]; // Get the first document that matches
          await db.runTransaction(async (transaction) => {
            const logData = logDoc.data();
            const plankIds = logData.plankIds || [];
            if (!plankIds.includes(refId)) {
              // Ensure plankRefId is passed correctly
              plankIds.push(refId); // Add the plank's refId to the array
              transaction.update(logDoc.ref, { plankIds: plankIds });
            } else {
              console.warn(
                "Plank ID already exists in the log's plankIds array."
              );
            }
          });
        } else {
          throw new Error(`No log found with refId: ${logId}`);
        }
      } else {
        throw new Error("logId is undefined or not provided.");
      }

      console.log(
        `Assigned unique RefId ${refId} to plank ${plankId} in sawmill ${sawmillId}. Status: ${
          updates.status || "N/A"
        }`
      );
    } catch (error) {
      console.error("Error processing plank:", error);
    }
  });

exports.onPlankUpdated = functions.firestore
  .document("sawmill/{sawmillId}/planks/{plankId}")
  .onUpdate(async (change, context) => {
    const db = admin.firestore();
    const sawmillId = context.params.sawmillId;
    const beforeData = change.before.data();
    const afterData = change.after.data();
    const projectIdBefore = beforeData.projectId;
    const projectIdAfter = afterData.projectId;
    const plankRefId = afterData.refId; // Use the refId from the plank's data

    let plankUpdates = {};

    // Handle project switch or removal
    if (projectIdAfter !== projectIdBefore) {
      // Handle removal from the old project
      if (projectIdBefore) {
        const oldProjectRef = db
          .collection("sawmill")
          .doc(sawmillId)
          .collection("projects")
          .doc(projectIdBefore);
        await oldProjectRef.update({
          plankRefIds: admin.firestore.FieldValue.arrayRemove(plankRefId),
        });
      }

      // Handle addition to the new project
      if (projectIdAfter) {
        const newProjectRef = db
          .collection("sawmill")
          .doc(sawmillId)
          .collection("projects")
          .doc(projectIdAfter);
        const newProjectSnap = await newProjectRef.get();

        if (!newProjectSnap.exists) {
          console.log(`Project with ID ${projectIdAfter} does not exist.`);
          return null;
        }

        const newProjectData = newProjectSnap.data();
        let newPlankStatus;

        if (["active", "paused"].includes(newProjectData.status)) {
          newPlankStatus = "reserved";
        } else if (["sold", "with creator"].includes(newProjectData.status)) {
          newPlankStatus = "sold";
        } else {
          console.log(`Unhandled project status: ${newProjectData.status}`);
          return null;
        }

        // Update the new project with the plankRefId
        await newProjectRef.update({
          plankRefIds: admin.firestore.FieldValue.arrayUnion(plankRefId),
        });

        // Set the new status for the plank
        plankUpdates.status = newPlankStatus;
      } else {
        // If no new project is assigned, set plank status to 'available'
        plankUpdates.status = "available";
      }
    }

    // Apply updates to the plank document
    if (Object.keys(plankUpdates).length > 0) {
      await change.after.ref.update(plankUpdates);
      console.log(`Plank document updated with:`, plankUpdates);
    }

    return null; // End function execution if there's no projectId change
  });

exports.onPlankDeleted = functions.firestore
  .document("sawmill/{sawmillId}/planks/{plankId}")
  .onDelete(async (snap, context) => {
    const db = admin.firestore();
    const sawmillId = context.params.sawmillId;
    const plankData = snap.data();
    const projectId = plankData.projectId;
    const plankRefId = plankData.refId; // Ensure the plank document includes refId
    const logRefId = plankData.logId; // The refId of the log this plank is associated with

    // Remove plank refId from associated project
    if (projectId) {
      const projectRef = db
        .collection("sawmill")
        .doc(sawmillId)
        .collection("projects")
        .doc(projectId);
      try {
        await projectRef.update({
          plankRefIds: admin.firestore.FieldValue.arrayRemove(plankRefId),
        });
        console.log(
          `Removed plank refId ${plankRefId} from project ${projectId} upon deletion.`
        );
      } catch (error) {
        console.error("Error removing plank refId from project:", error);
      }
    }

    // Remove plank refId from associated log by querying logRefId
    if (logRefId) {
      const logsRef = db
        .collection("sawmill")
        .doc(sawmillId)
        .collection("logs");
      const querySnapshot = await logsRef.where("refId", "==", logRefId).get();

      if (!querySnapshot.empty) {
        const logDoc = querySnapshot.docs[0]; // Assuming only one log will have this refId
        try {
          await logDoc.ref.update({
            plankIds: admin.firestore.FieldValue.arrayRemove(plankRefId),
          });
          console.log(
            `Removed plank refId ${plankRefId} from log ${logRefId}.`
          );
        } catch (error) {
          console.error(
            `Error removing plank refId from log ${logRefId}:`,
            error
          );
        }
      } else {
        console.log(
          `No log found with refId ${logRefId}, no plank refId removal needed.`
        );
      }
    }

    return null;
  });

  //Tracks movement of items in the sawmill
  // exports.trackItemCreationAndUpdate = functions.firestore
  // .document('sawmill/{sawmillId}/{itemType}/{itemId}')
  // .onWrite(async (change, context) => {
  //   const db = admin.firestore();
  //   const sawmillId = context.params.sawmillId;
  //   const itemType = context.params.itemType;
  //   const itemId = context.params.itemId;
  //   const dataAfter = change.after.exists ? change.after.data() : null;
  //   const dataBefore = change.before.exists ? change.before.data() : null;

  //   // Handle item creation
  //   if (!change.before.exists && change.after.exists) {
  //     // Item is being created, log the initial location as a 'movement'
  //     const initialMovement = {
  //       fromLocation: 'N/A',  // Since it's a new creation, there is no 'from' location
  //       toLocation: dataAfter.locationId,
  //       timestamp: admin.firestore.FieldValue.serverTimestamp(),
  //       action: 'Created' // Additional field to indicate the nature of the movement
  //     };

  //     try {
  //       await db.doc(`sawmill/${sawmillId}/${itemType}/${itemId}`)
  //         .collection('movements')
  //         .add(initialMovement);
  //       console.log(`Initial movement logged for new ${itemType} ${itemId}`);
  //     } catch (error) {
  //       console.error("Error logging initial movement: ", error);
  //     }
  //   }

  //   // Handle location updates
  //   if (change.before.exists && change.after.exists && dataBefore.locationId !== dataAfter.locationId) {
  //     const updateMovement = {
  //       fromLocation: dataBefore.locationId,
  //       toLocation: dataAfter.locationId,
  //       timestamp: admin.firestore.FieldValue.serverTimestamp(),
  //       action: 'Moved' // Indicates this is a relocation
  //     };

  //     try {
  //       await db.doc(`sawmill/${sawmillId}/${itemType}/${itemId}`)
  //         .collection('movements')
  //         .add(updateMovement);
  //       console.log(`Movement logged for ${itemType} ${itemId} from ${dataBefore.locationId} to ${dataAfter.locationId}`);
  //     } catch (error) {
  //       console.error("Error logging movement on update: ", error);
  //     }
  //   }
  // });

  exports.trackItemCreationAndUpdate = functions.firestore
  .document('sawmill/{sawmillId}/{itemType}/{itemId}')
  .onWrite(async (change, context) => {
    const db = admin.firestore();
    const sawmillId = context.params.sawmillId;
    const itemType = context.params.itemType;
    const itemId = context.params.itemId;
    const dataAfter = change.after.exists ? change.after.data() : null;
    const dataBefore = change.before.exists ? change.before.data() : null;

    // Handle item creation
    if (!change.before.exists && change.after.exists) {
      const initialMovement = {
        fromLocation: 'N/A',  // Since it's a new creation, there is no 'from' location
        toLocation: dataAfter.locationId,
        toLocationName: dataAfter.locationName || 'Unknown Location', // Use locationName field if available, otherwise default to 'Unknown Location'
        timestamp: admin.firestore.FieldValue.serverTimestamp(),
        action: 'Created' // Additional field to indicate the nature of the movement
      };

      try {
        await db.doc(`sawmill/${sawmillId}/${itemType}/${itemId}`)
          .collection('movements')
          .add(initialMovement);
        console.log(`Initial movement logged for new ${itemType} ${itemId}`);
      } catch (error) {
        console.error("Error logging initial movement: ", error);
      }
    }

    // Handle location updates
    if (change.before.exists && change.after.exists && dataBefore.locationId !== dataAfter.locationId) {
      const updateMovement = {
        fromLocation: dataBefore.locationId,
        fromLocationName: dataBefore.locationName || 'Unknown Location', // Use locationName field if available, otherwise default to 'Unknown Location'
        toLocation: dataAfter.locationId,
        toLocationName: dataAfter.locationName || 'Unknown Location', // Use locationName field if available, otherwise default to 'Unknown Location'
        timestamp: admin.firestore.FieldValue.serverTimestamp(),
        action: 'Moved' // Indicates this is a relocation
      };

      try {
        await db.doc(`sawmill/${sawmillId}/${itemType}/${itemId}`)
          .collection('movements')
          .add(updateMovement);
        console.log(`Movement logged for ${itemType} ${itemId} from ${dataBefore.locationId} to ${dataAfter.locationId}`);
      } catch (error) {
        console.error("Error logging movement on update: ", error);
      }
    }
  });


exports.initializeSawmillSubcollections = functions.firestore
  .document("sawmill/{sawmillId}")
  .onCreate(async (snap, context) => {
    const sawmillId = context.params.sawmillId;
    const db = admin.firestore();

    try {
      const treeRef = await db.collection(`sawmill/${sawmillId}/trees`).add({
        refId: "Initial Tree",
        date: "2023-04-01",
        speciesId: "",
        speciesName: "Pine",
        locationId: "Initial Location",
        locationName: "Initial Location Name",
        lumberjack: "UserUID",
        image: "[url….to image]",
        reason: "tree was too old",
        age: "40-60",
        status: "available",
        logged: false,
        latitude: 0.0,
        longitude: 0.0,
        projectId: null,
        projectName: null,
      });

      // Create an initial log document under the tree
      const logRef = await db.collection(`sawmill/${sawmillId}/logs`).add({
        treeId: "",
        refId: "Initial Log",
        date: "2023-04-01",
        species: "Pine",
        diameter: 10,
        length: 10,
        lumberjackUid: "UserUID",
        lumberjackName: "John Doe",
        status: "available",
        locationId: "Initial Location",
        locationName: "Initial Location Name",
        planked: false,
        projectId: null,
        projectName: null,
        verified: false,
      });

      // Create an initial plank document under the log
      const plankRef = await db.collection(`sawmill/${sawmillId}/planks`).add({
        logId: "logRef.id",
        refId: "Initial Plank",
        operator: "UserUID",
        date: "2023-04-01",
        length: 10,
        width: 10,
        depth: 1,
        grade: "1",
        image1: "[url….to image]",
        image2: "[url….to image]",
        notes: "Initial Plank Notes",
        furniture: true,
        construction: false,
        liveEdge: false,
        general: false,
        status: "available",
        speciesId: null,
        locationId: "Initial Location",
        projectId: null,
        stockType: "normal-stock",
      });

      await db
        .collection(`sawmill/${sawmillId}/planks/${plankRef.id}/moistureChecks`)
        .add({
          checkDate: "2023-04-12T14:00:00Z",
          moistureContent: 12.5,
          operator: "UserUID",
          operatorName: "John Doe",
        });

      await db.collection(`sawmill/${sawmillId}/locations`).add({
        name: "Initial Area",
        description: "Initial Location Description",
        type: "Drying",
      });

      await db.collection(`sawmill/${sawmillId}/movements`).add({
        itemID: "Initial Item",
        itemType: "Tree",
        fromLocation: "Initial Location",
        toLocation: "Second Location",
        timestamp: "2023-04-01",
        operator: "UserUID",
      });

      await db.collection(`sawmill/${sawmillId}/species`).add({
        name: "Initial Species",
        description: "Initial Species Description",
      });

      await db.collection(`sawmill/${sawmillId}/projects`).add({
        creatorId: "UserUID",
        projectName: "Initial Project",
        customerName: "Initial Customer",
        status: "active",
        createdBy: "UserUID",
        SawmillName: "Initial Sawmill",
        date: "2023-04-01",
        deadline: "2023-04-30",
        projectInfo: "Initial Project Info",
        notes: "Initial Project Notes",
        image: "[url….to image]",
      });
    } catch (error) {
      console.error("Error initializing sawmill subcollections:", error);
    }

    return null;
  });
