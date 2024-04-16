import React, { useState } from "react";
import {
  Grid,
  TextField,
  Button,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";
import { app } from "../../../firebase-config";

const PlankFromLog = ({ formData, setFormData, setShowForm }) => {
  const db = getFirestore(app);
  const sawmillId = JSON.parse(localStorage.getItem("user"))?.sawmillId;
  const [projectDialogOpen, setProjectDialogOpen] = useState(false);
  const [showLogId, setShowLogId] = useState(false);

  const fetchLogData = async (logRefId) => {
    const logsCollection = collection(db, `sawmill/${sawmillId}/logs`);
    const q = query(logsCollection, where("refId", "==", logRefId.trim()));

    try {
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const logSnap = querySnapshot.docs[0]; // assuming the refId is unique and you want the first match
        const logData = logSnap.data();
        updateFormDataWithLogData(logData, logSnap.id); // passing the document ID
        console.log("Searching for Log ID:", logRefId);
      } else {
        alert("No log found with that refId.");
        console.log("Searching for Log ID:", logRefId);
        console.log('sawmillId:', sawmillId);
      }
    } catch (error) {
      console.error("Failed to fetch log data:", error);
      alert("Error fetching log data.");
    }
  };

  const updateFormDataWithLogData = (logData, logId) => {
    // Construct the new form data object
    const updatedFormData = {
      ...formData,
      logId: logData.refId,
      speciesId: logData.speciesId,
      length: logData.length,
      speciesName: logData.speciesName,
      projectId: logData.projectId || "",
      projectName: logData.projectName || "",
      verified: logData.verified ? true : formData.verified
    };

    setFormData(updatedFormData); // Update formData state directly

    // Determine whether to show the project dialog
    if (logData.projectId) {
      setProjectDialogOpen(true); // Confirm addition to project
    } else {
      setShowForm(true); // Proceed without project dialog
    }
  };

  const handleDialogClose = (agree) => {
    setShowForm(true);
    setShowLogId(true);
    setProjectDialogOpen(false);
    if (!agree) {
      setFormData({ ...formData, projectId: "", projectName: "" });
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      fetchLogData(event.target.value);
      event.preventDefault();
    }
  };

  return (
    <Grid
      container
      spacing={2}
      style={{ marginTop: "20px", backgroundColor: "#e3f2fd" }}
    >
      {showLogId ? (
        <Grid item xs={12}>

        
            {formData.verified ? (
                <Typography variant="h6">
                   LOG: {formData.logId} - {formData.speciesName} VERIFIED
            </Typography>
            ) : (
              <Typography variant="h6">
              LOG: {formData.logId} - {formData.speciesName} - UNVERIFIED
       </Typography>
            )}
           

        </Grid>
      ) : (
        <Grid item xs={12}>
          <Typography variant="h6">Enter Log ID</Typography>
          <TextField
            label="Log ID"
            variant="outlined"
            onKeyPress={handleKeyPress} // Use the onKeyPress event
            fullWidth
          />
        </Grid>
      )}
      <Dialog open={projectDialogOpen} onClose={() => handleDialogClose(false)}>
        <DialogTitle>Add to Project?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            This log is part of the "{formData.projectName}". Would you like to
            add this plank to the same project?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleDialogClose(false)} color="primary">
            No
          </Button>
          <Button
            onClick={() => handleDialogClose(true)}
            color="primary"
            autoFocus
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
};

export default PlankFromLog;
