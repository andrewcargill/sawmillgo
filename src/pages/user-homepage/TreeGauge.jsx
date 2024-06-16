import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import { app } from '../../firebase-config'; // Make sure this path is correct
import { useNavigate } from "react-router-dom";
import ParkIcon from '@mui/icons-material/Park';

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
    navigate('/trees');
  };

  return (
    <Grid border={1} borderRadius={3} p={2} boxShadow={5} bgcolor={'primary.main'}>
      <ParkIcon fontSize='large'/>
      <Typography color="initial">TREES</Typography>
      <Typography>Entries: {trees.length}</Typography>
      <Grid>
        <Button variant="contained" color="primary" onClick={handleAddClick}>View more</Button>
      </Grid>
    </Grid>
  );
};


export default TreeGauge;
