const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

exports.initializeSawmillSubcollections = functions.firestore
    .document("sawmill/{sawmillId}")
    .onCreate(async (snap, context) => {
        const sawmillId = context.params.sawmillId;
        const db = admin.firestore();

        // Example: Initialize a 'trees' subcollection with a default document
        const defaultTree = {
            date: "2023-04-01",
            woodType: "Pine",
            locationId: "Initial Location",
            lumberjack: "UserUID",
            image: "[url….to image]",
            reason: "tree was too old",
            age: "40-60",
            status: "available",
            logged: false
        };

        // Example path: "sawmills/{sawmillId}/trees/{treeId}"
        // You might want to create specific IDs for each sub-document or let Firestore generate them
        await db.collection(`sawmill/${sawmillId}/trees`).add(defaultTree);

        // Repeat the process for other subcollections ('logs', 'planks', etc.) as necessary
        // Note: Creating an empty subcollection is not possible in Firestore as collections are schema-less
        // and only exist when there's at least one document within them.
        
        // If you want to initialize subcollections without any documents, you can omit the document creation step.
        // However, keep in mind these subcollections won't "exist" until a document is actually added to them.

        return null; // Cloud Functions expect a return, use null for Firestore triggers.
    });
