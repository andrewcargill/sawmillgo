import React, { useState, useEffect } from "react";
import {
  getFirestore,
  collection,
  addDoc,
  query,
  getDocs,
  doc,
  getDoc,
  setDoc,
  deleteDoc,
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
import {
  Modal,
  Box,
  Typography,
  Button,
  Grid,
  IconButton,
} from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableContainer,
} from "@mui/material";

const AddEditTreeForm = ({ treeDetails, onClose }) => {
  const treeUid = treeDetails?.id;
  const [details, setDetails] = useState(treeDetails);
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState("");
  const [longitude, setLongitude] = useState("");
  const [latitude, setLatitude] = useState("");
  const [treeData, setTreeData] = useState(treeDetails);
  const [locations, setLocations] = useState([]); // State to hold fetched locations
  const [projects, setProjects] = useState([]); // State to hold fetched projects
  const [species, setSpecies] = useState([]); // State to hold fetched species

  const db = getFirestore(app);
  const auth = getAuth(app);
  const currentUserUID = auth.currentUser ? auth.currentUser.uid : null;
  const userLocalStorage = JSON.parse(localStorage.getItem("user"));
  const sawmillId = userLocalStorage?.sawmillId;

  const handleDelete = async () => {
    // Use prompt to ask the user to input the refId
    const userInput = window.prompt(
      `This action will delete ${treeData.refId}. Type the Ref ID to confirm.`
    );

    if (userInput === treeData.refId) {
      try {
        if (treeUid) {
          await deleteDoc(doc(db, `sawmill/${sawmillId}/trees`, treeUid));
          alert("Tree deleted successfully.");
          onClose(); // Close the modal or redirect user
        }
      } catch (error) {
        console.error("Error deleting tree: ", error);
        alert(`Failed to delete tree. Error: ${error.message}`);
      }
    }
  };

  useEffect(() => {
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

    setLongitude(treeDetails?.longitude);
    setLatitude(treeDetails?.latitude);

    const fetchTreeData = async () => {
      if (!treeData) return;

      const docRef = doc(db, `sawmill/${sawmillId}/trees`, treeUid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setTreeData({ ...docSnap.data() }); 
      
      } else {
        console.log("No such document!");
      }
    };

    fetchTreeData();
  }, [db, currentUserUID, sawmillId, details]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === "locationId") {
      // Find the selected location object based on the locationId
      const selectedLocation = locations.find(
        (location) => location.id === value
      );

      // Update the state with both the locationId and locationName
      setTreeData((prevState) => ({
        ...prevState,
        locationId: selectedLocation ? selectedLocation.id : "",
        locationName: selectedLocation ? selectedLocation.name : "",
      }));
    } else if (name === "projectId") {
      const selectedProject = projects.find((project) => project.id === value);
      setTreeData((prevState) => ({
        ...prevState,
        projectId: selectedProject ? selectedProject.id : "",
        projectName: selectedProject ? selectedProject.projectName : "",
      }));
    } else if (name === "speciesId") {
      // Find the selected species object based on the speciesId
      const selectedSpecies = species.find((species) => species.id === value);

      // Update the state with both the speciesId and speciesName
      setTreeData((prevState) => ({
        ...prevState,
        speciesId: selectedSpecies ? selectedSpecies.id : "",
        speciesName: selectedSpecies ? selectedSpecies.name : "",
      }));
    } else {
      // Handle other form fields as normal
      setTreeData((prevState) => ({
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
        image: imageUrl, // Assume this is already set from image upload logic
        // lumberjack: currentUserUID,
        // lumberjackName: userLocalStorage?.displayName,
      };

      if (treeUid) {
        console.log("Updating tree with UID: ", treeUid);
        // If treeUid is provided, we're updating an existing tree
        const treeRef = doc(db, `sawmill/${sawmillId}/trees`, treeUid);
        await setDoc(treeRef, treeWithImage); // setDoc to overwrite or update the document
        alert("Tree updated successfully!");
      } else {
        // If no treeUid, we're adding a new tree
        const docRef = await addDoc(
          collection(db, `sawmill/${sawmillId}/trees`),
          treeWithImage
        );
        alert("Tree added successfully! RefId: " + docRef.id);
      }

      // Reset form to initial state after successful add/update
      setTreeData({
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
      setImage(""); // Reset image state
      setIsLoading(false); // Reset loading state
      onClose(); // Close the modal after successful add/update
      // Close the modal after successful add/update
    } catch (error) {
      console.error("Error saving tree: ", error);
      alert(`Failed to save tree. Error: ${error.message}`);
      setIsLoading(false); // Ensure loading state is reset even on failure
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
      <Grid>
        <Typography id="tree-details-title" variant="h6" component="h2">
          Tree Edit
        </Typography>
      </Grid>

      <Grid container xs={12}>
        <Grid item xs={8}>
          <Grid>
            <Grid>
              <TableContainer>
                <Table sx={{ border: "2px solid lightgrey" }}>
                  <TableBody>
                    <TableRow>
                      <TableCell sx={{ width: "30%", py: 0.5, px: 1 }}>
                        Ref ID:
                      </TableCell>
                      <TableCell sx={{ py: 0.5, px: 1 }}>
                        {treeDetails?.refId}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ width: "30%", py: 0.5, px: 1 }}>
                        Status:
                      </TableCell>
                      <TableCell sx={{ py: 0.5, px: 1 }}>
                        {treeDetails?.status}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ width: "30%", py: 0.5, px: 1 }}>
                        Lumberjack:
                      </TableCell>
                      <TableCell sx={{ py: 0.5, px: 1 }}>
                        {treeDetails?.lumberjackName}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ width: "30%", py: 0.5, px: 1 }}>
                        Logged:
                      </TableCell>
                      <TableCell sx={{ py: 0.5, px: 1 }}>
                        {treeDetails?.logged ? "Yes" : "No"}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
        </Grid>

        <Grid
          item
          container
          xs={4}
          alignContent={"flex-start"}
          justifyContent={"flex-end"}
        >
          <img
            src={treeData?.image}
            alt="Tree"
            style={{
              width: "90%",
              height: "auto",
              objectFit: "contain",
            }}
          />
        </Grid>

        <Grid p={1}>
          <TableContainer>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell sx={{ width: "30%", py: 0.5, px: 1 }}>
                    Project:
                  </TableCell>
                  <TableCell sx={{ py: 0.5, px: 1 }}>
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
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ width: "30%", py: 0.5, px: 1 }}>
                    Location
                  </TableCell>
                  <TableCell sx={{ py: 0.5, px: 1 }}>
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
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ width: "30%", py: 0.5, px: 1 }}>
                    Species
                  </TableCell>
                  <TableCell sx={{ py: 0.5, px: 1 }}>
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
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ width: "30%", py: 0.5, px: 1 }}>
                    Age
                  </TableCell>
                  <TableCell sx={{ py: 0.5, px: 1 }}>
                    <input
                      type="text"
                      name="age"
                      value={treeData.age}
                      onChange={handleChange}
                      required
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ width: "30%", py: 0.5, px: 1 }}>
                    Date
                  </TableCell>
                  <TableCell sx={{ py: 0.5, px: 1 }}>
                    <input
                      type="date"
                      name="date"
                      value={treeData.date}
                      onChange={handleChange}
                      required
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ width: "30%", py: 0.5, px: 1 }}>
                    Reason
                  </TableCell>
                  <TableCell sx={{ py: 0.5, px: 1 }}>
                    <textarea
                      type="textfield"
                      name="reason"
                      value={treeData.reason}
                      onChange={handleChange}
                    >
                      {treeData.reason}
                    </textarea>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ width: "30%", py: 0.5, px: 1 }}>
                    Image
                  </TableCell>
                  <TableCell
                    sx={{
                      py: 0.5,
                      px: 1,
                      whiteSpace: "normal",
                      wordBreak: "break-word",
                    }}
                  >
                    <input type="file" onChange={handleImageChange} />
                  </TableCell>
                </TableRow>
              </TableBody>
              <TableRow>
                <TableCell sx={{ width: "30%", py: 0.5, px: 1 }}>
                  Latitude
                </TableCell>
                <TableCell sx={{ py: 0.5, px: 1 }}>
                  <input
                    type="text"
                    placeholder=""
                    value={longitude}
                    onChange={(e) => setLongitude(e.target.value)}
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ width: "30%", py: 0.5, px: 1 }}>
                  Longitude
                </TableCell>
                <TableCell sx={{ py: 0.5, px: 1 }}>
                  <input
                    type="text"
                    placeholder=""
                    value={latitude}
                    onChange={(e) => setLatitude(e.target.value)}
                  />
                </TableCell>
              </TableRow>
            </Table>
          </TableContainer>
        </Grid>

        <Grid xs={12}>
          <Button variant="contained" color="white" fullWidth onClick={handleGetLocation}>
            Get Location
          </Button>
        </Grid>

        <Grid
          container
          pt={4}
          flexDirection={"row"}
          justifyContent={"space-around"}
        >
          <Button variant="contained" onClick={handleSubmit}>
            SAVE
          </Button>

          <Button variant="contained" color="warning" onClick={handleDelete}>
            DELETE
          </Button>

          <IconButton aria-label="" onClick={onClose}>
            <CancelIcon />
          </IconButton>
        </Grid>
      </Grid>
    </div>
  );
};

export default AddEditTreeForm;
