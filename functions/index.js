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

exports.addTree = functions.firestore.document('sawmill/{sawmillId}/trees/{treeId}')
    .onCreate(async (snap, context) => {
        const db = admin.firestore(); // Ensure db is defined
        const sawmillId = context.params.sawmillId;
        const treeId = context.params.treeId;

        try {
            const refId = await generateUniqueRefId(db); // Pass db instance
            await db.collection('sawmill').doc(sawmillId).collection('trees').doc(treeId).update({ refId });

            console.log(`Assigned unique RefId ${refId} to tree ${treeId} in sawmill ${sawmillId}`);
        } catch (error) {
            console.error("Error assigning RefId:", error);
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
        projectID: "Initial Project",
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
        projectID: "Initial Project",
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
