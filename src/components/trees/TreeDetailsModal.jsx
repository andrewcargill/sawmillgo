import React, { useState, useEffect } from "react";
import {
  Modal,
  Box,
  Typography,
  Button,
  Grid,
  IconButton,
} from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";

function TreeDetailsModal({ treeDetails, onClose, handleEditClick }) {
  return (
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
          
              <Typography>Project: {treeDetails.projectName}</Typography>

              <Typography>Location: {treeDetails.locationName}</Typography>
              <Typography>Image: {treeDetails.image ? "Yes" : "No"}</Typography>

              <Typography>Species: {treeDetails.speciesName}</Typography>
              <Typography>Age: {treeDetails.age}</Typography>

              <Typography>Latitude: {treeDetails.latitude}</Typography>
              <Typography>Longitude: {treeDetails.longitude}</Typography>
              <Typography>Date: {treeDetails.date}</Typography>
            </Grid>
            <Grid
              item
              container
              xs={6}
              alignContent={"flex-start"}
              justifyContent={"flex-end"}
            >
              <img
                src={treeDetails.image}
                alt="Tree"
                style={{
                  width: "70%",
                  height: "auto",
                  objectFit: "contain",
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <Typography>Reason: {treeDetails.reason}</Typography>
              <Typography>Lumberjack: {treeDetails.lumberjackName}</Typography>
              <Typography>
                Logged: {treeDetails.logged ? "Yes" : "No"}
              </Typography>
              <Typography>Status: {treeDetails.status}</Typography>
            </Grid>
            <Grid
              container
              pt={4}
              flexDirection={"row"}
              justifyContent={"space-around"}
            >
              <Button variant="contained" onClick={handleEditClick}>
                Edit
              </Button>

              <Button variant="contained" color="warning" onClick={onClose}>
                Delete
              </Button>

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
  );
}

export default TreeDetailsModal;
