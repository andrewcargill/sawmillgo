import React, { useState, useEffect } from "react";
import { getFirestore, collection, addDoc, getDocs, collectionGroup, where, query } from "firebase/firestore";
import { app } from "../../../firebase-config";
import { getAuth } from "firebase/auth";
import ListEditTree from "./ListEditTrees";

const AddTreeForm = () => {
  const [treeData, setTreeData] = useState({
    woodType: "",
    date: "",
    locationId: "",
    image: "",
    reason: "",
    age: "",
    status: "available",
    logged: false,
  });

  const db = getFirestore(app);
  const auth = getAuth(app);
  const currentUserUID = auth.currentUser ? auth.currentUser.uid : null; // Gets the current user UID

  useEffect(() => {
    if (currentUserUID) {
      setTreeData(prevState => ({
        ...prevState,
        lumberjack: currentUserUID,
      }));
    }
  }, [currentUserUID]);

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setTreeData(prevState => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

//   const generateUniqueRefId = async () => {
//     const chars = ['E', 'F', 'H', 'L', 'N', 'T', 'V', 'X', 'Z', 'I'];
//     let refId = "";
//     let isUnique = false;

//     while (!isUnique) {
//       refId = "";
//       for (let i = 0; i < 4; i++) {
//         refId += chars[Math.floor(Math.random() * chars.length)];
//       }

//       const treesSnapshot = await getDocs(query(collectionGroup(db, 'trees'), where('refId', '==', refId)));
//       const logsSnapshot = await getDocs(query(collectionGroup(db, 'logs'), where('refId', '==', refId)));
//       const planksSnapshot = await getDocs(query(collectionGroup(db, 'planks'), where('refId', '==', refId)));


//       if (treesSnapshot.empty && logsSnapshot.empty && planksSnapshot.empty) {
//         isUnique = true;
//       }
//     }

//     return refId;
//   };

const generateUniqueRefId = async (db) => {
    const chars = ['E', 'F', 'H', 'L', 'N', 'T', 'V', 'X', 'Z', 'I'];
    let isUnique = false;
    let refId = "";

    while (!isUnique) {
        // Generate a 4-character RefId
        refId = "";
        for (let i = 0; i < 4; i++) {
            refId += chars[Math.floor(Math.random() * chars.length)];
        }

        // Use the db parameter to perform the collectionGroup query
        const treesQuery = query(collectionGroup(db, 'trees'), where('refId', '==', refId));
        const treesSnapshot = await getDocs(treesQuery);

        isUnique = treesSnapshot.empty; // If no documents are found, the refId is unique
    }

    return refId;
};
  

const handleSubmit = async (e) => {
    e.preventDefault();
    const userLocalStorage = JSON.parse(localStorage.getItem("user"));
    const sawmillId = userLocalStorage?.sawmillId;
  
    if (!sawmillId) {
      console.error("Sawmill ID is not available. Cannot add tree.");
      return;
    }
  
    try {
      // Generate a unique refId for the tree, ensuring to pass `db`
      const refId = await generateUniqueRefId(db);
  
      // Proceed to add the tree with the generated refId
      await addDoc(collection(db, `sawmill/${sawmillId}/trees`), { ...treeData, refId, lumberjack: currentUserUID });
      alert("Tree added successfully with RefId: " + refId);
  
      // Reset the form data
      setTreeData({
        woodType: "",
        date: "",
        locationId: "",
        image: "",
        reason: "",
        age: "",
        status: "available",
        logged: false,
        // Ensure to keep the lumberjack info if necessary
        lumberjack: currentUserUID,
      });
    } catch (error) {
      console.error("Error adding tree: ", error);
      alert(`Failed to add tree. Error: ${error.message}`);
      console.log(`${error.message}`);
    }
  };
  

  return (
    <div>
    <form onSubmit={handleSubmit}>
      <h3>Add New Tree</h3>
      {/* Wood Type */}
      <label>
        Wood Type:
        <input
          type="text"
          name="woodType"
          value={treeData.woodType}
          onChange={handleChange}
          required
        />
      </label>
      <br />

      {/* Date Planted */}
      <label>
        Date Planted:
        <input
          type="date"
          name="date"
          value={treeData.date}
          onChange={handleChange}
          required
        />
      </label>
      <br />

      {/* Location ID */}
      <label>
        Location ID:
        <input
          type="text"
          name="locationId"
          value={treeData.locationId}
          onChange={handleChange}
          required
        />
      </label>
      <br />

      {/* Lumberjack (User UID) */}
      <label>
        Lumberjack (User UID):
        <input
          type="text"
          name="lumberjack"
          value={treeData.lumberjack}
          onChange={handleChange}
          required
        />
      </label>
      <br />

      {/* Image URL */}
      <label>
        Image URL:
        <input
          type="url"
          name="image"
          value={treeData.image}
          onChange={handleChange}
        />
      </label>
      <br />

      {/* Reason for Planting */}
      <label>
        Reason:
        <input
          type="text"
          name="reason"
          value={treeData.reason}
          onChange={handleChange}
        />
      </label>
      <br />

      {/* Age */}
      <label>
        Age:
        <input
          type="text"
          name="age"
          value={treeData.age}
          onChange={handleChange}
          required
        />
      </label>
      <br />

      {/* Status */}
      <label>
        Status:
        <select name="status" value={treeData.status} onChange={handleChange}>
          <option value="available">Available</option>
          <option value="reserved">Reserved</option>
          <option value="sold">Sold</option>
        </select>
      </label>
      <br />

      {/* Logged */}

      <br />

      <button type="submit">Add Tree</button>
    </form>
    <div>
        
    </div>
    <ListEditTree />
     </div>
  );
};

export default AddTreeForm;
