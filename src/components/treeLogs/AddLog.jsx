import React, { useEffect, useState } from "react";
import {
  Grid,
  Typography,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import LogFromTree from "./sub-conponents/LogFromTree";
import {
  fetchLocationsForSawmill,
  fetchProjectsForSawmill,
  fetchSpeciesForSawmill,
} from "../../utils/filestoreOperations";
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
import { app } from "../../firebase-config";
import { getAuth } from "firebase/auth";

const AddLog = () => {
  const [withTree, setWithTree] = useState(false);
  const [showTreeInput, setShowTreeInput] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [projects, setProjects] = useState([]);
  const [locations, setLocations] = useState([]);
  const [species, setSpecies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const db = getFirestore(app);
  const auth = getAuth(app);
  const currentUserUID = auth.currentUser ? auth.currentUser.uid : null;
  const userLocalStorage = JSON.parse(localStorage.getItem("user"));
  const sawmillId = userLocalStorage?.sawmillId;
  const userName = userLocalStorage?.displayName;

  const [formData, setFormData] = useState({
    date: "",
    lumberjackUid: currentUserUID,
    lumberjackName: userName,
    treeId: "",
    projectId: "",
    projectName: "",
    locationId: "",
    locationName: "",
    speciesName: "",
    speciesId: "",
    diameter: "",
    length: "",
    status: "available",
    verified: false,
  });

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
  }, [sawmillId]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Basic validation example
    if (
      !sawmillId ||
      !formData.date ||
      !formData.projectId ||
      !formData.locationId ||
      !formData.speciesId
    ) {
      console.error("All required fields must be filled.");
      alert("Please fill all required fields.");
      setIsLoading(false);
      return;
    }

    try {
      const docRef = await addDoc(
        collection(db, `sawmill/${sawmillId}/logs`),
        formData
      );
      console.log("Document written with ID: ", docRef.id);
      // alert("Log added successfully");

      // Resetting form data
      setFormData({
        date: "",
        lumberjackUid: currentUserUID,
        lumberjackName: userName,
        treeId: "",
        projectId: "",
        projectName: "",
        locationId: "",
        locationName: "",
        speciesName: "",
        speciesId: "",
        diameter: "",
        length: "",
        status: "available",
        verified: false,
      });

      const unsubscribe = onSnapshot(
        doc(db, `sawmill/${sawmillId}/logs`, docRef.id),
        (doc) => {
          const data = doc.data();
          if (data.refId) {
            // Once refId is present, display the alert
            alert(`Log added successfully! RefId: ${data.refId}`);
            unsubscribe(); // Detach the listener
            setIsLoading(false);
          }
        }
      );
    } catch (error) {
      console.error("Error adding document: ", error);
      alert("Failed to add log: " + error.message);
    }

    setIsLoading(false);
  };

  const handleWithoutTreeClick = () => {
    setWithTree(false);
    setShowForm(true);
    setShowTreeInput(true);
  };

  const handleWithTreeClick = () => {
    setWithTree(true);
    setShowTreeInput(true);
  };

  const handleInputUpdate = (event) => {
    const { name, value } = event.target;
    console.log(formData);

    if (name === "locationId") {
      // Find the selected location object based on the locationId
      const selectedLocation = locations.find(
        (location) => location.id === value
      );
      // Update the formData state with both the locationId and locationName
      setFormData((prevFormData) => ({
        ...prevFormData,
        locationId: selectedLocation ? selectedLocation.id : "",
        locationName: selectedLocation ? selectedLocation.name : "",
      }));
    } else if (name === "projectId") {
      const selectedProject = projects.find((project) => project.id === value);
      setFormData((prevFormData) => ({
        ...prevFormData,
        projectId: selectedProject ? selectedProject.id : "",
        projectName: selectedProject ? selectedProject.projectName : "",
      }));
    } else if (name === "speciesId") {
      // Find the selected species object based on the speciesId
      const selectedSpecies = species.find((species) => species.id === value);
      // Update the formData state with both the speciesId and speciesName
      setFormData((prevFormData) => ({
        ...prevFormData,
        speciesId: selectedSpecies ? selectedSpecies.id : "",
        speciesName: selectedSpecies ? selectedSpecies.name : "",
      }));
    } else {
      // For all other inputs, just update the value directly
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h4" gutterBottom>
        Add Log
      </Typography>

      {!showTreeInput && (
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h6">
              Is this log from a registered tree?
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={handleWithTreeClick}
            >
              Yes
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleWithoutTreeClick}
            >
              No
            </Button>
          </Grid>
        </Grid>
      )}

      {showTreeInput && (
        <>
          {withTree ? (
            <LogFromTree
              setShowForm={setShowForm}
              formData={formData}
              setFormData={setFormData}
            />
          ) : (
            "Since there is no parent tree to confirm the origin of this log, it has been assigned an unverified rating."
          )}
        </>
      )}

      {showForm && (
        <Grid container spacing={2} style={{ marginTop: "20px" }}>
          <Grid item xs={12}>
            <Typography variant="h6">Log Details</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Date"
              type="date"
              name="date"
              InputLabelProps={{ shrink: true }}
              value={formData.date}
              onChange={handleInputUpdate}
              fullWidth
              required
            />
          </Grid>

          {formData.treeId == "" && (
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id="species-label">Species</InputLabel>
                <Select
                  labelId="species-label"
                  id="speciesId"
                  name="speciesId"
                  value={formData.speciesId}
                  label="species"
                  onChange={handleInputUpdate}
                >
                  {species.map((specie) => (
                    <MenuItem key={specie.id} value={specie.id}>
                      {specie.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          )}

     
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id="project-label">Project</InputLabel>
                <Select
                  labelId="project-label"
                  id="projectId"
                  name="projectId"
                  value={formData.projectId}
                  label="Project"
                  onChange={handleInputUpdate}
                >
                  {projects.map((project) => (
                    <MenuItem key={project.id} value={project.id}>
                      {project.projectName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
      
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel id="location-label">Location</InputLabel>
              <Select
                labelId="location-label"
                id="locationId"
                name="locationId"
                value={formData?.locationId}
                label="location"
                onChange={handleInputUpdate}
                required
              >
                {locations.map((location) => (
                  <MenuItem key={location.id} value={location.id}>
                    {location.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Diameter (cm)"
              type="number"
              name="diameter"
              value={formData.diameter}
              variant="outlined"
              onChange={handleInputUpdate}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Length (cm)"
              type="number"
              name="length"
              variant="outlined"
              value={formData.length}
              onChange={handleInputUpdate}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <Button
              onClick={handleSubmit}
              fullWidth
              variant="contained"
              color="primary"
            >
              Submit
            </Button>
          </Grid>
          {/* Additional shared fields can be added here */}
        </Grid>
      )}
    </div>
  );
};

export default AddLog;
