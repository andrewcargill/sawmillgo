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
import { doc, getDoc, getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import { app } from "../../../firebase-config";






const LogFromTree = ({ formData, setFormData, setShowForm }) => {

  const db = getFirestore(app);
const sawmillId = JSON.parse(localStorage.getItem("user"))?.sawmillId;

  const [projectDialogOpen, setProjectDialogOpen] = useState(false);

  const [showTreeId, setShowTreeId] = useState(false);


  const fetchTreeData = async (treeRefId) => {
    const treesCollection = collection(db, `sawmill/${sawmillId}/trees`);
    const q = query(treesCollection, where("refId", "==", treeRefId.trim())); 

    try {
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
            const treeSnap = querySnapshot.docs[0]; // assuming the refId is unique and you want the first match
            const treeData = treeSnap.data();
            updateFormDataWithTreeData(treeData, treeSnap.id); // passing the document ID
            console.log("Searching for Tree ID:", treeRefId);
        } else {
            alert("No tree found with that refId.");
            console.log("Searching for Tree ID:", treeRefId);
            console.log('sawmillId:', sawmillId)
        }
    } catch (error) {
        console.error("Failed to fetch tree data:", error);
        alert("Error fetching tree data.");
    }
};

  
  

  const updateFormDataWithTreeData = (treeData, treeId) => {
    // Construct the new form data object
    const updatedFormData = {
      ...formData,
      treeId: treeData.refId,
      speciesId: treeData.speciesId,
      speciesName: treeData.speciesName,
      projectId: treeData.projectId || "",
      projectName: treeData.projectName || "",
    };
  
    setFormData(updatedFormData); // Update formData state directly
  
    // Determine whether to show the project dialog
    if (treeData.projectId) {
      setProjectDialogOpen(true);  // Confirm addition to project
    } else {
      setShowForm(true); // Proceed without project dialog
    }
  };
  
  

  const handleDialogClose = (agree) => {
    setShowForm(true);
    setShowTreeId(true);
    setProjectDialogOpen(false);
    if (!agree) {
      setFormData({ ...formData, projectId: "", projectName: "" });
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      fetchTreeData(event.target.value);
      event.preventDefault(); 
    }
  };

  return (
    <Grid
      container
      spacing={2}
      style={{ marginTop: "20px", backgroundColor: "#e3f2fd" }}
    >
      {showTreeId ? (
        <Grid item xs={12}>
          <Typography variant="h6">TREE: XXTR - PINE</Typography>
        </Grid>
      ) : (
        <Grid item xs={12}>
          <Typography variant="h6">Enter Tree ID</Typography>
          <TextField
            label="Tree ID"
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
            This tree is part of the "{formData.projectName}". Would you like to
            add this log to the same project?
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

export default LogFromTree;
