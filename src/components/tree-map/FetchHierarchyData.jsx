import { collection, getDocs, doc, getDoc, getFirestore, query, where } from "firebase/firestore";
import { app } from "../../firebase-config";

export const fetchHierarchyData = async () => {
  const db = getFirestore(app);
  const sawmillId = JSON.parse(localStorage.getItem("user"))?.sawmillId;

  if (!sawmillId) {
    console.error("Sawmill ID not found in localStorage.");
    return null;
  }

  try {
    const treesRef = collection(db, `sawmill/${sawmillId}/trees`);
    const treesSnapshot = await getDocs(treesRef);

    const hierarchy = { name: "Forest", children: [] };

    for (const treeDoc of treesSnapshot.docs) {
      const treeData = treeDoc.data();
      const logs = [];

      if (treeData.logIds && Array.isArray(treeData.logIds)) {
        for (const logRefId of treeData.logIds) {
          // Query the logs collection to find logs with the matching refId
          const logsQuery = query(
            collection(db, `sawmill/${sawmillId}/logs`),
            where("refId", "==", logRefId)
          );
          const logsSnapshot = await getDocs(logsQuery);

          for (const logDoc of logsSnapshot.docs) {
            const logData = logDoc.data();
            const planks = [];

            if (logData.plankIds && Array.isArray(logData.plankIds)) {
                for (const plankId of logData.plankIds) {
                  // Query the planks collection to find the document where refId matches plankId
                  const plankQuery = query(
                    collection(db, `sawmill/${sawmillId}/planks`),
                    where("refId", "==", plankId)
                  );
                  const plankSnap = await getDocs(plankQuery);
              
                  // Check if any documents are found
                  if (!plankSnap.empty) {
                    plankSnap.forEach((doc) => {
                      const plankData = doc.data();
                      planks.push({
                        name: plankData.refId || "Unnamed Plank",
                        size: plankData.volume || 5, // Default volume to 10 if undefined
                      });
                    });
                  }
                }
              }
              

            logs.push({
              name: logData.refId || "Unnamed Log",
              children: planks,
            });
          }
        }
      } else {
        console.warn(`Tree with ID ${treeDoc.id} has no logIds or logIds is not an array.`);
      }

      hierarchy.children.push({
        name: treeData.refId || "Unnamed Tree",
        children: logs,
      });
    }

    return hierarchy;
  } catch (error) {
    console.error("Error fetching hierarchy data:", error);
    return null;
  }
};
