import React, { useState, useEffect } from "react";
import { getFirestore, collection, addDoc, query, getDocs, doc, getDoc } from "firebase/firestore";
import { app } from "../../../firebase-config";
import { getAuth } from "firebase/auth";
import ListEditTree from "./ListEditTrees"; // Make sure this is correctly imported
import { fetchLocationsForSawmill } from "../../../utils/filestoreOperations";

const AddTreeForm = () => {
  const [isLoading, setIsLoading] = useState(false);
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
  const [locations, setLocations] = useState([]); // State to hold fetched locations

  const db = getFirestore(app);
  const auth = getAuth(app);
  const currentUserUID = auth.currentUser ? auth.currentUser.uid : null;
  const userLocalStorage = JSON.parse(localStorage.getItem("user"));
  const sawmillId = userLocalStorage?.sawmillId;

  // Fetch available locations
  useEffect(() => {
    if (currentUserUID) {
      setTreeData(prevState => ({
        ...prevState,
        lumberjack: currentUserUID,
      }));
    }
  
    if (sawmillId) {
      fetchLocationsForSawmill(db, sawmillId)
        .then(fetchedLocations => {
          setLocations(fetchedLocations);
        })
        .catch(error => {
          alert(error.message);
        });
    }
  

  }, [db, currentUserUID]);


  const handleChange = e => {
    const { name, value } = e.target;
    setTreeData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };


  const handleSubmit = async e => {
    e.preventDefault();
    setIsLoading(true);
    const userLocalStorage = JSON.parse(localStorage.getItem("user"));
    const sawmillId = userLocalStorage?.sawmillId;

    if (!sawmillId) {
      console.error("Sawmill ID is not available. Cannot add tree.");
      alert("Sawmill ID is not available. Cannot add tree.");
      setIsLoading(false);
      return;
    }

    try {
      const docRef = await addDoc(collection(db, `sawmill/${sawmillId}/trees`), { ...treeData, lumberjack: currentUserUID });

      setTimeout(async () => {
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          alert(`Tree added successfully! RefId: ${docSnap.data().refId}`);
        } else {
          console.log("No such document!");
          alert("Failed to add tree. Please check the console for details.");
        }
        setIsLoading(false);
      }, 3000); // Adjust timeout as needed

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
      alert(`Failed to add tree. Error: ${error.message}`);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h3>Add New Tree</h3>
    
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


        {/* Location ID Dropdown */}
        <label>
          Location:
          <select
            name="locationId"
            value={treeData.locationId}
            onChange={handleChange}
            required
          >
            <option value="">Select a Location</option>
            {locations.map(location => (
              <option key={location.id} value={location.id}>
                {location.name}
              </option>
            ))}
          </select>
        </label>
        <br />
        {isLoading && <p>Loading...</p>}
        <button type="submit">Add Tree</button>
      </form>
      <ListEditTree />
    </div>
  );
};

export default AddTreeForm;
