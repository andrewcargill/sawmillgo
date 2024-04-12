import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import { app } from '../../firebase-config'; // Make sure this path is correct
import { useNavigate } from "react-router-dom";

const LogGauge = () => {
  const [logs, setLogs] = useState([]);
  const db = getFirestore(app);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchLogs = async () => {
      const userLocalStorage = JSON.parse(localStorage.getItem("user"));
      const sawmillId = userLocalStorage?.sawmillId;

      if (!sawmillId) {
        console.log("Sawmill ID not found.");
        return;
      }

      // Reference to the 'trees' sub-collection within a specific 'sawmill'
      const logsRef = collection(db, `sawmill/${sawmillId}/logs`);
      try {
        const querySnapshot = await getDocs(logsRef);
        const logsList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setLogs(logsList);
        console.log("Fetched logs: ", logsList);
      } catch (error) {
        console.error("Error fetching logs: ", error);
      }
    };

    fetchLogs();
  }, []); // Dependency array is empty, so this runs once on component mount

  const handleAddClick = () => {
    navigate('/logs');
  };

  return (
    <Grid border={1} p={2} bgcolor={'primary.main'}>
      <Typography color="initial">Logs Gauge</Typography>
      <Typography>Total: {logs.length}</Typography>
      <Grid>
        <Button variant="contained" color="primary" onClick={handleAddClick}>View more</Button>
      </Grid>
    </Grid>
  );
};


export default LogGauge;


