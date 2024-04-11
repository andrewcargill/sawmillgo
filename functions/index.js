const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();



async function generateUniqueRefId(db) {
  const chars = ['E', 'F', 'H', 'L', 'N', 'T', 'V', 'X', 'Z', 'I'];
  let isUnique = false;
  let refId = "";

  while (!isUnique) {
    refId = "";
    for (let i = 0; i < 4; i++) {
      refId += chars[Math.floor(Math.random() * chars.length)];
    }

    const treesSnapshot = await db.collectionGroup('trees').where('refId', '==', refId).get();
    const logsSnapshot = await db.collectionGroup('logs').where('refId', '==', refId).get();
    const planksSnapshot = await db.collectionGroup('planks').where('refId', '==', refId).get();

    if (treesSnapshot.empty && logsSnapshot.empty && planksSnapshot.empty) {
      isUnique = true;
    }
  }

  return refId;
}

// exports.updateTreeStatusOnProjectChange = functions.firestore.document('sawmill/{sawmillId}/projects/{projectId}')
//     .onUpdate(async (change, context) => {
//         const db = admin.firestore();
//         const projectId = context.params.projectId;
//         const newProjectStatus = change.after.data().status;
//         let newTreeStatus;

//         // Determine the new tree status based on the project's status
//         if (['active', 'paused'].includes(newProjectStatus)) {
//             newTreeStatus = 'reserved';
//         } else if (['sold', 'with creator'].includes(newProjectStatus)) {
//             newTreeStatus = 'sold';
//         } else {
//             console.log(`Unknown project status: ${newProjectStatus}`);
//             return null;
//         }

//         // Update the status of all trees associated with this project
//         const treesQuerySnapshot = await db.collectionGroup('trees')
//             .where('projectId', '==', projectId)
//             .get();

//         if (treesQuerySnapshot.empty) {
//             console.log('No trees found for the project');
//             return null;
//         }

//         const batch = db.batch();
//         treesQuerySnapshot.forEach(doc => {
//             batch.update(doc.ref, { status: newTreeStatus });
//         });

//         await batch.commit();
//         console.log(`Updated all trees for project ${projectId} to status ${newTreeStatus}`);
//     });


// exports.addTree = functions.firestore.document('sawmill/{sawmillId}/trees/{treeId}')
//     .onCreate(async (snap, context) => {
//         const db = admin.firestore(); // Ensure db is defined
//         const sawmillId = context.params.sawmillId;
//         const treeId = context.params.treeId;

//         try {
//             const refId = await generateUniqueRefId(db); // Pass db instance
//             await db.collection('sawmill').doc(sawmillId).collection('trees').doc(treeId).update({ refId });

//             console.log(`Assigned unique RefId ${refId} to tree ${treeId} in sawmill ${sawmillId}`);
//         } catch (error) {
//             console.error("Error assigning RefId:", error);
//         }
//     });

exports.updateTreeStatusAndProjectNameOnProjectChange = functions.firestore.document('sawmill/{sawmillId}/projects/{projectId}')
    .onUpdate(async (change, context) => {
        const db = admin.firestore();
        const projectId = context.params.projectId;
        const projectBeforeUpdate = change.before.data();
        const projectAfterUpdate = change.after.data();

        // Determine the new tree status based on the project's status
        let newTreeStatus;
        if (['active', 'paused'].includes(projectAfterUpdate.status)) {
            newTreeStatus = 'reserved';
        } else if (['sold', 'with creator'].includes(projectAfterUpdate.status)) {
            newTreeStatus = 'sold';
        } else {
            console.log(`Unknown project status: ${projectAfterUpdate.status}`);
            return null;
        }

        // Prepare updates for trees if the project name has changed
        let updates = { status: newTreeStatus };
        if (projectBeforeUpdate.projectName !== projectAfterUpdate.projectName) {
            updates.projectName = projectAfterUpdate.projectName;
        }

        // Update the status and, if necessary, projectName of all trees associated with this project
        const treesQuerySnapshot = await db.collectionGroup('trees')
            .where('projectId', '==', projectId)
            .get();

        if (treesQuerySnapshot.empty) {
            console.log('No trees found for the project');
            return null;
        }

        const batch = db.batch();
        treesQuerySnapshot.forEach(doc => {
            batch.update(doc.ref, updates);
        });

        await batch.commit();
        console.log(`Updated all trees for project ${projectId}. Changes: `, updates);
    });


    exports.onTreeUpdated = functions.firestore.document('sawmill/{sawmillId}/trees/{treeId}')
    .onUpdate(async (change, context) => {
        const db = admin.firestore();
        const sawmillId = context.params.sawmillId;
        const beforeData = change.before.data();
        const afterData = change.after.data();
        const projectIdBefore = beforeData.projectId;
        const projectIdAfter = afterData.projectId;

        // Initialize an object to hold potential updates for the tree document
        let treeUpdates = {};

        // Check if the projectId has been added or changed to a different one
        if (projectIdAfter && projectIdAfter !== projectIdBefore) {
            // Fetch the new project document to determine the tree's new status
            const projectRef = db.collection('sawmill').doc(sawmillId).collection('projects').doc(projectIdAfter);
            const projectSnap = await projectRef.get();

            if (!projectSnap.exists) {
                console.log(`Project with ID ${projectIdAfter} does not exist.`);
                return null;
            }

            const projectData = projectSnap.data();
            // Determine the new tree status based on the project's status
            if (['active', 'paused'].includes(projectData.status)) {
                treeUpdates.status = 'reserved';
            } else if (['sold', 'with creator'].includes(projectData.status)) {
                treeUpdates.status = 'sold';
            } else {
                console.log(`Unknown or unhandled project status: ${projectData.status}`);
                return null;
            }
        }

        // If the tree was removed from a project, set its status to 'available'
        if (projectIdBefore && !projectIdAfter) {
            treeUpdates.status = 'available';
        }

        // If there are updates to apply to the tree document, perform the update
        if (Object.keys(treeUpdates).length > 0) {
            await change.after.ref.update(treeUpdates);
            console.log(`Tree document ${context.params.treeId} updated with:`, treeUpdates);
        }

        return null; // End function execution if there's no projectId change
    });



exports.addTree = functions.firestore.document('sawmill/{sawmillId}/trees/{treeId}')
    .onCreate(async (snap, context) => {
        const db = admin.firestore(); // Ensure db is defined
        const sawmillId = context.params.sawmillId;
        const treeId = context.params.treeId;
        const treeData = snap.data();
        const projectId = treeData.projectId;

        try {
            // Generate a unique RefId for the tree
            const refId = await generateUniqueRefId(db);
            let updates = { refId };

            // If a projectId is specified, fetch the project to determine the tree's status
            if (projectId) {
                const projectRef = db.collection('sawmill').doc(sawmillId).collection('projects').doc(projectId);
                const projectSnap = await projectRef.get();

                if (!projectSnap.exists) {
                    console.log(`Project with ID ${projectId} does not exist.`);
                    return null;
                }

                const projectData = projectSnap.data();
                let newTreeStatus;

                // Determine the new tree status based on the project's status
                if (['active', 'paused'].includes(projectData.status)) {
                    newTreeStatus = 'reserved';
                } else if (['sold', 'with creator'].includes(projectData.status)) {
                    newTreeStatus = 'sold';
                } else {
                    console.log(`Unknown project status: ${projectData.status}`);
                    return null;
                }

                updates['status'] = newTreeStatus;
            }

            // Update the tree document with the new RefId and, if applicable, the new status
            await db.collection('sawmill').doc(sawmillId).collection('trees').doc(treeId).update(updates);
            console.log(`Assigned unique RefId ${refId} to tree ${treeId} in sawmill ${sawmillId} with status ${updates.status}.`);
        } catch (error) {
            console.error("Error processing tree:", error);
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
        treeId: "treeRef.id",
        refId: "Initial Log",
        date: "2023-04-01",
        diameter: 10,
        length: 10,
        operator: "UserUID",
        status: "available",
        locationId: "Initial Location",
        planked: false,
        projectID: null,
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
        thickness: 1,
        grade: "1",
        image1: "[url….to image]",
        image2: "[url….to image]",
        notes: "Initial Plank Notes",
        furniture: true,
        construction: false,
        liveEdge: false,
        general: false,
        status: "available",
        locationId: "Initial Location",
        projectID: null,
        stockType: "normal-stock",
      });

      await db
        .collection(`sawmill/${sawmillId}/planks/${plankRef.id}/moistureChecks`)
        .add({
          checkDate: "2023-04-12T14:00:00Z",
          moistureContent: 12.5,
          operator: "UserUID",
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
