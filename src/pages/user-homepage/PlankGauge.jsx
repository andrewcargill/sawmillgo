import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import { app } from '../../firebase-config'; // Make sure this path is correct
import { useNavigate } from "react-router-dom";
import TableRowsIcon from '@mui/icons-material/TableRows';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { IconButton } from '@mui/material';


const PlankGauge = () => {
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
    navigate('/planks');
  };

  return (
    <>
  <Grid
        border={1}
        borderRadius={3}
        p={2}
        boxShadow={5}
        bgcolor={"primary.main"}
        textAlign="center"
        onClick={handleAddClick}
        sx={{
          cursor: "pointer",
          "&:hover": {
            backgroundColor: "white.main",
          },
          transition: "background-color 0.5s",
        }}
      >
  <TableRowsIcon fontSize='large'/>
  <Typography color="initial">
    PLANKS
    <Typography component="span" variant="body2" color="initial"> ({planks.length})</Typography>
  </Typography>

</Grid>
   {/* <Grid textAlign="center">
      <TableRowsIcon fontSize='large' sx={{ color: 'dark.main' }} />
      <Typography color="initial">LUMBER
      <Typography component="span" variant="body2" color="initial"> ({planks.length})</Typography>
      </Typography>
    
      <Grid item padding={1}>
    <Button size='small' variant="contained" color="dark" onClick={handleAddClick}>View more</Button>
  </Grid>
    </Grid> */}
    </>
  );
};


export default PlankGauge;
