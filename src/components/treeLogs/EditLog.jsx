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
} from "@mui/material";
import {
  fetchLocationsForSawmill,
  fetchProjectsForSawmill,
  fetchSpeciesForSawmill,
} from "../../utils/filestoreOperations";
import { app } from "../../firebase-config";

const EditLog = () => {
  const [log, setLog] = useState(null);
  const [locations, setLocations] = useState([]);
  const [projects, setProjects] = useState([]);
  const [species, setSpecies] = useState([]);
  const { logId } = useParams();
  const navigate = useNavigate();
  const db = getFirestore(app);
  const sawmillId = JSON.parse(localStorage.getItem("user"))?.sawmillId;

  useEffect(() => {
    const fetchLogAndData = async () => {
      const logRef = doc(db, `sawmill/${sawmillId}/logs`, logId);
      const logSnap = await getDoc(logRef);
      if (logSnap.exists()) {
        setLog({ id: logSnap.id, ...logSnap.data() });
      } else {
        alert("Log not found!");
        navigate("/logs"); // Redirect if log not found
      }
    };

    fetchLogAndData();
    fetchLocationsForSawmill(db, sawmillId).then(setLocations).catch((error) => alert(error.message));
    fetchSpeciesForSawmill(db, sawmillId).then(setSpecies).catch((error) => alert(error.message));
    fetchProjectsForSawmill(db, sawmillId)
    .then(fetchedProjects => {
      const normalizedProjects = fetchedProjects.map(project => ({
        id: project.id, // Assuming each project object has an id field
        name: project.projectName // Normalizing project names
      }));
      setProjects(normalizedProjects);
    })
    .catch(console.error);

  }, [logId, db, sawmillId, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLog(prev => ({ ...prev, [name]: value }));
  };

  const handleProjectChange = (event) => {
    const { value } = event.target;
    const project = projects.find(p => p.id === value);
    setLog(prev => ({ ...prev, projectId: value, projectName: project ? project.name : '' }));
  };
  
  const handleLocationChange = (event) => {
    const { value } = event.target;
    const location = locations.find(l => l.id === value);
    setLog(prev => ({ ...prev, locationId: value, locationName: location ? location.name : '' }));
  };
  
  const handleSpeciesChange = (event) => {
    const { value } = event.target;
    const specie = species.find(s => s.id === value);
    setLog(prev => ({ ...prev, speciesId: value, speciesName: specie ? specie.name : '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const logRef = doc(db, `sawmill/${sawmillId}/logs`, logId);
    try {
      await updateDoc(logRef, log);
      alert("Log updated successfully!");
      navigate("/logs"); // Redirect after update
    } catch (error) {
      console.error("Failed to update log:", error);
      alert("Error updating log.");
    }
  };

  return (
   <Grid container>
      <Typography variant="h4" gutterBottom>Edit Log: {log?.refId }</Typography>
      {log ? (
        <Grid container spacing={2}>
          <Grid xs={12} sm={6} item>
          <TextField
            fullWidth
            label="Date"
            type="date"
            name="date"
   
            value={log.date || ""}
            onChange={handleInputChange}
            required
          />
          </Grid>
          <Grid xs={12} sm={6} item>
          <TextField
            fullWidth
            label="Diameter (cm)"
            type="number"
            name="diameter"
        
            value={log.diameter || ""}
            onChange={handleInputChange}
            required
          />
          </Grid>
          <Grid xs={12} sm={6} item>
          <TextField
            fullWidth
            label="Length (cm)"
            type="number"
            name="length"
      
            value={log.length || ""}
            onChange={handleInputChange}
            required
          />
          </Grid>
          
          {renderSelect("speciesId", "Species", species, handleSpeciesChange, log.speciesId)}
         
          {renderSelect("projectId", "Project", projects, handleProjectChange, log.projectId)}
         
          {renderSelect("locationId", "Location", locations, handleLocationChange, log.locationId)}
     
          <Grid xs={12} item>
          <Button variant="contained" color="primary" onClick={handleSubmit} fullWidth>
            Update Log
          </Button>
          </Grid>
        </Grid>
      ) : (
        <p>Loading log details...</p>
      )}
</Grid>
  );
};

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
  
  

export default EditLog;
