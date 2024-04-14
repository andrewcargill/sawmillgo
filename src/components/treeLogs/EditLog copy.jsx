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

  const [formData, setFormData] = useState({  });

 

 const handleInputUpdate = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

  useEffect(() => {
    const fetchLog = async () => {
      const logRef = doc(db, `sawmill/${sawmillId}/logs`, logId);
      const logSnap = await getDoc(logRef);
      if (logSnap.exists()) {
        setLog({ id: logSnap.id, ...logSnap.data() });
      } else {
        alert("Log not found!");
        navigate("/logs"); // Redirect if log not found
      }

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
    };
    
    fetchLog();
  }, [logId, db, sawmillId, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLog((prevLog) => ({ ...prevLog, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const logRef = doc(db, `sawmill/${sawmillId}/logs`, logId);
    try {
      await updateDoc(logRef, {
        ...log,
      });
      alert("Log updated successfully!");
      navigate("/logs"); // Redirect after update
    } catch (error) {
      console.error("Failed to update log:", error);
      alert("Error updating log.");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h4" gutterBottom>
        Edit Log
      </Typography>
      {log ? (
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Date"
              type="date"
              name="date"
              value={log.date || ""}
              onChange={handleInputChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Diameter (cm)"
              type="number"
              name="diameter"
              value={log.diameter || ""}
              onChange={handleInputChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Length (cm)"
              type="number"
              name="length"
              value={log.length || ""}
              onChange={handleInputChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              fullWidth
            >
              Update Log
            </Button>
          </Grid>
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
                value={formData.locationId}
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
        </Grid>
      ) : (
        <p>Loading log details...</p>
      )}
    </div>
  );
};

export default EditLog;
