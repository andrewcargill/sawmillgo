

const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

exports.updateSawmillNameInUserProfiles = functions.firestore
    .document('sawmill/{sawmillId}')
    .onUpdate(async (change, context) => {
        const newValue = change.after.data();
        const oldValue = change.before.data();

        if (newValue.name !== oldValue.name) {
            const sawmillId = context.params.sawmillId;
            const db = admin.firestore();
            const usersRef = db.collection('users');
            const snapshot = await usersRef.where('sawmillId', '==', sawmillId).get();

            if (!snapshot.empty) {
                let batch = db.batch();
                snapshot.forEach(doc => {
                    const userDocRef = usersRef.doc(doc.id);
                    batch.update(userDocRef, { 'sawmillName': newValue.name });
                });
                await batch.commit();
            }
        }
    });
