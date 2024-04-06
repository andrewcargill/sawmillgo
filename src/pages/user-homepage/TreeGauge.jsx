import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import { app } from '../../firebase-config'; // Make sure this path is correct

const TreeGauge = () => {
  const [treeCounts, setTreeCounts] = useState({ total: 0, logged: 0, notLogged: 0 });
  const db = getFirestore(app);

  useEffect(() => {
    // Assuming the user's linked sawmill ID is stored in local storage or context
    const userLocalStorage = JSON.parse(localStorage.getItem("user"));
    const sawmillId = userLocalStorage?.sawmillId;

    const fetchTrees = async () => {
      if (!sawmillId) {
        console.log("Sawmill ID not found.");
        return;
      }

      // Adjusted to query the 'trees' sub-collection within a specific 'sawmill'
      const treesRef = collection(db, `sawmill/${sawmillId}/trees`);
      const q = query(treesRef, where("logged", "==", true)); // Example: querying for logged trees
      const querySnapshot = await getDocs(q);

      let logged = 0;
      let notLogged = 0;

      querySnapshot.forEach((doc) => {
        // Assuming 'logged' is a boolean field within each tree document
        if (doc.data().logged) {
          logged++;
        } else {
          notLogged++;
        }
      });

      const total = logged + notLogged;

      setTreeCounts({ total, logged, notLogged });
      console.log("total: ", total, "logged: ", logged, "notLogged: ", notLogged);
      console.log("sawmillId: ", sawmillId);
      console.log("treesRef: ", treesRef);
    };

    fetchTrees();
  }, []); // Dependency array is empty, so this runs once on component mount

  return (
    <Grid border={1} p={2} bgcolor={'primary.main'}>
      <Typography color="initial">Tree Gauge</Typography>
      <Typography>Total Trees: {treeCounts.total}</Typography>
      <Typography>Logged Trees: {treeCounts.logged}</Typography>
      <Typography>Not Logged Trees: {treeCounts.notLogged}</Typography>
      <Grid>
        <Button variant="contained" color="primary">View More</Button>
      </Grid>
    </Grid>
  );
};

export default TreeGauge;
