import React, { useState, useEffect } from 'react';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { app } from '../../firebase-config'; // Update the import path as necessary
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

const ListAllTrees = () => {
  const [trees, setTrees] = useState([]);
  const [showUnlogged, setShowUnlogged] = useState(false);
  const db = getFirestore(app);




  useEffect(() => {
    const fetchTrees = async () => {
      const userLocalStorage = JSON.parse(localStorage.getItem("user"));
      const sawmillId = userLocalStorage?.sawmillId;

      if (!sawmillId) {
        console.log("Sawmill ID not found. Cannot fetch trees.");
        return;
      }

      // Replace `sawmill/${sawmillId}/trees` with the correct path to your trees collection
      const treesCollectionRef = collection(db, `sawmill/${sawmillId}/trees`);
      const snapshot = await getDocs(treesCollectionRef);
      const treesList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setTrees(treesList);
    };

    fetchTrees();
  }, []); // Dependency array is empty, so this runs once on component mount

    const handleTreeClick = (treeId) => {
    console.log(`Tree ${treeId} clicked`);
    };

  return (
    <Grid container spacing={2} border={1} p={2}>
      <Grid item xs={12}>
        <Typography variant="h4" color="initial">Trees</Typography>
      </Grid>
      <Grid
        container
        sx={{ justifyContent: { xs: "center", sm: "flex-start" } }}
        alignContent={"center"}
      >
      {trees.length > 0 ? (
        trees.map(tree => (
            <Grid
            className="item-select"
            item
            container
            xs={5}
            sm={2}
            lg={2}
            key={tree.id}
            m={1}
            bgcolor={"secondary.main"}
            style={{
              border: `2px solid ${tree.logged ? "orange" : "green"}`,
              borderRadius: "5px",
              padding: "12px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer",
            }}
            onClick={() => handleTreeClick(tree.id)}
          >
            <Grid item>
              <h3>{tree.refId}</h3>
            </Grid>
            <Grid item>
              <p>{tree.woodType}</p>
            </Grid>
          </Grid>
        ))
      ) : (
        <Grid item xs={12}>
          <Typography variant="body1">No trees found.</Typography>
        </Grid>
      )}

    </Grid>
    </Grid>
  );
};

export default ListAllTrees;
