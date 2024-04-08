import React, { useState, useEffect } from "react";
import {
  getFirestore,
  collection,
  addDoc,
  query,
  getDocs,
  doc,
  getDoc,
} from "firebase/firestore";
import { app } from "../../../firebase-config";
import { getAuth } from "firebase/auth";
import ListEditTree from "./ListEditTrees"; // Make sure this is correctly imported
import {
  fetchLocationsForSawmill,
  fetchProjectsForSawmill,
  fetchSpeciesForSawmill,
} from "../../../utils/filestoreOperations";
import {
  getStorage,
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import { getGeolocation } from "../../../utils/geolocation";
import Button from "@mui/material/Button";

const AddTreeForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState("");
  const [longitude, setLongitude] = useState("");
  const [latitude, setLatitude] = useState("");
  const [treeData, setTreeData] = useState({
    speciesId: "",
    speciesName: "",
    date: "",
    locationId: "",
    locationName: "",
    longitude: "",
    latitude: "",
    image: "",
    reason: "",
    age: "",
    status: "available",
    projectId: null,
    projectName: "",
    logged: false,
  });
  const [locations, setLocations] = useState([]); // State to hold fetched locations
  const [projects, setProjects] = useState([]); // State to hold fetched projects
  const [species, setSpecies] = useState([]); // State to hold fetched species

  const db = getFirestore(app);
  const auth = getAuth(app);
  const currentUserUID = auth.currentUser ? auth.currentUser.uid : null;
  const userLocalStorage = JSON.parse(localStorage.getItem("user"));
  const sawmillId = userLocalStorage?.sawmillId;

  // Fetch available locations
  useEffect(() => {
    if (currentUserUID) {
      setTreeData((prevState) => ({
        ...prevState,
        lumberjack: currentUserUID,
      }));
    }

    if (sawmillId) {
      fetchLocationsForSawmill(db, sawmillId)
        .then((fetchedLocations) => {
          setLocations(fetchedLocations);
        })
        .catch((error) => {
          alert(error.message);
        });

      fetchProjectsForSawmill(db, sawmillId)
        .then((fetchedProjects) => {
          setProjects(fetchedProjects);
        })
        .catch((error) => {
          console.error("Error fetching projects:", error);
          alert("Failed to fetch projects: " + error.message);
        });

      fetchSpeciesForSawmill(db, sawmillId)
        .then((fetchedSpecies) => {
          setSpecies(fetchedSpecies);
        })
        .catch((error) => {
          console.error("Error fetching projects:", error);
          alert("Failed to fetch projects: " + error.message);
        });
    }
  }, [db, currentUserUID]);

  const handleChange = (event) => {
    const { name, value } = event.target;
  
    if (name === 'locationId') {
      // Find the selected location object based on the locationId
      const selectedLocation = locations.find(location => location.id === value);
  
      // Update the state with both the locationId and locationName
      setTreeData(prevState => ({
        ...prevState,
        locationId: selectedLocation ? selectedLocation.id : '',
        locationName: selectedLocation ? selectedLocation.name : '',
      }));
    } else if (name === 'projectId') {
      const selectedProject = projects.find(project => project.id === value);
      setTreeData(prevState => ({
        ...prevState,
        projectId: selectedProject ? selectedProject.id : '',
        projectName: selectedProject ? selectedProject.projectName : '',
      }));
    } else if (name === 'speciesId') {
      // Find the selected species object based on the speciesId
      const selectedSpecies = species.find(species => species.id === value);
  
      // Update the state with both the speciesId and speciesName
      setTreeData(prevState => ({
        ...prevState,
        speciesId: selectedSpecies ? selectedSpecies.id : '',
        speciesName: selectedSpecies ? selectedSpecies.name : '',
      }));
    } else {
      // Handle other form fields as normal
      setTreeData(prevState => ({
        ...prevState,
        [name]: value,
      }));
    }
  };
  
  

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
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

    // Handle Image Upload if image is selected
    let imageUrl = "";
    if (image) {
      const storage = getStorage();
      const imageRef = storageRef(storage, `trees/${sawmillId}/${image.name}`);
      try {
        const snapshot = await uploadBytes(imageRef, image);
        imageUrl = await getDownloadURL(snapshot.ref);
      } catch (error) {
        console.error("Error uploading image: ", error);
        alert(`Failed to upload image. Error: ${error.message}`);
        setIsLoading(false);
        return; // Stop the function if image upload fails
      }
    }

    try {
      const treeWithImage = {
        ...treeData,
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
        image: imageUrl,
        lumberjack: currentUserUID,
        lumberjackName: userLocalStorage?.displayName,
      };
      const docRef = await addDoc(
        collection(db, `sawmill/${sawmillId}/trees`),
        treeWithImage
      );

      setTimeout(async () => {
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          alert(
            `Tree added successfully! RefId: ${
              docSnap.data().refId
            } and Image uploaded.`
          );
        } else {
          console.log("No such document!");
          alert("Failed to add tree. Please check the console for details.");
        }
        setIsLoading(false);
      }, 5000); // Adjust timeout as needed

      // Reset the form fields and image state
      setTreeData({
        date: "",
        locationId: "",
        locationName: "",
        speciesId: "",
        speciesName: "",
        image: "",
        reason: "",
        age: "",
        status: "available",
        longitude: "",
        latitude: "",
        logged: false,
        projectId: null,
        projectName: "",
        lumberjack: currentUserUID,
      });
      setImage(null); // Reset the image state
    } catch (error) {
      console.error("Error adding tree: ", error);
      alert(`Failed to add tree. Error: ${error.message}`);
      setIsLoading(false);
    }
  };

  const handleLocationSuccess = (latitude, longitude) => {
    setLatitude(latitude);
    setLongitude(longitude);
  };

  const handleLocationError = (error) => {
    // Handle errors, such as displaying an alert or logging the error
  };

  const handleGetLocation = () => {
    getGeolocation(handleLocationSuccess, handleLocationError);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h3>Add New Tree</h3>
        <label>Longitude</label>
        <input
          type="text"
          placeholder=""
          value={latitude}
          onChange={(e) => setLatitude(e.target.value)}
        />
        <br />
        <label>Latitude</label>
        <input
          type="text"
          placeholder=""
          value={longitude}
          onChange={(e) => setLongitude(e.target.value)}
        />
        <br />
        <Button
          variant="contained"
          onClick={handleGetLocation}
        >
          Get Location
        </Button>
        <br />
  

        {/* Date Planted */}
        <label>
          Date Felled:
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
            {locations.map((location) => (
              <option key={location.id} value={location.id}>
                {location.name}
              </option>
            ))}
          </select>
        </label>
        <br />
        <label>
          Species:
          <select
            name="speciesId"
            value={treeData.speciesId}
            onChange={handleChange}
            required
          >
            <option value="">Select a Species</option>
            {species.map((species) => (
              <option key={species.id} value={species.id}>
                {species.name}
              </option>
            ))}
          </select>
        </label>
        <br />
        {/* Image Upload */}
        <label>
          Image:
          <input type="file" onChange={handleImageChange} />
        </label>
        <br />

        {/* Project ID Dropdown */}
        <label>
          Project:
          <select
            name="projectId"
            value={treeData.projectId}
            onChange={handleChange}
          >
            <option value="">Select a Project</option>
            {projects.map((project) => (
              <option key={project.id} value={project.id}>
                {project.projectName}
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
