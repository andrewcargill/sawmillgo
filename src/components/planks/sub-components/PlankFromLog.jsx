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

const PlankFromLog = ({ formData, setFormData, setShowForm, updateLogId }) => {
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
      }
    } catch (error) {
      console.error("Failed to fetch log data:", error);
      alert("Error fetching log data.");
    }
  };

  const updateFormDataWithLogData = (logData, logId) => {
    // Construct the new form data object based on verification status
    updateLogId(logId);
    const updatedFormData = {
      ...formData,
      logId: logData.refId,
      speciesId: logData.speciesId,
      length: logData.length,
      speciesName: logData.speciesName,
      verified: logData.verified
    };

    console.log("Log Data:", logData);

    if (logData.verified) {
      updatedFormData.treeId = logData.treeId; // Include treeId if log is verified
    }

    if (logData.projectId) {
      updatedFormData.projectId = logData.projectId;
      updatedFormData.projectName = logData.projectName;
      setProjectDialogOpen(true); // Confirm addition to project if projectId is available
    } else {
      setShowForm(true); // Proceed without project dialog
    }

    setFormData(updatedFormData); // Update formData state
    setShowLogId(true);
  };

  const handleDialogClose = (agree) => {
    if (!agree) {
      setFormData({ ...formData, projectId: "", projectName: "" });
    }
    setShowForm(true);
    setProjectDialogOpen(false);
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
          <Typography variant="h6">
            LOG: {formData.logId} - {formData.speciesName} - {formData.verified ? "VERIFIED" : "UNVERIFIED"}
          </Typography>
        </Grid>
      ) : (
        <Grid item xs={12}>
          <Typography variant="h6">Enter Log ID</Typography>
          <TextField
            label="Log ID"
            variant="outlined"
            onKeyPress={handleKeyPress}
            fullWidth
          />
        </Grid>
      )}
      <Dialog open={projectDialogOpen} onClose={() => handleDialogClose(false)}>
        <DialogTitle>Add to Project?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            This log is part of the "{formData.projectName}". Would you like to add this plank to the same project?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleDialogClose(false)} color="primary">
            No
          </Button>
          <Button onClick={() => handleDialogClose(true)} color="primary" autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
};

export default PlankFromLog;
