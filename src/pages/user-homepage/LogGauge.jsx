import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import { app } from '../../firebase-config'; // Make sure this path is correct
import { useNavigate } from "react-router-dom";
import WorkspacesIcon from '@mui/icons-material/Workspaces';
import { WorkSharp } from '@mui/icons-material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { IconButton } from '@mui/material';

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
          <WorkspacesIcon fontSize='large'/>
  <Typography color="initial">
    LOGS 
    <Typography component="span" variant="body2" color="initial"> ({logs.length})</Typography>
  </Typography>
 
</Grid>
    {/* <Grid textAlign="center">
      <WorkspacesIcon fontSize='large' sx={{ color: 'dark.main' }} />
      <Typography color="initial">LOGS
      <Typography component="span" variant="body2" color="initial"> ({logs.length})</Typography>
      </Typography>
   
      <Grid item padding={1}>
    <Button size='small' variant="contained" color="dark" onClick={handleAddClick}>View more</Button>
  </Grid> */}
 
    </>
  );
};


export default LogGauge;


