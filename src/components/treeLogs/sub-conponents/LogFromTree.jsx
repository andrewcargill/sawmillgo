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


const LogFromTree = ({ formData, setFormData, setShowForm }) => {

  const [projectDialogOpen, setProjectDialogOpen] = useState(false);

  const [showTreeId, setShowTreeId] = useState(false);

  const fetchTreeData = (treeId) => {

    // Placeholder for fetching tree data
    // Fetch the tree data using the treeId
    // No Tree - aleart user to enter correct tree ID

    // If tree. Save tree.refId to treeData.treeId / save tree.species to treeData.species 
    // If tree has projectId  store tree.projectId to treeData.projectId and tree.projectName to treedata.projectName


    const fetchedData = { projectName: "Alpha Project", projectId: "123" };
    setFormData({ ...formData, treeId, ...fetchedData });
    setProjectDialogOpen(true);
  };

  const handleDialogClose = (agree) => {
    setShowForm(true);
    setShowTreeId(true);
    setProjectDialogOpen(false);
    if (!agree) {
      setFormData({ ...formData, projectId: "", projectName: "" });  // Reset project details if disagreed
    }
  };

  const handleInputChange = (event) => {
    fetchTreeData(event.target.value);
  };
 
  return (


    <Grid container spacing={2} style={{ marginTop: "20px", backgroundColor: "#e3f2fd" }}>
        {showTreeId ? (
      'Log for Tree ID XXTR'
        ):(
            <Grid item xs={12}>
            <Typography variant="h6">Enter Tree ID</Typography>
            <TextField
              label="Tree ID"
              variant="outlined"
              
              onChange={handleInputChange}
          
              fullWidth
            />
          </Grid>
           )}
      <Dialog open={projectDialogOpen} onClose={() => handleDialogClose(false)}>
        <DialogTitle>Add to Project?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            This tree is part of the "{formData.projectName}". Would you like to add this log to the same project?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleDialogClose(false)} color="primary">No</Button>
          <Button onClick={() => handleDialogClose(true)} color="primary" autoFocus>Yes</Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
};

export default LogFromTree;
