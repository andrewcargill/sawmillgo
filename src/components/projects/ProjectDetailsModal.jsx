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
import { useNavigate } from "react-router-dom";

function ProjectDetailsModal({ projectDetails, onClose, setMode }) {
  const userLocalStorage = JSON.parse(localStorage.getItem("user"));
  const db = getFirestore(app);
  const sawmillId = userLocalStorage?.sawmillId;
  const projectUid = projectDetails?.id;

  const navigate = useNavigate();

  const handleDelete = async () => {
    console.log("handleDelete....");
    // Use prompt to ask the user to input the refId
    const userInput = window.prompt(
      `This action will delete ${projectDetails.projectName}. All linked stock will have status set to 'avaliable'.`
    );

    if (userInput === 'yes') {
      console.log("Deleting project...");
      try {
        if (projectUid) {
          console.log("Deleting project with ID: ", projectUid);
          await deleteDoc(doc(db, `sawmill/${sawmillId}/projects`, projectUid));
          alert("Project deleted successfully.");
          onClose(); // Close the modal or redirect user
        }
      } catch (error) {
        console.log("Error deleting project: ", error);
        console.error("Error deleting project: ", error);
        alert(`Failed to delete project. Error: ${error.message}`);
      }
    }
  };

  const handleEditButtonClick = () => {
    setMode("edit");
  };

  const handleViewReport = (projectId) => {
    navigate(`/report/${projectId}`);
    console.log("From Project Details: ", projectId);
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
            allocated stock (placeholder)
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
                  {projectDetails?.treeRefIds && projectDetails?.treeRefIds.map((tree) => (
                    <div>
                    <Chip
                     
                      key={tree}
                      // icon={<TagFacesIcon />}
                      label={tree}
                      variant="outlined"
                      color="dark"
                      size="small"
                    />
                    </div>
                    
             
                  ))}

                 
                </TableCell>
              
                <TableCell sx={{ width: "30%", py: 0.5, px: 1 }}>
                  {projectDetails?.logRefIds && projectDetails?.logRefIds.map((log) => (
                    <div>
                    <Chip
                     
                      key={log}
                      // icon={<TagFacesIcon />}
                      label={log}
                      variant="outlined"
                      color="dark"
                      size="small"
                    />

                    </div>
               
                  ))}
                 
                </TableCell>
                <TableCell sx={{ width: "30%", py: 0.5, px: 1 }}>
                  {projectDetails?.plankRefIds && projectDetails?.plankRefIds.map((plank) => (
                    <div>
                    <Chip
                     
                      key={plank}
                      // icon={<TagFacesIcon />}
                      label={plank}
                      variant="outlined"
                      color="dark"
                      size="small"
                    />

                    </div>
               
                  ))}
                 
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

              {/* <Button variant="outlined"  onClick={() => handleViewReport(projectDetails.id)}>
                Generate Report
              </Button> */}
              <Button variant="outlined"  onClick={() => handleViewReport(projectDetails.id)}>
                Generate Report New
              </Button>

              <IconButton aria-label="" onClick={onClose}>
                <CancelIcon />
              </IconButton>
            </Grid>

    </Grid>
  );
}

export default ProjectDetailsModal;
