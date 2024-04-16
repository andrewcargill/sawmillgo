import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore";
import {
  Button,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { app } from "../../firebase-config";
import {
  fetchLocationsForSawmill,
  fetchProjectsForSawmill,
  fetchSpeciesForSawmill,
} from "../../utils/filestoreOperations";

const EditPlank = () => {
  const [plank, setPlank] = useState(null);
  const [species, setSpecies] = useState([]);
  const [locations, setLocations] = useState([]);
  const [projects, setProjects] = useState([]);
  const { plankId } = useParams();
  const navigate = useNavigate();
  const db = getFirestore(app);
  const sawmillId = JSON.parse(localStorage.getItem("user"))?.sawmillId;

  useEffect(() => {
    const fetchPlankAndData = async () => {
      const plankRef = doc(db, `sawmill/${sawmillId}/planks`, plankId);
      const plankSnap = await getDoc(plankRef);
      if (plankSnap.exists()) {
        setPlank({ id: plankSnap.id, ...plankSnap.data() });
      } else {
        alert("Plank not found!");
        navigate("/planks"); // Redirect if plank not found
      }
    };

    fetchPlankAndData();
    fetchLocationsForSawmill(db, sawmillId).then(setLocations).catch((error) => alert(error.message));
    fetchProjectsForSawmill(db, sawmillId)
    .then(fetchedProjects => {
      const normalizedProjects = fetchedProjects.map(project => ({
        id: project.id, // Assuming each project object has an id field
        name: project.projectName // Normalizing project names
      }));
      setProjects(normalizedProjects);
    })
    .catch(console.error);
    fetchSpeciesForSawmill(db, sawmillId).then(setSpecies).catch((error) => alert(error.message));

  }, [plankId, db, sawmillId, navigate]);

  const handleInputChange = (e) => {
    const { name, value, checked, type } = e.target;
    const actualValue = type === "checkbox" ? checked : value;
    setPlank(prev => ({ ...prev, [name]: actualValue }));
  };

  const handleSelectChange = (event, data) => {
    const { name, value } = event.target;
    // Remove the last 2 characters "Id" from the name before appending "Name"
    const baseName = name.slice(0, -2); // This removes the last two characters, assuming they are always "Id"
    const selectedItem = data.find(item => item.id === value);
    setPlank(prev => ({ ...prev, [name]: value, [`${baseName}Name`]: selectedItem ? selectedItem.name : '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const plankRef = doc(db, `sawmill/${sawmillId}/planks`, plankId);
    try {
      await updateDoc(plankRef, plank);
      alert("Plank updated successfully!");
      navigate("/planks"); // Redirect after update
    } catch (error) {
      console.error("Failed to update plank:", error);
      alert("Error updating plank.");
    }
  };

  return (
    <Grid container>
      <Typography variant="h4" gutterBottom>Edit Plank: {plank?.refId}</Typography>
      {plank ? (
        <Grid container spacing={2}>
          <TextFieldGrid name="date" label="Date" type="date" value={plank.date} onChange={handleInputChange} />
          <TextFieldGrid name="length" label="Length (cm)" value={plank.length} onChange={handleInputChange} />
          <TextFieldGrid name="width" label="Width (cm)" value={plank.width} onChange={handleInputChange} />
          <TextFieldGrid name="depth" label="Depth (cm)" value={plank.depth} onChange={handleInputChange} />
    
          <TextFieldGrid name="grade" label="Grade" value={plank.grade} onChange={handleInputChange} />
          <TextFieldGrid name="notes" label="Notes" value={plank.notes} onChange={handleInputChange} multiline />
          {renderSelect("locationId", "Location", locations, event => handleSelectChange(event, locations), plank.locationId)}
          {renderSelect("projectId", "Project", projects, event => handleSelectChange(event, projects), plank.projectId)}
          {renderSelect("speciesId", "Species", species, event => handleSelectChange(event, species), plank.speciesId)}
          <TextFieldGrid name="image1" label="Image 1 URL" value={plank.image1} onChange={handleInputChange} />
          <TextFieldGrid name="image2" label="Image 2 URL" value={plank.image2} onChange={handleInputChange} />
          <CheckboxGrid name="furniture" label="Furniture" checked={plank.furniture} onChange={handleInputChange} />
          <CheckboxGrid name="construction" label="Construction" checked={plank.construction} onChange={handleInputChange} />
          <CheckboxGrid name="liveEdge" label="Live Edge" checked={plank.liveEdge} onChange={handleInputChange} />
          <CheckboxGrid name="general" label="General" checked={plank.general} onChange={handleInputChange} />

          <Grid item xs={12}>
            <Button variant="contained" color="primary" onClick={handleSubmit} fullWidth>
              Update Plank
            </Button>
          </Grid>
        </Grid>
      ) : (
        <p>Loading plank details...</p>
      )}
    </Grid>
  );
};

function TextFieldGrid({ name, label, type = "text", value, onChange, multiline = false }) {
  return (
    <Grid item xs={12} sm={6}>
      <TextField
        fullWidth
        label={label}
        type={type}
        name={name}
        value={value || ""}
        onChange={onChange}
        required={!multiline}
        multiline={multiline}
        rows={multiline ? 4 : 1}
      />
    </Grid>
  );
}

function CheckboxGrid({ name, label, checked, onChange }) {
  return (
    <Grid item xs={12} sm={6}>
      <FormControlLabel
        control={<Checkbox name={name} checked={!!checked} onChange={onChange} />}
        label={label}
      />
    </Grid>
  );
}

function renderSelect(name, label, options, onChange, value) {
  return (
    <Grid item xs={12} sm={6}>
      <FormControl fullWidth>
        <InputLabel id={`${name}-label`}>{label}</InputLabel>
        <Select
          labelId={`${name}-label`}
          id={name}
          name={name}
          value={value || ""}
          label={label}
          onChange={onChange}
        >
          {options.map(option => (
            <MenuItem key={option.id} value={option.id}>
              {option.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Grid>
  );
}

export default EditPlank;
