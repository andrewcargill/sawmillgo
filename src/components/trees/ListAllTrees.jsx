import React, { useState, useEffect } from 'react';
import { getFirestore, collection, getDocs, where, query } from 'firebase/firestore';
import { app } from '../../firebase-config'; // Update the import path as necessary
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'
import FormHelperText from '@mui/material/FormHelperText'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import InputLabel from '@mui/material/InputLabel'
import TreeDetailsModal from './TreeDetailsModal';
import TreeListModal from './TreeListModal';




const ListAllTrees = () => {
  const [trees, setTrees] = useState([]);
  const [filter, setFilter] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTreeDetails, setSelectedTreeDetails] = useState(null);
  const db = getFirestore(app);


  const fetchTrees = async () => {
    const userLocalStorage = JSON.parse(localStorage.getItem("user"));
    const sawmillId = userLocalStorage?.sawmillId;

    if (!sawmillId) {
      console.log("Sawmill ID not found. Cannot fetch trees.");
      return;
    }

    let q = collection(db, `sawmill/${sawmillId}/trees`);

    if (filter === 'logged') {
      q = query(q, where("logged", "==", true));
    } else if (filter === 'unlogged') {
      q = query(q, where("logged", "==", false));
    }

    const snapshot = await getDocs(q);
    const treesList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setTrees(treesList);
  };

  useEffect(() => {
    fetchTrees();
  }, [filter]); // Re-run fetchTrees when filter changes


  const handleTreeClick = (treeId) => {
    const tree = trees.find(t => t.id === treeId);
    setSelectedTreeDetails(tree);
    setIsModalOpen(true);
  };

  function refreshTreeList() {
    fetchTrees();
  }

  return (
    <Grid container spacing={2} border={1} p={2}>
      <Grid item xs={12}>
        <Typography variant="h4" color="initial">Trees</Typography>
      </Grid>
        <Grid item xs={12}>
      
        <FormControl fullWidth>
          <InputLabel id="filter-select-label">Filter</InputLabel>
          <Select
            labelId="filter-select-label"
            id="filter-select"
            value={filter}
            label="Filter"
            onChange={(e) => setFilter(e.target.value)}
          >
         
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="logged">Logged</MenuItem>
            <MenuItem value="unlogged">Unlogged</MenuItem>
          </Select>
         
        </FormControl>
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
            bgcolor={"white.main"}
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
              <p>{tree.speciesName}</p>
            </Grid>
          </Grid>
        ))
      ) : (
        <Grid item xs={12}>
          <Typography variant="body1">No trees found.</Typography>
        </Grid>
      )}

    </Grid>
    <TreeListModal
    isOpen={isModalOpen}
    onClose={(edited) => {
      setIsModalOpen(false);
      if (edited) {
        refreshTreeList();
      }
    }}
    // onClose={() => setIsModalOpen(false)}
    treeDetails={selectedTreeDetails}
/>
    </Grid>
  );
};

export default ListAllTrees;
