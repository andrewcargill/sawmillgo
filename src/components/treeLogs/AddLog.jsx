import React, { useState } from "react";
import {
  Grid,
  Typography,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import LogWithoutTree from "./sub-conponents/LogWithoutTree"; // ensure correct path
import { set } from "firebase/database";
import LogFromTree from "./sub-conponents/LogFromTree";


const AddLog = () => {
  const [treeId, setTreeId] = useState("");
  const [withTree, setWithTree] = useState(false);
  const [showTreeInput, setShowTreeInput] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [TreeData, setTreeData] = useState(null);
  const [projects, setProjects] = useState([]);
const [locations, setLocations] = useState([]);

const [formData, setFormData] = useState({
    date: "",
    lumberjackUid: "",
    lumberjackName: "",
    treeId: "",
    projectId: "",
    projectName: "",
    locationId: "",
    locationName: "",
    species: "",
    diameter: "",
    length: "",
    status: "available",
    verified: false,
  });


    //UseEffect
    // Fetch projects from the propject database
    // Fetch locations from the locations database 


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
            <Typography variant="h6">Log from tree?</Typography>
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
        <LogFromTree setShowForm={setShowForm} formData={formData} setFormData={setFormData} />
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
            <TextField label="Species" variant="outlined" fullWidth />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label="Project" variant="outlined" fullWidth />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label="Location" variant="outlined" fullWidth />
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
