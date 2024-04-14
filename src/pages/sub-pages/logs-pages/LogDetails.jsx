import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc, getFirestore } from 'firebase/firestore';
import { app } from '../../../firebase-config';

const LogDetails = () => {
  const [logDetails, setLogDetails] = useState(null);
  const { logId } = useParams();
  const db = getFirestore(app);
  const sawmillId = JSON.parse(localStorage.getItem("user"))?.sawmillId;


  useEffect(() => {
    const fetchLogDetails = async () => {
      const docRef = doc(db, `sawmill/${sawmillId}/logs`, logId);  // Ensure you have the correct path and possibly sawmillId
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setLogDetails(docSnap.data());
      } else {
        console.log("No such document!");
      }
    };

    fetchLogDetails();
  }, [logId]);

  return (
    <div>
      {logDetails ? (
        <div>
          <h1>Log Details</h1>
          <p>Species: {logDetails.speciesName}</p>
          <p>lumberjack Name: {logDetails.lumberjackName}</p>
          <p>Diameter: {logDetails.diameter}</p>
          <p>Length: {logDetails.length}</p>
          <p>Date: {logDetails.date}</p>
          <p>Planked: {logDetails.planked ? 'Yes': 'No' }</p>
          <p>Status: {logDetails.status}</p>
          <br />
          {logDetails.treeId && (
            <>
          <p>If certified:</p>
          <p>Tree Id: {logDetails.treeId}</p>
          <p> (p/h)Lumberjack: John Smith</p>
          <p>(p/h)Felled: 2023-04-01</p>
          </>
          )}
        


          {/* Add more fields as needed */}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default LogDetails;
