import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { app } from '../../firebase-config'; // Make sure this path is correct
import { useNavigate } from "react-router-dom";
import { Tooltip } from '@mui/material';
import MapIcon from '@mui/icons-material/Map';


const LocationsGauge = () => {
  const [trees, setTrees] = useState([]);
  const [planks, setPlanks] = useState([]);
  const db = getFirestore(app);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlanks = async () => {
      const userLocalStorage = JSON.parse(localStorage.getItem("user"));
      const sawmillId = userLocalStorage?.sawmillId;

      if (!sawmillId) {
        console.log("Sawmill ID not found.");
        return;
      }

    
      const planksRef = collection(db, `sawmill/${sawmillId}/planks`);
      try {
        const querySnapshot = await getDocs(planksRef);
        const planksList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setPlanks(planksList);
        console.log("Fetched planks: ", planksList);
      } catch (error) {
        console.error("Error fetching planks: ", error);
      }
    };

    fetchPlanks();
  }, []); // Dependency array is empty, so this runs once on component mount

  const handleAddClick = () => {
    
  };

  return (
    <>
    <Tooltip title="Coming Soon - Interactive Sawmill Map">
  <Grid
        border={1}
        borderRadius={3}
        p={2}
        boxShadow={5}
        bgcolor={"lightgray"}
        textAlign="center"
        
       
        sx={{
          // cursor: "pointer",
          "&:hover": {
            backgroundColor: "lightgray",
          },
          transition: "lightgray 0.3s",
        }}
      >
  <MapIcon fontSize='large'/>
  <Typography color="initial">
    MAP
    <Typography component="span" variant="body2" color="initial"> </Typography>
  </Typography>

</Grid>
</Tooltip>

    </>
  );
};


export default LocationsGauge;
