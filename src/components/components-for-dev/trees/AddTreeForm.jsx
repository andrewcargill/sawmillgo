import React, { useState, useEffect } from "react";
import { getFirestore, collection, addDoc } from "firebase/firestore";
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
    // If there is a current user, set the lumberjack field to the user's UID
    if (currentUserUID) {
      setTreeData((prevState) => ({
        ...prevState,
        lumberjack: currentUserUID,
      }));
    }
  }, [currentUserUID]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setTreeData((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
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
      const treesRef = collection(db, `sawmill/${sawmillId}/trees`);
      await addDoc(treesRef, treeData);
      alert("Tree added successfully!");
      // Reset form but keep lumberjack as the current user
      setTreeData({
        woodType: "",
        date: "",
        locationId: "",
        image: "",
        reason: "",
        age: "",
        status: "available",
        logged: false,
        lumberjack: currentUserUID,
      });
    } catch (error) {
      console.error("Error adding tree: ", error);
      alert("Failed to add tree. See console for details.");
      console.log(
        "Adding tree to sawmill ID:",
        sawmillId,
        "with data:",
        treeData
      );
      console.error("Error adding tree: ", error);
      alert(`Failed to add tree. Error: ${error.message}`);
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
