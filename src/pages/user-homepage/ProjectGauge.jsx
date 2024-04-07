import React, { useEffect, useState } from 'react';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import { app } from '../../firebase-config'; // Make sure this path is correct
import { useNavigate } from "react-router-dom";

const ProjectGauge = () => {
  const [projects, setProjects] = useState([]);
  const db = getFirestore(app);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchLocations = async () => {
      console.log("Projects: Fetching locations...");
      const userLocalStorage = JSON.parse(localStorage.getItem("user"));
      const sawmillId = userLocalStorage?.sawmillId;
      console.log("Sawmill ID: ", sawmillId);

      if (!sawmillId) {
        console.log("Sawmill ID not found.");
        return;
      }

      // Reference to the 'trees' sub-collection within a specific 'sawmill'
      const projectsRef = collection(db, `sawmill/${sawmillId}/projects`);
      console.log("Projects: Reference to locations collection: ", projectsRef);
      try {
        const querySnapshot = await getDocs(projectsRef);
        const projectsList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setProjects(projectsList);
        console.log("Fetched projects: ", projectsList);
      } catch (error) {
        console.error("Error fetching projects: ", error);
      }
    };

    fetchLocations();
  }, []); // Dependency array is empty, so this runs once on component mount

  const handleAddClick = () => {
    navigate('/projects');
  };

  return (
    <Grid border={1} p={2} bgcolor={'primary.main'}>
    <Typography color="initial">Projects Gauge</Typography>
    <Typography>Total Projects: {projects.length}</Typography>
    <Grid>
      <Button variant="contained" color="primary" onClick={handleAddClick}>View more</Button>
    </Grid>
  </Grid>
  );
};

export default ProjectGauge;
