import React, { useState, useEffect } from 'react';
import { Modal, Box, Typography, Button, Grid, TextField, IconButton } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';

function TreeEditModal({ isOpen, onClose, treeDetails, onUpdate }) {
  const [editData, setEditData] = useState({ ...treeDetails });

  // Update editData state when treeDetails changes
  // to ensure the modal has the latest information if reopened
  useEffect(() => {
    setEditData({ ...treeDetails });
  }, [treeDetails]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setEditData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    onUpdate(editData);
    onClose();
  };

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="edit-tree-title"
      aria-describedby="edit-tree-description"
    >
      <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
        <Typography id="edit-tree-title" variant="h6" component="h2">
          Edit Tree Details
        </Typography>
        {editData ? (
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              {/* Display only, not editable */}
              <Grid item xs={12}>
                <Typography>Ref ID: {editData.refId}</Typography>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Project Name"
                  name="projectName"
                  value={editData.projectName}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Location Name"
                  name="locationName"
                  value={editData.locationName}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>
              {/* Assuming the image and species can be edited */}
              <Grid item xs={12}>
                <TextField
                  label="Species"
                  name="speciesName"
                  value={editData.speciesName}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Age"
                  name="age"
                  type="number"
                  value={editData.age}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>
              {/* Other fields as necessary */}
              <Grid item xs={12} container justifyContent="flex-end">
                <Button type="submit" variant="contained" color="primary">Update</Button>
                <IconButton onClick={onClose} sx={{ ml: 2 }}>
                  <CancelIcon />
                </IconButton>
              </Grid>
            </Grid>
          </form>
        ) : (
          <Typography>No tree selected.</Typography>
        )}
      </Box>
    </Modal>
  );
}

export default TreeEditModal;
