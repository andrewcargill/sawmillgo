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
import Chip from "@mui/material/Chip";
import { deleteDoc, doc, getFirestore } from "firebase/firestore";
import { app } from "../../firebase-config";

function TreeDetailsModal({ treeDetails, onClose, setMode }) {
  const userLocalStorage = JSON.parse(localStorage.getItem("user"));
  const db = getFirestore(app);
  const sawmillId = userLocalStorage?.sawmillId;
  const treeUid = treeDetails?.id;

  const handleDelete = async () => {
    // Use prompt to ask the user to input the refId
    const userInput = window.prompt(
      `This action will delete ${treeDetails.refId}. Type the Ref ID to confirm.`
    );
  
    if (userInput === treeDetails.refId) {
      // Check for associated log IDs in the tree details
      if (treeDetails.logIds && treeDetails.logIds.length > 0) {
        // If log IDs exist, prevent deletion and alert the user with a list of log IDs
        const logList = treeDetails.logIds.join(', '); // Creates a string of log IDs separated by commas
        alert(`Cannot delete tree: It has associated logs with IDs: ${logList}.`);
      } else {
        // If no log IDs, proceed with deletion
        try {
          if (treeDetails.id) { // Assuming treeDetails.id is the correct document ID for the tree
            await deleteDoc(doc(db, `sawmill/${sawmillId}/trees`, treeDetails.id));
            alert("Tree deleted successfully.");
            onClose(); // Close the modal or redirect user
          }
        } catch (error) {
          console.error("Error deleting tree: ", error);
          alert(`Failed to delete tree. Error: ${error.message}`);
        }
      }
    } else {
      alert("Incorrect RefId. Please try again.");
    }
  };
  

  const handleEditButtonClick = () => {
    setMode("edit");
  };

  return (
    <Grid>
      <Grid container>
        <Grid container item xs={12} mb={2}>
          <Grid item xs={8}>
            <Typography
              id="tree-details-title"
              variant="h6"
              component="h2"
              color={"primary"}
              style={{ textTransform: "capitalize" }}
            >
               Ref ID: {treeDetails.refId}
            </Typography>
          </Grid>
          <Grid container item xs={4} justifyContent={"end"}>
            <Chip
              size="small"
              color="secondary"
              style={{ textTransform: "capitalize" }}
              label={treeDetails.status}
            />
          </Grid>
        </Grid>
      </Grid>
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
              <Button variant="contained" onClick={handleEditButtonClick}>
                Edit
              </Button>

              <Button
                variant="contained"
                color="warning"
                onClick={handleDelete}
              >
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
