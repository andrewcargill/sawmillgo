import React, { useState, useEffect } from 'react';
import { Modal, Box, Typography, Button, Grid, IconButton } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';


function TreeDetailsModal({ isOpen, onClose, treeDetails }) {
    return (
      <Modal
        open={isOpen}
        onClose={onClose}
        aria-labelledby="tree-details-title"
        aria-describedby="tree-details-description"
      >
        <Box sx={{ 
          position: 'absolute', 
          top: '50%', 
          left: '50%', 
          transform: 'translate(-50%, -50%)', 
          width: 400, 
          bgcolor: 'background.paper', 
          boxShadow: 24, 
          p: 4 
        }}>
                        <Grid>
          <Typography id="tree-details-title" variant="h6" component="h2">
            Tree Details
          </Typography>
          {treeDetails ? (
            <>  
                <Grid container xs={12}>
                    <Grid item xs={6}>
              <Typography id="tree-details-description" sx={{ mt: 2 }}>
                Ref ID: {treeDetails.refId}
              </Typography>
              <Typography>
                Wood Type: {treeDetails.woodType}
              </Typography>
              <Typography>
                Age: {treeDetails.age}
              </Typography>
              <Typography>
                Logged: {treeDetails.logged ? "Yes" : "No"}
              </Typography>
              <Typography>
                Status: {treeDetails.status}
              </Typography>
              </Grid>
              <Grid item container xs={6} justifyContent={'center'} >
                <img src={treeDetails.image} alt="Tree" style={{ width: "70%" }} />
                </Grid>

                <Grid item xs={12} >
              <Typography>
                Image: {treeDetails.image ? "Yes" : "No"}
              </Typography>
              <Typography>
                Date: {treeDetails.date}
              </Typography>
              <Typography>
                Operator: {treeDetails.lumberjack}
              </Typography>
              <Typography>
                Project: {treeDetails.projectId}
              </Typography>
              <Typography>
               Location: {treeDetails.locationId}
              </Typography>
              <Typography>
               Location: {treeDetails.reason}
              </Typography>
              <Typography>
               Latitude: {treeDetails.latitude}
              </Typography>
              <Typography>
               Longitude: {treeDetails.longitude}
              </Typography>
            </Grid>
                <Grid container pt={4} flexDirection={'row'} justifyContent={'space-around'}>

                <Button variant='contained' onClick={onClose}>Edit</Button>
                
                <Button variant='contained' color='warning' onClick={onClose}>Delete</Button>
                
                <IconButton aria-label="" onClick={onClose}>
                <CancelIcon />
                </IconButton> 


                </Grid>
              </Grid>
        
            </>
          ) : (
            <Typography>No tree selected.</Typography>
          )}
          </Grid>
        </Box>
      </Modal>
    );
  }

export default TreeDetailsModal;