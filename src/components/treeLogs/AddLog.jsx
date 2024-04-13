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
import LogWithoutTree from "./sub-conponents/LogWithoutTree"; // ensure correct path
import { set } from "firebase/database";
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
  const [treeId, setTreeId] = useState("");
  const [withTree, setWithTree] = useState(false);
  const [showTreeInput, setShowTreeInput] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [TreeData, setTreeData] = useState(null);
  const [projects, setProjects] = useState([]);
  const [locations, setLocations] = useState([]);
  const [species, setSpecies] = useState([]);

  const db = getFirestore(app);
  const auth = getAuth(app);
  const currentUserUID = auth.currentUser ? auth.currentUser.uid : null;
  const userLocalStorage = JSON.parse(localStorage.getItem("user"));
  const sawmillId = userLocalStorage?.sawmillId;
  const userName = userLocalStorage?.displayName;

  const [formData, setFormData] = useState({
    date: "",
    lumberjackUid: "",
    lumberjackName: "",
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

  //UseEffect
  // Fetch projects from the propject database
  // Fetch locations from the locations database

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

  //handleSubmit
  // Add lumberjackUid to the formData
  // Add lumberJackNAme to the formData
  // Add treeData.treeId to the formData
  // save formData to the database

  const handleWithoutTreeClick = () => {
    setWithTree(false);
    setShowForm(true);
    setShowTreeInput(true);
  };

  const handleWithTreeClick = () => {
    setWithTree(true);
    setShowTreeInput(true);
  };

  const handleInputChange = (event) => {
    setTreeId(event.target.value);
  };

  console.log(typeof setShowForm);

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
              InputLabelProps={{ shrink: true }}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel id="species-label">Species</InputLabel>
              <Select
                labelId="species-label"
                id="speciesId"
                value={formData?.speciesId}
                label="species"
                onChange=''
              >
                {species.map((specie) => (
                  <MenuItem key={specie.id} value={specie.id}>
                    {specie.name}
                  </MenuItem>
                ))}
             
              </Select>
            </FormControl>
          </Grid>
        
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel id="project-label">Project</InputLabel>
              <Select
                labelId="project-label"
                id="projectId"
                value={formData?.projectId}
                label="Project"
                onChange=''
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
                value={formData?.locationId}
                label="location"
                onChange=''
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
              label="Diameter"
              type="number"
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Length"
              type="number"
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <Button fullWidth variant="contained" color="primary">
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
