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



function ProjectAddEditModal({ treeDetails, onClose, setMode }) {

  const userLocalStorage = JSON.parse(localStorage.getItem("user"));
  const db = getFirestore(app);
  const sawmillId = userLocalStorage?.sawmillId;
 


  return (
    <Grid>
    Project Add / Edit Modal
 

    </Grid>
  );
}

export default ProjectAddEditModal;
