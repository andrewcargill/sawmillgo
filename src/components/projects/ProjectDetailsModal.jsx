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
import {
  Paper,
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";
import Chip from "@mui/material/Chip";
import TagFacesIcon from '@mui/icons-material/TagFaces';

function ProjectDetailsModal({ projectDetails, onClose, setMode }) {
  const userLocalStorage = JSON.parse(localStorage.getItem("user"));
  const db = getFirestore(app);
  const sawmillId = userLocalStorage?.sawmillId;
  const projectUid = projectDetails?.id;

  const handleDelete = async () => {
    // Use prompt to ask the user to input the refId
    const userInput = window.prompt(
      `This action will delete ${projectDetails.projectName}. All linked stock will have status set to 'avaliable'.`
    );

    if (userInput === projectDetails.projectName) {
      try {
        if (projectUid) {
          await deleteDoc(doc(db, `sawmill/${sawmillId}/projects`, projectUid));
          alert("Project deleted successfully.");
          onClose(); // Close the modal or redirect user
        }
      } catch (error) {
        console.error("Error deleting project: ", error);
        alert(`Failed to delete project. Error: ${error.message}`);
      }
    }
  };

  const handleEditButtonClick = () => {
    setMode("edit");
  };

  return (
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
            {projectDetails.projectName}
          </Typography>
        </Grid>
        <Grid container item xs={4} justifyContent={'end'}>
          <Chip size="small" color="secondary" style={{ textTransform: 'capitalize'}} label={projectDetails.status} />
        </Grid>
      </Grid>
      <Grid item xs={12} pb={2}>
        <TableContainer component={Paper}>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell sx={{ width: "30%", py: 0.5, px: 1 }}>
                  Created By
                </TableCell>
                <TableCell sx={{ py: 0.5, px: 1 }}>
                  {projectDetails.createdBy}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ width: "30%", py: 0.5, px: 1 }}>
                  Creator
                </TableCell>
                <TableCell sx={{ py: 0.5, px: 1 }}>
                  {projectDetails.creatorId}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ width: "30%", py: 0.5, px: 1 }}>
                  Customer
                </TableCell>
                <TableCell sx={{ py: 0.5, px: 1 }}>
                  {projectDetails.customerName}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ width: "30%", py: 0.5, px: 1 }}>
                   Info
                </TableCell>
                <TableCell sx={{ py: 0.5, px: 1 }}>
                  {projectDetails.projectInfo}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ width: "30%", py: 0.5, px: 1 }}>
                  Notes
                </TableCell>
                <TableCell sx={{ py: 0.5, px: 1 }}>
                  {projectDetails.notes}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ width: "30%", py: 0.5, px: 1 }}>
                  Date Started
                </TableCell>
                <TableCell sx={{ py: 0.5, px: 1 }}>
                  {projectDetails.date}
                </TableCell>
                
                
              </TableRow>
              <TableRow>
                <TableCell sx={{ width: "30%", py: 0.5, px: 1 }}>
                  Deadline
                </TableCell>
                <TableCell sx={{ py: 0.5, px: 1 }}>
                  {projectDetails.deadline}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
      <Grid item xs={12}>
        <TableContainer component={Paper}>
            <Grid container item xs={12} p={1}>
        <Typography
            id="tree-details-title"
            variant="body2"
            component="h2"
            style={{ textTransform: "capitalize" }}
          >
            allocated stock
          </Typography>
          </Grid>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell sx={{ width: "30%", py: 0.5, px: 1 }}>
                 TREES
                </TableCell>
                <TableCell sx={{ py: 0.5, px: 1 }}>
                 LOGS
                </TableCell>
                <TableCell sx={{ py: 0.5, px: 1 }}>
                 PLANKS
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ width: "30%", py: 0.5, px: 1 }}>
                 <div>XXFN</div> 
                 <div>XXFN</div> 
                 <div>XXFN</div> 
                 <div>XXFN</div> 
                </TableCell>
                <TableCell sx={{ py: 0.5, px: 1 }}>
                XXFL
                </TableCell>
                <TableCell sx={{ py: 0.5, px: 1 }}>
                 GGFD
                </TableCell>
              </TableRow>
              </TableBody>
              </Table>
              </TableContainer>
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

              <Button variant="contained" color="warning" onClick={handleDelete}>
                Delete
              </Button>

              <IconButton aria-label="" onClick={onClose}>
                <CancelIcon />
              </IconButton>
            </Grid>

    </Grid>
  );
}

export default ProjectDetailsModal;
