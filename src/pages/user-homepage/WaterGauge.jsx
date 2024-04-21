import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import { app } from '../../firebase-config'; // Make sure this path is correct
import { useNavigate } from "react-router-dom";

const WaterGauge = () => {
  const [waterChecks, setWaterChecks] = useState([]);
  const db = getFirestore(app);

  const navigate = useNavigate();

  const handleAddClick = () => {
    navigate('/moisture-checks');
  };

  return (
    <Grid border={1} p={2} bgcolor={'primary.main'}>
      <Typography color="initial">Moisture Gauge</Typography>
      <Grid>
        <Button variant="contained" color="primary" onClick={handleAddClick}>View more</Button>
      </Grid>
    </Grid>
  );
};


export default WaterGauge;
