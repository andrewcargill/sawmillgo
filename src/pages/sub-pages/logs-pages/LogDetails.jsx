import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { deleteDoc, doc, getDoc, getFirestore } from "firebase/firestore";
import { app } from "../../../firebase-config";
import {
  Button,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
} from "@mui/material";
import { set } from "firebase/database";

const LogDetails = () => {
  const [open, setOpen] = useState(false);
  const [deleteInput, setDeleteInput] = useState("");
  const [logDetails, setLogDetails] = useState(null);
  const [plankList, setPlankList] = useState([]);
  const { logId } = useParams();
  const db = getFirestore(app);
  const sawmillId = JSON.parse(localStorage.getItem("user"))?.sawmillId;

  const navigate = useNavigate();

  const returnToAllLogs = () => {
    navigate("/logs");
  };

  useEffect(() => {
    const fetchLogDetails = async () => {
      const docRef = doc(db, `sawmill/${sawmillId}/logs`, logId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setLogDetails(docSnap.data());
        setPlankList(docSnap.data().plankIds);
        console.log(plankList);
        
        
      } else {
        console.log("No such document!");
      }
    };

    fetchLogDetails();
  }, [logId]);

  const handleDelete = async () => {
    if (deleteInput === logDetails.refId) {
      await deleteDoc(doc(db, `sawmill/${sawmillId}/logs`, logId));
      alert("Log deleted successfully");
      // Redirect or perform additional actions as necessary
      setLogDetails(null); // Clear the details if staying on the same page
    } else {
      alert("Incorrect RefId. Please try again.");
    }
    setOpen(false); // Close the dialog after attempt
    returnToAllLogs();
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleEditClick = () => {
    navigate(`/editlog/${logId}`);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      {logDetails ? (
        <div>
          <h1>Log Details</h1>
          <p>Log Id: {logDetails.refId}</p>
          <p>Verified: {logDetails.verified ? "Yes" : "No"}</p>
          <p>Species: {logDetails.speciesName}</p>
          <p>lumberjack Name: {logDetails.lumberjackName}</p>
          <p>Diameter: {logDetails.diameter}</p>
          <p>Length: {logDetails.length}</p>
          <p>Date: {logDetails.date}</p>
          <p>Planked: {logDetails.planked ? "Yes" : "No"}</p>
          <p>Status: {logDetails.status}</p>
          <p>Project: {logDetails.projectName}</p>
          <br />
          {logDetails.treeId && (
            <>
              <p>If certified:</p>
              <p>Tree Id: {logDetails.treeId}</p>
              <p> (p/h)Lumberjack: John Smith</p>
              <p>(p/h)Felled: 2023-04-01</p>
            <br/>
            
          

            </>

          )}
{logDetails.plankIds &&
<>
<h2>Planks from this log</h2>
                {plankList?.map((plankId) => (
                  <p key={plankId}>{plankId}</p>
                ))}
</>
              }
             
          <Grid container spacing={2} p={1} >
            <Grid item xs={12}>
            <Button variant="contained" onClick={handleClickOpen} fullWidth>
              Delete
            </Button>
            </Grid>
            
            <Grid item xs={12}>
            <Button variant="contained" color="secondary" onClick={handleEditClick} fullWidth>
              Edit
            </Button>
            </Grid>
           
          </Grid>

          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Delete Log</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Please enter the Log ID to confirm:
              </DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label={logDetails.refId}
                type="text"
                fullWidth
                variant="standard"
                onChange={(e) => setDeleteInput(e.target.value.toUpperCase())}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button onClick={handleDelete}>Delete</Button>
            </DialogActions>
          </Dialog>

          {/* Add more fields as needed */}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default LogDetails;
