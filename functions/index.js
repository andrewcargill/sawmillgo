const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

exports.initializeSawmillSubcollections = functions.firestore
  .document("sawmill/{sawmillId}")
  .onCreate(async (snap, context) => {
    const sawmillId = context.params.sawmillId;
    const db = admin.firestore();

    try {
      const treeRef = await db.collection(`sawmill/${sawmillId}/trees`).add({
        refId: "Initial Tree",
        date: "2023-04-01",
        woodType: "Pine",
        locationId: "Initial Location",
        lumberjack: "UserUID",
        image: "[url….to image]",
        reason: "tree was too old",
        age: "40-60",
        status: "available",
        logged: false,
        latitude: 0.0,
        longitude: 0.0,
        projectID: "Initial Project",
      });

      // Create an initial log document under the tree
      const logRef = await db
        .collection(`sawmill/${sawmillId}/trees/${treeRef.id}/logs`)
        .add({
          refId: "Initial Log",
          date: "2023-04-01",
          diameter: 10,
          length: 10,
          operator: "UserUID",
          status: "available",
          locationId: "Initial Location",
          planked: false,
          projectID: "Initial Project",
        });

      // Create an initial plank document under the log
      await db
        .collection(
          `sawmill/${sawmillId}/trees/${treeRef.id}/logs/${logRef.id}/planks`
        )
        .add({
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
          projectID: "Initial Project",
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

      await db.collection(`sawmill/${sawmillId}/projects`).add({
        creatorId: "UserUID",
        projectName: "Initial Project",
        customerName: "Initial Customer",
        status: "active",
        createdBy: "UserUID",
        SawmillName: "Initial Sawmill",
      });
    } catch (error) {
      console.error("Error initializing sawmill subcollections:", error);

    }

    return null;
  });
