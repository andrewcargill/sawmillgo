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

function ProjectDetailsModal({ projectDetails, onClose, setMode }) {
  const userLocalStorage = JSON.parse(localStorage.getItem("user"));
  const db = getFirestore(app);
  const sawmillId = userLocalStorage?.sawmillId;

  const handleEditButtonClick = () => {
    setMode("edit");
  };

  return (
    <Grid container>
      <Grid cvontainer item xs={12}>
        <Grid item xs={8}>
          <Typography
            id="tree-details-title"
            variant="h6"
            component="h2"
            style={{ textTransform: "capitalize" }}
          >
            {projectDetails.projectName}
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Chip label={projectDetails.status} />
        </Grid>
      </Grid>
      <Grid item xs={12}>
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
                  Customer Name
                </TableCell>
                <TableCell sx={{ py: 0.5, px: 1 }}>
                  {projectDetails.customerName}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ width: "30%", py: 0.5, px: 1 }}>
                  Project Info:
                </TableCell>
                <TableCell sx={{ py: 0.5, px: 1 }}>
                  {projectDetails.projectInfo}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ width: "30%", py: 0.5, px: 1 }}>
                  Project Notes:
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
      <Grid item xs={6}></Grid>

      <Button variant="contained" onClick={handleEditButtonClick}>
        Edit
      </Button>
    </Grid>
  );
}

export default ProjectDetailsModal;
