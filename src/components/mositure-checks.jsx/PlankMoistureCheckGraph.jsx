import { getFirestore, doc, collection, addDoc } from "firebase/firestore";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { app } from "../../firebase-config";
import { getAuth } from "firebase/auth";
import { TextField, Grid, Button, Paper } from "@mui/material";

const PlankMoistureCheckGraph = ({ plankId }) => {
  const db = getFirestore(app);
  const auth = getAuth(app);
  const currentUserUID = auth.currentUser ? auth.currentUser.uid : null;
  const sawmillId = JSON.parse(localStorage.getItem("user"))?.sawmillId;
  const userName = JSON.parse(localStorage.getItem("user"))?.displayName;

  return (
    <Grid container justifyContent={'center'} p={2}>
      <Paper >
        <Grid p={2}>
        Mositure Check Graph for Plank ID: {plankId}
        </Grid>
        </Paper>
    </Grid>
  );
};

export default PlankMoistureCheckGraph;
