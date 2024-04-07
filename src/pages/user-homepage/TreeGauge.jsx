import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import { app } from '../../firebase-config'; // Make sure this path is correct
import { useNavigate } from "react-router-dom";

const TreeGauge = () => {
  const [trees, setTrees] = useState([]);
  const db = getFirestore(app);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchTrees = async () => {
      const userLocalStorage = JSON.parse(localStorage.getItem("user"));
      const sawmillId = userLocalStorage?.sawmillId;

      if (!sawmillId) {
        console.log("Sawmill ID not found.");
        return;
      }

      // Reference to the 'trees' sub-collection within a specific 'sawmill'
      const treesRef = collection(db, `sawmill/${sawmillId}/trees`);
      try {
        const querySnapshot = await getDocs(treesRef);
        const treesList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setTrees(treesList);
        console.log("Fetched trees: ", treesList);
      } catch (error) {
        console.error("Error fetching trees: ", error);
      }
    };

    fetchTrees();
  }, []); // Dependency array is empty, so this runs once on component mount

  const handleAddClick = () => {
    navigate('/addtree');
  };

  return (
    <Grid border={1} p={2} bgcolor={'primary.main'}>
      <Typography color="initial">Tree Gauge</Typography>
      <Typography>Total Trees: {trees.length}</Typography>
      <Grid>
        <Button variant="contained" color="primary" onClick={handleAddClick}>Add</Button>
      </Grid>
    </Grid>
  );
};


export default TreeGauge;
