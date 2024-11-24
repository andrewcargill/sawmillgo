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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import LogFromTree from "./sub-components/LogFromTree";
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
  onSnapshot,
  updateDoc,
  where,
} from "firebase/firestore";
import { app } from "../../firebase-config";
import { getAuth } from "firebase/auth";

const AddLog = () => {
  const [withTree, setWithTree] = useState(false);
  const [treeId, setTreeId] = useState("");
  const [showTreeInput, setShowTreeInput] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [projects, setProjects] = useState([]);
  const [locations, setLocations] = useState([]);
  const [species, setSpecies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFinalLogDialogOpen, setIsFinalLogDialogOpen] = useState(false);
  const [treeIsLogged, setTreeIsLogged] = useState(false);

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
    planked: false,
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

  useEffect(() => {
    if (sawmillId && formData.verified !== undefined) {
      fetchProjectsForSawmill(db, sawmillId, formData.verified)
        .then(setProjects)
        .catch(console.error);
    }
  }, [db, sawmillId, formData.verified]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (
      !sawmillId ||
      !formData.date ||
      !formData.locationId ||
      !formData.speciesId
    ) {
      console.error("All required fields must be filled.");
      alert("Please fill all required fields.");
      setIsLoading(false);
      return;
    }

    if (treeIsLogged && formData.treeId) {
      setIsFinalLogDialogOpen(true);
    } else {
      submitLog();
    }
  };

  const handleFinalLogConfirmation = () => {
    setIsFinalLogDialogOpen(false);
    submitLog(true);
  };

  const handleCancelFinalLog = () => {
    setIsFinalLogDialogOpen(false);
    submitLog();
  };

  const resetForm = () => {
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
      planked: false,
    });
    setTreeIsLogged(false);
  };

  const submitLog = async (markTreeLogged = false) => {
    try {
      const docRef = await addDoc(
        collection(db, `sawmill/${sawmillId}/logs`),
        formData
      );
      console.log("Document written with ID: ", docRef.id);

      const unsubscribe = onSnapshot(
        doc(db, `sawmill/${sawmillId}/logs`, docRef.id),
        async (docSnapshot) => {
          if (docSnapshot.exists && docSnapshot.data().refId) {
            console.log("RefId has been generated: ", docSnapshot.data().refId);
            alert(`Log added successfully! RefId: ${docSnapshot.data().refId}`);

            if (markTreeLogged) {
              const treeQuery = query(
                collection(db, `sawmill/${sawmillId}/trees`),
                where("refId", "==", formData.treeId)
              );
              const querySnapshot = await getDocs(treeQuery);
              if (!querySnapshot.empty) {
                const treeDocRef = querySnapshot.docs[0].ref;
                // await updateDoc(treeDocRef, { logged: true });
                await updateDoc(treeDocRef, {
                  logged: true,
                  projectId: '', // Reset projectId as tree is now fully logged
                  projectName: '' // Reset projectName
                });
                console.log("Tree marked as fully logged.");
              } else {
                console.error("No tree found with the provided refId.");
              }
            }

            unsubscribe();
            resetForm();
            setIsLoading(false);
          }
        },
        (error) => {
          console.error("Failed to fetch updated document: ", error);
          alert("Error fetching updated document.");
          setIsLoading(false);
        }
      );
    } catch (error) {
      console.error("Error adding document: ", error);
      alert("Failed to add log: " + error.message);
      setIsLoading(false);
    }
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
      const selectedLocation = locations.find(
        (location) => location.id === value
      );
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
      const selectedSpecies = species.find((species) => species.id === value);
      setFormData((prevFormData) => ({
        ...prevFormData,
        speciesId: selectedSpecies ? selectedSpecies.id : "",
        speciesName: selectedSpecies ? selectedSpecies.name : "",
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };

  const updateTreeId = (value) => {
    setTreeId(value);
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
              updateTreeId={updateTreeId}
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

          {formData.treeId !== "" && (
            <Grid item xs={12} sm={12}>
              <Button
                onClick={() => setTreeIsLogged((prev) => !prev)} // Toggle the state
                fullWidth
                variant="contained"
                color={treeIsLogged ? "dark" : "secondary"}
              >
                {treeIsLogged ? "Final Log Set" : "Set as Final Log?"}
              </Button>
            </Grid>
          )}
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

          {/* Dialog for confirming final log entry */}
          <Dialog
            open={isFinalLogDialogOpen}
            onClose={() => setIsFinalLogDialogOpen(false)}
          >
            <DialogTitle>Confirm Final Log</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Is this the final log from this tree? Confirming will mark the
                tree as fully logged.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCancelFinalLog} color="primary">
                Cancel
              </Button>
              <Button
                onClick={handleFinalLogConfirmation}
                color="primary"
                autoFocus
              >
                Confirm
              </Button>
            </DialogActions>
          </Dialog>
        </Grid>
      )}
    </div>
  );
};

export default AddLog;
