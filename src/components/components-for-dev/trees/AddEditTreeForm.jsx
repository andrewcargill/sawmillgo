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
  onSnapshot,
} from "firebase/firestore";
import { app } from "../../../firebase-config";
import { getAuth } from "firebase/auth";
import ListEditTree from "./ListEditTrees"; // Make sure this is correctly imported
import {
  fetchLocationsForSawmill,
  fetchVerifiedProjectsForSawmill,
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
  Paper,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableContainer,
} from "@mui/material";
import Chip from "@mui/material/Chip";

const defaultTreeData = {
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
  projectId: "",
  projectName: "",
  logged: false,
};

const AddEditTreeForm = ({ treeDetails, onClose }) => {
  const treeUid = treeDetails?.id;

  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState("");
  const [longitude, setLongitude] = useState(treeDetails?.longitude || "");
  const [latitude, setLatitude] = useState(treeDetails?.latitude || "");
  const [treeData, setTreeData] = useState(treeDetails || defaultTreeData);
  const [locations, setLocations] = useState([]); // State to hold fetched locations
  const [projects, setProjects] = useState([]); // State to hold fetched projects
  const [species, setSpecies] = useState([]); // State to hold fetched species

  const db = getFirestore(app);
  const auth = getAuth(app);
  const currentUserUID = auth.currentUser ? auth.currentUser.uid : null;
  const userLocalStorage = JSON.parse(localStorage.getItem("user"));
  const sawmillId = userLocalStorage?.sawmillId;
  const userName = userLocalStorage?.displayName;

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

        fetchVerifiedProjectsForSawmill(db, sawmillId)
        .then((verifiedProjects) => {
            setProjects(verifiedProjects); 
        })
        .catch((error) => {
            console.error("Error fetching verified projects:", error);
            alert("Failed to fetch verified projects: " + error.message);
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
      if (!treeDetails) return;

      const docRef = doc(db, `sawmill/${sawmillId}/trees`, treeUid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setTreeData({ ...docSnap.data() });
      } else {
        console.log("No such document!");
      }
    };

    fetchTreeData();
  }, [db, currentUserUID, sawmillId]);

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

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setIsLoading(true);
  //   const userLocalStorage = JSON.parse(localStorage.getItem("user"));
  //   const sawmillId = userLocalStorage?.sawmillId;

  //   if (!sawmillId) {
  //     console.error("Sawmill ID is not available. Cannot add tree.");
  //     alert("Sawmill ID is not available. Cannot add tree.");
  //     setIsLoading(false);
  //     return;
  //   }

  //   // Handle Image Upload if image is selected
  //   let imageUrl = "";
  //   if (image) {
  //     const storage = getStorage();
  //     const imageRef = storageRef(storage, `trees/${sawmillId}/${image.name}`);
  //     try {
  //       const snapshot = await uploadBytes(imageRef, image);
  //       imageUrl = await getDownloadURL(snapshot.ref);
  //     } catch (error) {
  //       console.error("Error uploading image: ", error);
  //       alert(`Failed to upload image. Error: ${error.message}`);
  //       setIsLoading(false);
  //       return; // Stop the function if image upload fails
  //     }
  //   }

  //   try {
  //     const treeWithImage = {
  //       ...treeData,
  //       latitude: parseFloat(latitude),
  //       longitude: parseFloat(longitude),
  //       image: imageUrl,
  //     };

  //     if (treeUid) {
  //       console.log("Updating tree with UID: ", treeUid);
  //       // If treeUid is provided, we're updating an existing tree
  //       const treeRef = doc(db, `sawmill/${sawmillId}/trees`, treeUid);
  //       await setDoc(treeRef, treeWithImage); // setDoc to overwrite or update the document
  //       alert("Tree updated successfully!");
  //     } else {
  //       // If no treeUid, we're adding a new tree
  //       const docRef = await addDoc(
  //         collection(db, `sawmill/${sawmillId}/trees`),
  //         treeWithImage
  //       );
  //       setTimeout(() => alert("Tree added successfully! RefId: " + docRef.refId), 5000);
  //     }

  //     // Reset form to initial state after successful add/update
  //     setTreeData(defaultTreeData);
  //     setImage(""); // Reset image state
  //     setIsLoading(false); // Reset loading state
  //     onClose(); // Close the modal after successful add/update
  //     // Close the modal after successful add/update
  //   } catch (error) {
  //     console.error("Error saving tree: ", error);
  //     alert(`Failed to save tree. Error: ${error.message}`);
  //     setIsLoading(false); // Ensure loading state is reset even on failure
  //   }
  // };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setIsLoading(true);

  //   const userLocalStorage = JSON.parse(localStorage.getItem("user"));
  //   const sawmillId = userLocalStorage?.sawmillId;

  //   if (!sawmillId) {
  //     console.error("Sawmill ID is not available. Cannot add tree.");
  //     alert("Sawmill ID is not available. Cannot add tree.");
  //     setIsLoading(false);
  //     return;
  //   }

  //   let imageUrl = "";
  //   if (image) {
  //     const storage = getStorage();
  //     const imageRef = storageRef(storage, `trees/${sawmillId}/${image.name}`);
  //     try {
  //       const snapshot = await uploadBytes(imageRef, image);
  //       imageUrl = await getDownloadURL(snapshot.ref);
  //     } catch (error) {
  //       console.error("Error uploading image: ", error);
  //       alert(`Failed to upload image. Error: ${error.message}`);
  //       setIsLoading(false);
  //       return; // Stop the function if image upload fails
  //     }
  //   }

  //   const treeWithImage = {
  //     ...treeData,
  //     latitude: parseFloat(latitude),
  //     longitude: parseFloat(longitude),
  //     image: imageUrl,
  //   };

  //   try {
  //     if (treeUid) {
  //       //Updating an existing tree
  //       const treeRef = doc(db, `sawmill/${sawmillId}/trees`, treeUid);
  //       await setDoc(treeRef, treeWithImage);
  //       alert("Tree updated successfully!");
  //       onClose();
  //     } else {
  //       const docRef = await addDoc(
  //         collection(db, `sawmill/${sawmillId}/trees`),
  //         treeWithImage
  //       );
  //       // Setup a one-time listener for the newly added document
  //       const unsubscribe = onSnapshot(
  //         doc(db, `sawmill/${sawmillId}/trees`, docRef.id),
  //         (doc) => {
  //           const data = doc.data();
  //           if (data.refId) {
  //             // Once refId is present, display the alert
  //             alert(`Tree added successfully! RefId: ${data.refId}`);
  //             unsubscribe(); // Detach the listener
  //             onClose(); // Proceed to close the modal or cleanup
  //           }
  //         }
  //       );
  //     }

  //     // Reset form to initial state after successful add/update
  //     setTreeData(defaultTreeData);
  //     setImage("");
  //     setIsLoading(false);
  //   } catch (error) {
  //     console.error("Error saving tree: ", error);
  //     alert(`Failed to save tree. Error: ${error.message}`);
  //     setIsLoading(false);
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!sawmillId) {
        console.error("Sawmill ID is not available. Cannot add tree.");
        alert("Sawmill ID is not available. Cannot add tree.");
        setIsLoading(false);
        return;
    }

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

    const treeDataWithImage = {
        ...treeData,
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
        image: imageUrl,
    };

    try {
        if (treeUid) {
            // Updating an existing tree
            const treeRef = doc(db, `sawmill/${sawmillId}/trees`, treeUid);
            await setDoc(treeRef, treeDataWithImage);
            alert("Tree updated successfully!");
            onClose();
        } else {
            // Adding a new tree
            const newTreeData = {
                ...treeDataWithImage,
                lumberjack: currentUserUID,  // Add the current user's UID as lumberjack
                lumberjackName: userName     // Add the current user's name as lumberjackName
            };
            const docRef = await addDoc(collection(db, `sawmill/${sawmillId}/trees`), newTreeData);

            // Setup a one-time listener for the newly added document
            const unsubscribe = onSnapshot(
                doc(db, `sawmill/${sawmillId}/trees`, docRef.id),
                (doc) => {
                    const data = doc.data();
                    if (data.refId) {
                        // Once refId is present, display the alert
                        alert(`Tree added successfully! RefId: ${data.refId}`);
                        unsubscribe(); // Detach the listener
                        onClose(); // Proceed to close the modal or cleanup
                    }
                }
            );
        }

        // Reset form to initial state after successful add/update
        setTreeData(defaultTreeData);
        setImage("");
        setIsLoading(false);
    } catch (error) {
        console.error("Error saving tree: ", error);
        alert(`Failed to save tree. Error: ${error.message}`);
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
    <Grid container>
      <Grid container item xs={12} mb={2}>
        <Grid item xs={8}>
        { treeDetails ?  ( 
          <Typography
            id="tree-details-title"
            variant="h6"
            component="h2"
            color={"primary"}
            style={{ textTransform: "capitalize" }}
          >
          Ref ID: {treeDetails?.refId} 
          </Typography>
          ) :  (
            <Typography
            id="tree-details-title"
            variant="h6"
            component="h2"
            color={"primary"}
            style={{ textTransform: "capitalize" }}
          >
          Add New Tree
          </Typography>
          )}
        </Grid>
        <Grid container item xs={4} justifyContent={"end"}>
          {treeDetails ? (

          <Grid pb={1}>
            <Chip
              size="small"
              color="secondary"
              style={{ textTransform: "capitalize" }}
              label={treeDetails?.status}
            />
          </Grid>
              ) : null}
           {treeDetails ? (  
          <Grid>
            <Chip
              size="small"
              variant="outlined"
              color="primary"
              style={{ textTransform: "capitalize" }}
              label={treeDetails?.logged ? "Logged" : "Not Logged"}
            />
          </Grid>
          ) : null}
      
        </Grid>
      </Grid>

      <Grid container xs={12}>
        <Grid item xs={8}>
          <Grid>
            <Grid>
              <TableContainer>
                <Table>
                  <TableBody>
                    
                    <TableRow>
                      <TableCell sx={{ width: "30%", py: 0.5, px: 1 }}>
                        Lumberjack:
                      </TableCell>
                      <TableCell sx={{ py: 0.5, px: 1 }}>
                        {treeDetails ? treeDetails?.lumberjackName : userName}
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

        <Grid container pt={2} pb={1}>
          
            <Table component={Paper}>
              <TableBody>
                <TableRow>
                  <TableCell sx={{ width: "30%", py: 0.5, px: 1 }}>
                    Project:
                  </TableCell>
                  <TableCell sx={{ py: 0.5, px: 1 }}>
                    <select
                      name="projectId"
                      value={treeData?.projectId}
                      onChange={handleChange}
                    >
                      <option value="">No Project</option>
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
          
        </Grid>

        <Grid xs={12}>
          <Button
            variant="contained"
            color="white"
            fullWidth
            onClick={handleGetLocation}
          >
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
            {treeDetails ? "update" : "save"}
          </Button>

          {treeDetails?.id && (
            <Button variant="contained" color="warning" onClick={handleDelete}>
              DELETE
            </Button>
          )}

          <IconButton aria-label="" onClick={onClose}>
            <CancelIcon />
          </IconButton>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default AddEditTreeForm;
