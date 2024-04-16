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
} from "@mui/material";
import {
  fetchLocationsForSawmill,
  fetchProjectsForSawmill,
  fetchSpeciesForSawmill,
} from "../../utils/filestoreOperations";
import { getFirestore, addDoc, collection } from "firebase/firestore";
import { app } from "../../firebase-config";
import { getAuth } from "firebase/auth";
import PlankFromLog from "./sub-components/PlankFromLog";

const AddPlank = () => {
  const [withLog, setWithLog] = useState(false);
  const [showLogInput, setShowLogInput] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [projects, setProjects] = useState([]);
  const [locations, setLocations] = useState([]);
  const [species, setSpecies] = useState([]);

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
    grade: "",
  });

  useEffect(() => {
    if (sawmillId) {
      fetchLocationsForSawmill(db, sawmillId)
        .then(setLocations)
        .catch(console.error);
      fetchProjectsForSawmill(db, sawmillId)
        .then(setProjects)
        .catch(console.error);
      fetchSpeciesForSawmill(db, sawmillId)
        .then(setSpecies)
        .catch(console.error);
    }
  }, [db, sawmillId]);

  useEffect(() => {
    console.log("Form data:", formData);
  }, [formData]);

  const handleChange = (event) => {
    const { name, value, checked, type } = event.target;
    const actualValue = type === "checkbox" ? checked : value;

    // Special handling for dropdowns with related name fields
    if (name === "locationId" || name === "speciesId" || name === "projectId") {
      const list =
        name === "locationId"
          ? locations
          : name === "speciesId"
          ? species
          : projects;
      const item = list.find((item) => item.id === value);
      const itemNameField = name === "projectId" ? "projectName" : "name"; // Use projectName for projects

      setFormData((prev) => ({
        ...prev,
        [name]: value,
        [`${name.slice(0, -2)}Name`]: item ? item[itemNameField] : "",
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: actualValue }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const docRef = await addDoc(
        collection(db, `sawmill/${sawmillId}/planks`),
        formData
      );
      alert(`Plank added successfully with ID: ${docRef.refId}`);
      // Reset form data
      setFormData((prev) => ({
        ...prev,
        date: "",
        length: "",
        width: "",
        depth: "",
        thickness: "",
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
      }));
    } catch (error) {
      console.error("Error adding plank:", error);
      alert(`Failed to add plank: ${error.message}`);
    }
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
                Is this plank from a registered tree?
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
            />
          ) : (
            "Since there is no parent tree to confirm the origin of this plank, it has been assigned an unverified rating."
          )}
        </>
      )}

      {showForm && (
        <>
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

          {/** Repeat similar fields for length, width, depth, thickness, etc. */}
          {/** Include species, location, and project selects as in the original example */}
          {/** Include checkboxes for furniture, construction, liveEdge, and general */}

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
        </>
      )}
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
