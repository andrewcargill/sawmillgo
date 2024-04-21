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
  Paper,
} from "@mui/material";
import PlankMoistureCheckGraph from "../../../components/mositure-checks.jsx/PlankMoistureCheckGraph";

const PlankDetails = () => {
  const [open, setOpen] = useState(false);
  const [deleteInput, setDeleteInput] = useState("");
  const [plankDetails, setPlankDetails] = useState(null);
  const { plankId } = useParams();
  const db = getFirestore(app);
  const sawmillId = JSON.parse(localStorage.getItem("user"))?.sawmillId;

  const navigate = useNavigate();

  const returnToAllPlanks = () => {
    navigate("/planks");
  };

  useEffect(() => {
    const fetchPlankDetails = async () => {
      const docRef = doc(db, `sawmill/${sawmillId}/planks`, plankId); // Ensure you have the correct path and possibly sawmillId
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setPlankDetails(docSnap.data());
      } else {
        console.log("No such document!");
      }
    };

    fetchPlankDetails();
  }, [plankId]);

  const handleDelete = async () => {
    if (deleteInput === plankDetails.refId) {
      await deleteDoc(doc(db, `sawmill/${sawmillId}/planks`, plankId));
      alert("Plank deleted successfully");
      // Redirect or perform additional actions as necessary
      setPlankDetails(null); // Clear the details if staying on the same page
    } else {
      alert("Incorrect RefId. Please try again.");
    }
    setOpen(false); // Close the dialog after attempt
    returnToAllPlanks();
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleEditClick = () => {
    navigate(`/editplank/${plankId}`);
  };

  const handleMoistureClick = () => {
    navigate(`/monitorplank/${plankId}`);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      {plankDetails ? (
        <div>
          <h1>Plank Details</h1>
          <p>Plank Id: {plankDetails.refId}</p>
          <p>Verified: {plankDetails.verified ? "Yes" : "No"}</p>
          <p>Operator: {plankDetails.operatorName}</p>
          <p>Date: {plankDetails.date}</p>
          <p>Length: {plankDetails.length}</p>
          <p>Width: {plankDetails.width}</p>
          <p>Depth: {plankDetails.depth}</p>
          <p>Grade: {plankDetails.grade}</p>
          <p>Notes: {plankDetails.notes}</p>
          <p>Project: {plankDetails.projectName}</p>

          <p>Location: {plankDetails.locationName}</p>
          <p>Status: {plankDetails.status}</p>
          <p>Species: {plankDetails.speciesName}</p>
          <br />
          <Grid container>
          <Grid
              item
              container
              xs={6}
              alignContent={"flex-start"}
              justifyContent={"flex-end"}
              maxHeight={'150px'}
            >
              <img
                src={plankDetails.image1}
                alt="Tree"
                style={{
                  width: "auto",
                  height: "100%",
                  objectFit: "contain",
                }}
              />
            </Grid>
          <Grid
              item
              container
              xs={6}
              alignContent={"flex-start"}
              justifyContent={"flex-end"}
              maxHeight={'150px'}
            >
              <img
                src={plankDetails.image2}
                alt="Tree"
                style={{
                  width: "auto",
                  height: "100%",
                  objectFit: "contain",
                 
                }}
              />
            </Grid>
            </Grid>
            
                <PlankMoistureCheckGraph plankId={plankId} />
            

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
          <Grid container spacing={2} p={1} >
            <Grid item xs={12}>
            <Button variant="contained" onClick={handleMoistureClick} fullWidth>
              Add Moisture Check
            </Button>
            </Grid>
            
       
           
          </Grid>

          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Delete Plank</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Please enter the Plank ID to confirm:
              </DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Plank RefId"
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

          {/* Additional fields and logic can be added as needed */}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default PlankDetails;
