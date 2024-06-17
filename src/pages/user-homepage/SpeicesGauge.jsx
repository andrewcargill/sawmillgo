import React, { useEffect, useState } from 'react';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import { app } from '../../firebase-config'; // Make sure this path is correct
import { useNavigate } from "react-router-dom";
import ForestIcon from '@mui/icons-material/Forest';


const SpeciesGauge = () => {
  const [species, setSpecies] = useState([]); // Updated variable name to 'species'
  const db = getFirestore(app);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchSpecies = async () => {
      console.log("Species: Fetching species...");
      const userLocalStorage = JSON.parse(localStorage.getItem("user"));
      const sawmillId = userLocalStorage?.sawmillId;
      console.log("Sawmill ID: ", sawmillId);

      if (!sawmillId) {
        console.log("Sawmill ID not found.");
        return;
      }

      // Assuming 'species' is directly under each 'sawmill' document
      const speciesRef = collection(db, `sawmill/${sawmillId}/species`); // Updated to point to 'species'
      console.log("Species: Reference to species collection: ", speciesRef);
      try {
        const querySnapshot = await getDocs(speciesRef);
        const speciesList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setSpecies(speciesList); // Updated to set 'species'
        console.log("Fetched species: ", speciesList);
      } catch (error) {
        console.error("Error fetching species: ", error);
      }
    };

    fetchSpecies();
  }, []); // Dependency array is empty, so this runs once on component mount

  const handleAddClick = () => {
    navigate('/species'); // Updated navigation path
  };

  return (
    <Grid border={1} p={2} bgcolor={'primary.main'}>

      <ForestIcon fontSize='large'/>
      <Typography color="initial">SPECIES</Typography>
      <Typography>Entries: {species.length}</Typography> {/* Updated text to 'Total Species' */}
      <Grid>
        <Button variant="contained" color="primary" onClick={handleAddClick}>View more</Button>
      </Grid>
    </Grid>
  );
};

export default SpeciesGauge;
