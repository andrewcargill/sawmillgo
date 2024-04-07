import React, { useEffect, useState } from 'react';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import { app } from '../../firebase-config'; // Make sure this path is correct
import { useNavigate } from "react-router-dom";

const LocationGauge = () => {
  const [locations, setLocations] = useState([]);
  const db = getFirestore(app);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchLocations = async () => {
      console.log("Locations: Fetching locations...");
      const userLocalStorage = JSON.parse(localStorage.getItem("user"));
      const sawmillId = userLocalStorage?.sawmillId;
      console.log("Sawmill ID: ", sawmillId);

      if (!sawmillId) {
        console.log("Sawmill ID not found.");
        return;
      }

      // Reference to the 'trees' sub-collection within a specific 'sawmill'
      const locationsRef = collection(db, `sawmill/${sawmillId}/locations`);
      console.log("Locations: Reference to locations collection: ", locationsRef);
      try {
        const querySnapshot = await getDocs(locationsRef);
        const locationsList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setLocations(locationsList);
        console.log("Fetched locations: ", locationsList);
      } catch (error) {
        console.error("Error fetching locations: ", error);
      }
    };

    fetchLocations();
  }, []); // Dependency array is empty, so this runs once on component mount

  const handleAddClick = () => {
    navigate('/locations');
  };

  return (
    <Grid border={1} p={2} bgcolor={'primary.main'}>
      <Typography color="initial">Locations Gauge</Typography>
      <Typography>Total Locations: {locations.length}</Typography>
      <Grid>
        <Button variant="contained" color="primary" onClick={handleAddClick}>View more</Button>
      </Grid>
    </Grid>
  );
};

 



export default LocationGauge;
