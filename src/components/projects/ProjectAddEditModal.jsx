import React, { useState, useEffect } from "react";
import {
  Modal,
  Box,
  Typography,
  Button,
  TextField,
  Grid,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Switch,
} from "@mui/material";
import { doc, setDoc, updateDoc, addDoc, collection, getFirestore } from "firebase/firestore";
import { app } from "../../firebase-config";
import CancelIcon from "@mui/icons-material/Cancel";
import { getAuth } from 'firebase/auth';
import { Form } from "react-router-dom";


function ProjectAddEditModal({ projectDetails, isOpen, onClose }) {


  const [isLoading, setIsLoading] = useState(false);
  const [formValues, setFormValues] = useState({
    sawmillId: '',
    projectName: '',
    createdBy: '',
    creatorId: '',
    customerName: '',
    projectInfo: '',
    notes: '',
    date: '',
    deadline: '',
    status: 'active',
    verified: false,
  });

  const db = getFirestore(app);
  const auth = getAuth(app);
  const currentUserUID = auth.currentUser ? auth.currentUser.uid : null;
  const userLocalStorage = JSON.parse(localStorage.getItem("user"));
  const sawmillId = userLocalStorage?.sawmillId;
  



  useEffect(() => {
    console.log("formValues", formValues);
    if (projectDetails) {
      setFormValues({
        projectName: projectDetails.projectName || '',
        createdBy: projectDetails.createdBy || '',
        creatorId: projectDetails.creatorId || '',
        customerName: projectDetails.customerName || '',
        projectInfo: projectDetails.projectInfo || '',
        notes: projectDetails.notes || '',
        date: projectDetails.date || '',
        deadline: projectDetails.deadline || '',
        status: projectDetails.status || 'active',
        verified: projectDetails.verified || false,
      });
    }
  }, [projectDetails, formValues]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Assume you have a state [isLoading, setIsLoading] = useState(false)
  
    const userLocalStorage = JSON.parse(localStorage.getItem("user"));
    const sawmillId = userLocalStorage?.sawmillId;
  
    if (!sawmillId) {
      console.error("Sawmill ID is not available. Cannot modify the project.");
      alert("Sawmill ID is not available. Cannot modify the project.");
      setIsLoading(false);
      return;
    }
  
    // Extend with additional validations as needed
    if (!formValues.projectName || !formValues.customerName) {
      console.error("Required fields are missing.");
      alert("Please fill all required fields.");
      setIsLoading(false);
      return;
    }
  
    const projectData = {
      ...formValues,
      createdBy: projectDetails ? formValues.createdBy : currentUserUID, // Maintain createdBy for updates, set for new entries
    };
  
    try {
      if (projectDetails) {
        // Updating an existing project
        const projectRef = doc(db, `sawmill/${sawmillId}/projects`, projectDetails.id);
        await updateDoc(projectRef, projectData);
        alert('Project updated successfully!');
      } else {
        // Adding a new project
        const newProjectData = {
          ...projectData,
          sawmillId: sawmillId, // Including sawmillId for new projects
        };
        await addDoc(collection(db, `sawmill/${sawmillId}/projects`), newProjectData);
        alert('Project added successfully!');
      }
      onClose(); // Close modal after operation
    } catch (error) {
      console.error("Error saving project: ", error);
      alert(`Failed to save project. Error: ${error.message}`);
    }
    setIsLoading(false); // Reset loading state
  };
  
  
  const handleSwitchChange = (event) => {
    setFormValues({ ...formValues, verified: event.target.checked });
  };

  return (
 
      <Box>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {projectDetails ? 'Edit Project' : 'Add New Project'}
        </Typography>
        <Grid container spacing={2} mt={2}>
        <Grid item xs={12}>
            <FormControlLabel
              control={<Switch checked={formValues.verified} onChange={handleSwitchChange} />}
              label="Is this project for verified items?"
            />
          </Grid>

        <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel id="status-label">Status</InputLabel>
              <Select
                labelId="status-label"
                id="status-select"
                name="status"
                value={formValues.status}
                label="Status"
                onChange={handleChange}
              >
                <MenuItem value="active">Active</MenuItem>
                <MenuItem value="paused">Paused</MenuItem>
                <MenuItem value="withCreator">With Creator</MenuItem>
                <MenuItem value="sold">Sold</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Project Name"
              name="projectName"
              value={formValues.projectName}
              onChange={handleChange}
            />
          </Grid>
         
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Customer Name"
              name="customerName"
              value={formValues.customerName}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Creator ID"
              name="creatorId"
              value={formValues.creatorId}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Project Info"
              name="projectInfo"
              value={formValues.projectInfo}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Notes"
              name="notes"
              value={formValues.notes}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              type="date"
              label="Date Started"
              name="date"
              value={formValues.date}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              type="date"
              label="Deadline"
              name="deadline"
              value={formValues.deadline}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12} mt={2}>
            <Button variant="contained" onClick={handleSubmit}>
              {projectDetails ? 'Update Project' : 'Add Project'}
            </Button>
            <IconButton aria-label="close" onClick={onClose}>
              <CancelIcon />
            </IconButton>
          </Grid>
        </Grid>
      </Box>
  
  );
}

export default ProjectAddEditModal;
