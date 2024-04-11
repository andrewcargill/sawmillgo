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
import { deleteDoc, doc, getFirestore } from "firebase/firestore";
import { app } from "../../firebase-config";



function ProjectDetailsModal({ treeDetails, onClose, setMode }) {

  const userLocalStorage = JSON.parse(localStorage.getItem("user"));
  const db = getFirestore(app);
  const sawmillId = userLocalStorage?.sawmillId;


  const handleEditButtonClick = () => {
    setMode("edit");
  }
  
  
  return (
    <Grid>
    Project Details Modal
    <Button variant="contained" onClick={handleEditButtonClick}>
                Edit
              </Button>
    </Grid>
  );
}

export default ProjectDetailsModal;
