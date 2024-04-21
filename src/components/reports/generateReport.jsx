import { getFirestore, doc, getDoc, addDoc, collection } from "firebase/firestore";
import { app } from "../../firebase-config"; // Adjust the import based on your actual Firebase config file

const generateReport = async (plankId) => {
  const db = getFirestore(app);
  const sawmillId = JSON.parse(localStorage.getItem("user"))?.sawmillId;

  try {
    // Fetching plank details
    const plankRef = doc(db, `sawmill/${sawmillId}/planks`, plankId);
    const plankSnap = await getDoc(plankRef);
    if (!plankSnap.exists()) throw new Error("Plank not found");

    const plankData = plankSnap.data();

    // Fetching log details
    const logRef = doc(db, `sawmill/${sawmillId}/logs`, plankData.logId);
    const logSnap = await getDoc(logRef);
    const logData = logSnap.exists() ? logSnap.data() : {};

    // Fetching tree details if available
    const treeData = {};
    if (logData.treeId) {
      const treeRef = doc(db, `sawmill/${sawmillId}/trees`, logData.treeId);
      const treeSnap = await getDoc(treeRef);
      if (treeSnap.exists()) Object.assign(treeData, treeSnap.data());
    }

    // Fetching sawmill details
    const sawmillRef = doc(db, `sawmill/${sawmillId}`);
    const sawmillSnap = await getDoc(sawmillRef);
    const sawmillData = sawmillSnap.exists() ? sawmillSnap.data() : {};

    // Assemble the report document
    const reportData = {
      sawmillName: sawmillData.name,
      sawmillLocation: sawmillData.location,
      plankDetails: {
        id: plankId,
        refId: plankData.refId,
        width: plankData.width,
        depth: plankData.depth,
        operatorId: plankData.operatorUID,
        operatorName: plankData.operatorName,
        date: plankData.date,
        grade: plankData.grade,
        notes: plankData.notes,
        image1: plankData.image1,
        image2: plankData.image2,
        species: plankData.species
      },
      logDetails: {
        date: logData.date,
        length: logData.length,
        diameter: logData.diameter,
        lumberjackName: logData.lumberjackName
      },
      treeDetails: treeData
    };

    // Save the report
    const reportRef = await addDoc(collection(db, `sawmill/${sawmillId}/reports`), reportData);
    console.log("Report generated successfully with ID:", reportRef.id);
  } catch (error) {
    console.error("Error generating report:", error);
  }
};
