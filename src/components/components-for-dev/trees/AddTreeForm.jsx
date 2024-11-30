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
import {
  Grid,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  CircularProgress,
} from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
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

      fetchProjectsForSawmill(db, sawmillId, true)
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
    <Grid container spacing={2} padding={2}>
      <Grid item xs={12}>
        <Typography variant="h6">Add New Tree</Typography>
      </Grid>

      <Grid item xs={6}>
        <TextField
          fullWidth
          label="Date Felled"
          type="date"
          name="date"
          value={treeData.date}
          onChange={handleChange}
          required
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          fullWidth
          label="Age"
          name="age"
          value={treeData.age}
          onChange={handleChange}
          required
        />
      </Grid>

      <Grid item xs={6}>
        <FormControl fullWidth>
          <InputLabel id="location-label">Location</InputLabel>
          <Select
            labelId="location-label"
            name="locationId"
            value={treeData.locationId}
            onChange={handleChange}
          >
            <MenuItem value="">Select a Location</MenuItem>
            {locations.map((location) => (
              <MenuItem key={location.id} value={location.id}>
                {location.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={6}>
        <FormControl fullWidth>
          <InputLabel id="species-label">Species</InputLabel>
          <Select
            labelId="species-label"
            name="speciesId"
            value={treeData.speciesId}
            onChange={handleChange}
          >
            <MenuItem value="">Select a Species</MenuItem>
            {species.map((spec) => (
              <MenuItem key={spec.id} value={spec.id}>
                {spec.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Reason"
          name="reason"
          value={treeData.reason}
          onChange={handleChange}
          multiline
          rows={3}
        />
      </Grid>

      <Grid item xs={6}>
        <TextField
          fullWidth
          label="Longitude"
          value={longitude}
          onChange={(e) => setLongitude(e.target.value)}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          fullWidth
          label="Latitude"
          value={latitude}
          onChange={(e) => setLatitude(e.target.value)}
        />
      </Grid>

      <Grid item xs={12}>
        <Button variant="contained" onClick={handleGetLocation}>
          Get Location
        </Button>
      </Grid>

      <Grid item xs={12}>
        <TextField
          fullWidth
          type="file"
          onChange={handleImageChange}
        />
      </Grid>

      <Grid item xs={12} display="flex" justifyContent="space-between">
        <Button variant="contained" onClick={handleSubmit}>
          {isLoading ? <CircularProgress size={24} /> : "Save"}
        </Button>
        <IconButton 
        >
          <CancelIcon />
        </IconButton>
      </Grid>
    </Grid>
  );
};

export default AddTreeForm;
