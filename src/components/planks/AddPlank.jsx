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
  Checkbox,
  FormControlLabel,
  styled,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import {
  fetchLocationsForSawmill,
  fetchProjectsForSawmill,
  fetchSpeciesForSawmill,
} from "../../utils/filestoreOperations";
import {
  getFirestore,
  addDoc,
  collection,
  onSnapshot,
  doc,
  runTransaction,
} from "firebase/firestore";
import { app } from "../../firebase-config";
import { getAuth } from "firebase/auth";
import PlankFromLog from "./sub-components/PlankFromLog";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const AddPlank = () => {
  const [withLog, setWithLog] = useState(false);
  const [logId, setLogId] = useState("");
  const [showLogInput, setShowLogInput] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [projects, setProjects] = useState([]);
  const [locations, setLocations] = useState([]);
  const [species, setSpecies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFinalPlankDialogOpen, setIsFinalPlankDialogOpen] = useState(false);
  const [logIsPlanked, setlogIsPlanked] = useState(false);
  const [imageFiles, setImageFiles] = useState({
    image1: null,
    image2: null,
  });

  const db = getFirestore(app);
  const auth = getAuth(app);
  const currentUserUID = auth.currentUser ? auth.currentUser.uid : null;
  const sawmillId = JSON.parse(localStorage.getItem("user"))?.sawmillId;
  const userName = JSON.parse(localStorage.getItem("user"))?.displayName;

  const [formData, setFormData] = useState({
    operatorUID: currentUserUID,
    operatorName: userName,
    date: "",
    length: "",
    width: "",
    depth: "",
    grade: "",
    image1: "",
    image2: "",
    notes: "",
    furniture: false,
    construction: false,
    liveEdge: false,
    general: false,
    locationId: "",
    locationName: "",
    projectId: "",
    projectName: "",
    speciesId: "",
    speciesName: "",
    logId: "",
    status: "available",
    verified: false,
  });

  useEffect(() => {
    if (sawmillId) {
      fetchLocationsForSawmill(db, sawmillId)
        .then(setLocations)
        .catch(console.error);

      fetchSpeciesForSawmill(db, sawmillId)
        .then(setSpecies)
        .catch(console.error);
    }
  }, [db, sawmillId]);

  useEffect(() => {
    if (sawmillId && formData.verified !== undefined) {
      fetchProjectsForSawmill(db, sawmillId, formData.verified)
        .then(setProjects)
        .catch(console.error);
    }
  }, [db, sawmillId, formData.verified]);

  //Handle Image Upload
  const handleFileChange = (event) => {
    const { name, files } = event.target;
    setImageFiles((prev) => ({ ...prev, [name]: files[0] }));
  };

  const uploadImage = async (file) => {
    if (!file) return null;
    const storage = getStorage(app);
    const storageRef = ref(
      storage,
      `planks/${sawmillId}/${file.name}_${new Date().getTime()}`
    );
    await uploadBytes(storageRef, file);
    return getDownloadURL(storageRef);
  };

  useEffect(() => {
    console.log("Form data:", formData);
    console.log("Image files:", imageFiles);
  }, [formData, imageFiles]);

  const handleChange = (event) => {
    const { name, value, checked, type } = event.target;
    // Handle different input types specifically
    let actualValue;
    switch (type) {
      case "checkbox":
        actualValue = checked;
        break;
      case "number":
        actualValue = parseFloat(value); // Convert numeric strings to numbers
        break;
      default:
        actualValue = value;
        break;
    }

    // Handle linked data for dropdowns
    if (name === "locationId" || name === "speciesId" || name === "projectId") {
      const list =
        name === "locationId"
          ? locations
          : name === "speciesId"
          ? species
          : projects;
      const item = list.find((item) => item.id === actualValue);
      const itemNameField = name === "projectId" ? "projectName" : "name"; // Different field name for project

      setFormData((prev) => ({
        ...prev,
        [name]: actualValue,
        [`${name.slice(0, -2)}Name`]: item ? item[itemNameField] : "",
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: actualValue }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Display loading indicator if applicable
    setIsLoading(true);

    // Upload images and get URLs
    const image1Url = await uploadImage(imageFiles.image1);
    const image2Url = await uploadImage(imageFiles.image2);

    // Update formData with the new image URLs
    const plankData = {
      ...formData,
      image1: image1Url, // Ensure the URL is assigned even if it's null
      image2: image2Url, // Ensure the URL is assigned even if it's null
    };

    try {
      // Use plankData which includes the image URLs
      const docRef = await addDoc(
        collection(db, `sawmill/${sawmillId}/planks`),
        plankData
      );
      // alert(`Plank added successfully with ID: ${docRef.id}`);

      // Reset form data after successful submission
      setFormData({
        operatorUID: currentUserUID,
        operatorName: userName,
        date: "",
        length: "",
        width: "",
        depth: "",
        grade: "",
        image1: "",
        image2: "",
        notes: "",
        furniture: false,
        construction: false,
        liveEdge: false,
        general: false,
        locationId: "",
        locationName: "",
        projectId: "",
        projectName: "",
        speciesId: "",
        speciesName: "",
        logId: "",
        status: "available",
        verified: false,
        grade: "",
      });

      const unsubscribe = onSnapshot(
        doc(db, `sawmill/${sawmillId}/planks`, docRef.id),
        (doc) => {
          const data = doc.data();
          if (data.refId) {
            // Once refId is present, display the alert
            alert(`Plank added successfully! RefId: ${data.refId}`);
            unsubscribe(); // Detach the listener
            setIsLoading(false);
          }
        }
      );
    } catch (error) {
      console.error("Error adding plank:", error);
      alert(`Failed to add plank: ${error.message}`);
      setIsLoading(false); // Ensure loading indicator is turned off on error
    }
  };

  const handleFinalPlankConfirmation = async () => {
    setIsLoading(true);
    const logRef = doc(db, `sawmill/${sawmillId}/logs`, logId);

    try {
      await runTransaction(db, async (transaction) => {
        const logDoc = await transaction.get(logRef);
        if (!logDoc.exists()) {
          throw new Error("Document does not exist!");
        }

        const logData = logDoc.data();
        if (logData.planked === false) {
          // Only update if planked is false
          transaction.update(logRef, { 
            planked: true,
            projectId: '',
            projectName: '', 
          });
          console.log("Plank marked as fully logged.");
          setlogIsPlanked(true);

          // await handleSubmit();
        } else {
          console.log("Log already marked as milled, no action taken.");
        }
      });
      alert("Transaction successfully completed!");
    } catch (error) {
      console.error("Transaction failed: ", error);
      alert("Failed to mark log as milled: " + error.message);
    }

    setIsLoading(false);
    setIsFinalPlankDialogOpen(false); // Close the dialog after handling
  };

  const handleWithoutLogClick = () => {
    setWithLog(false);
    setShowForm(true);
    setShowLogInput(true);
  };

  const handleWithLogClick = () => {
    setWithLog(true);
    setShowLogInput(true);
  };

  const updateLogId = (value) => {
    setLogId(value);
  };

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h4" gutterBottom>
        Add Plank
      </Typography>

      {!showLogInput && (
        <>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h6">
                Is this plank from a registered log?
              </Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={handleWithLogClick}
              >
                Yes
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={handleWithoutLogClick}
              >
                No
              </Button>
            </Grid>
          </Grid>
        </>
      )}

      {showLogInput && (
        <>
          {withLog ? (
            <PlankFromLog
              formData={formData}
              setFormData={setFormData}
              setShowForm={setShowForm}
              updateLogId={updateLogId}
            />
          ) : (
            "Since there is no parent tree to confirm the origin of this plank, it has been assigned an unverified rating."
          )}
        </>
      )}

      {showForm && (
        <Grid container xs={12} spacing={2}>
          {formData.logId == "" && (
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id="species-label">Species</InputLabel>
                <Select
                  labelId="species-label"
                  id="speciesId"
                  name="speciesId"
                  value={formData.speciesId}
                  label="species"
                  onChange={handleChange}
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
                onChange={handleChange}
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
              <InputLabel id="grade-label">Grade</InputLabel>
              <Select
                labelId="grade-label"
                id="grade"
                name="grade"
                value={formData.grade}
                label="Grade"
                onChange={handleChange}
              >
                <MenuItem value="1">1</MenuItem>
                <MenuItem value="2">2</MenuItem>
                <MenuItem value="3">3</MenuItem>
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
                onChange={handleChange}
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
              label="Date"
              type="date"
              name="date"
              InputLabelProps={{ shrink: true }}
              value={formData.date}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Width (cm)"
              type="number"
              name="width"
              value={formData.width}
              variant="outlined"
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Depth (cm)"
              type="number"
              name="depth"
              value={formData.depth}
              variant="outlined"
              onChange={handleChange}
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
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="notes"
              type="text"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              multiline={true}
              rows={4}
            />
          </Grid>

          <Grid container p={1}>
            <CheckboxGrid
              name="furniture"
              label="Furniture"
              checked={formData.furniture}
              onChange={handleChange}
            />
            <CheckboxGrid
              name="construction"
              label="Construction"
              checked={formData.construction}
              onChange={handleChange}
            />
            <CheckboxGrid
              name="liveEdge"
              label="Live Edge"
              checked={formData.liveEdge}
              onChange={handleChange}
            />
            <CheckboxGrid
              name="general"
              label="General"
              checked={formData.general}
              onChange={handleChange}
            />
          </Grid>

          <Grid
            container
            item
            p={1}
            xs={12}
            sm={12}
            alignContent={"center"}
            justifyContent={"space-around"}
          >
            <Grid p={1}>
              <Button
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                startIcon={<CloudUploadIcon />}
              >
                Upload Image1
                <VisuallyHiddenInput
                  name="image1"
                  onChange={handleFileChange}
                  type="file"
                />
              </Button>
              <Grid>
                {imageFiles.image1 && <Grid>{imageFiles.image1.name}</Grid>}
              </Grid>
            </Grid>
            <Grid p={1}>
              <Button
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                startIcon={<CloudUploadIcon />}
              >
                Upload Image2
                <VisuallyHiddenInput
                  name="image2"
                  onChange={handleFileChange}
                  type="file"
                />
              </Button>
              <Grid>
                {imageFiles.image2 && <Grid>{imageFiles.image2.name}</Grid>}
              </Grid>
            </Grid>
          </Grid>

          {formData.logId !== "" && (
            <Grid item xs={12} sm={12}>
              <Button
                onClick={() => setIsFinalPlankDialogOpen(true)}
                fullWidth
                variant="contained"
                color={logIsPlanked ? "dark" : "secondary"}
                disabled={logIsPlanked}
              >
                {logIsPlanked ? "SET AS FINAL LOG" : "FINAL LOG?"}
              </Button>
            </Grid>
          )}

         
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              fullWidth
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      )}
      {/* Dialog for confirming final log entry */}
      <Dialog
            open={isFinalPlankDialogOpen}
            onClose={() => setIsFinalPlankDialogOpen(false)}
          >
            <DialogTitle>Confirm Final Plank</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Is this the final plank from this log? Confirming will mark the
                log as fully milled.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={() => setIsFinalPlankDialogOpen(false)}
                color="primary"
              >
                Cancel
              </Button>
              <Button
                onClick={handleFinalPlankConfirmation}
                color="primary"
                autoFocus
              >
                Confirm
              </Button>
            </DialogActions>
          </Dialog>
    </div>
  );
};

function CheckboxGrid({ name, label, checked, onChange }) {
  return (
    <Grid item xs={6} sm={3}>
      <FormControlLabel
        control={
          <Checkbox name={name} checked={!!checked} onChange={onChange} />
        }
        label={label}
      />
    </Grid>
  );
}

export default AddPlank;
