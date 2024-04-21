import { getFirestore, doc, collection, addDoc } from "firebase/firestore";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { app } from "../../firebase-config";
import { getAuth } from "firebase/auth";
import { TextField, Grid, Button } from "@mui/material";

const AddMoistureCheck = () => {
  const db = getFirestore(app);
  const auth = getAuth(app);
  const currentUserUID = auth.currentUser ? auth.currentUser.uid : null;
  const sawmillId = JSON.parse(localStorage.getItem("user"))?.sawmillId;
  const userName = JSON.parse(localStorage.getItem("user"))?.displayName;

  const { plankId } = useParams();

  const [formData, setFormData] = useState({
    operatorUID: currentUserUID,
    operatorName: userName,
    date: "",
    moistureContent: null,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const plankRef = doc(db, `sawmill/${sawmillId}/planks`, plankId);
    const moistureRef = collection(plankRef, "moistureChecks");

    try {
      await addDoc(moistureRef, {
        ...formData,
        moistureContent: Number(formData.moistureContent), // Ensure this is a number
        date: formData.date
      });
      alert("Moisture check added successfully!");
      // Optional: Clear form or navigate away
      setFormData({
        operatorUID: currentUserUID,
        operatorName: userName,
        date: "",
        moistureContent: null,
      });
    } catch (error) {
      console.error("Error adding moisture check:", error);
      alert("Failed to add moisture check.");
    }
  };

  return (
    <div>
      <h1>Add Moisture Check</h1>
      <h2>Plank ID: {plankId}</h2>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Date"
              type="date"
              name="date"
              InputLabelProps={{ shrink: true }}
              value={formData.date}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Moisture %"
              type="number"
              name="moistureContent"
              value={formData.moistureContent || ''}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default AddMoistureCheck;
