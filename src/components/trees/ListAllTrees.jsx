import React, { useState, useEffect } from "react";
import {
  getFirestore,
  collection,
  getDocs,
  where,
  query,
} from "firebase/firestore";
import { app } from "../../firebase-config"; // Update the import path as necessary
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import FormHelperText from "@mui/material/FormHelperText";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import TreeDetailsModal from "./TreeDetailsModal";
import TreeListModal from "./TreeListModal";
import { fetchSpeciesForSawmill } from "../../utils/filestoreOperations";

const ListAllTrees = () => {
  const [trees, setTrees] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loggingFilter, setLoggingFilter] = useState("all");
  const [speciesFilter, setSpeciesFilter] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTreeDetails, setSelectedTreeDetails] = useState(null);
  const [species, setSpecies] = useState([]);
  const db = getFirestore(app);
  const sawmillId = JSON.parse(localStorage.getItem("user"))?.sawmillId;

  // const fetchTrees = async () => {
  //   const userLocalStorage = JSON.parse(localStorage.getItem("user"));
  //   const sawmillId = userLocalStorage?.sawmillId;

  //   if (!sawmillId) {
  //     console.log("Sawmill ID not found. Cannot fetch trees.");
  //     return;
  //   }

  //   let q = collection(db, `sawmill/${sawmillId}/trees`);

  //   if (filter === "logged") {
  //     q = query(q, where("logged", "==", true));
  //   } else if (filter === "unlogged") {
  //     q = query(q, where("logged", "==", false));
  //   }

  //   const snapshot = await getDocs(q);
  //   const treesList = snapshot.docs.map((doc) => ({
  //     id: doc.id,
  //     ...doc.data(),
  //   }));
  //   setTrees(treesList);
  // };

  const fetchTrees = async () => {
    if (!sawmillId) {
      console.log("Sawmill ID not found. Cannot fetch trees.");
      return;
    }
  
    let q = collection(db, `sawmill/${sawmillId}/trees`);
  
    let conditions = []; // Array to hold query conditions
    // Add condition for logging status
    if (loggingFilter === "logged") {
          q = query(q, where("logged", "==", true));
        } else if (loggingFilter === "unlogged") {
          q = query(q, where("logged", "==", false));
        }
  
    if (speciesFilter !== "all") {
      conditions.push(where("speciesId", "==", speciesFilter));
    }
  
    if (conditions.length > 0) {
      q = query(q, ...conditions);
    }
  
    const snapshot = await getDocs(q);
    const treesList = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    setTrees(treesList);
  };
  


  useEffect(() => {
    fetchSpeciesForSawmill(db, sawmillId)
      .then((fetchedSpecies) => {
        setSpecies(fetchedSpecies);
      })
      .catch((error) => {
        console.error("Error fetching projects:", error);
        alert("Failed to fetch projects: " + error.message);
      });
  }, []);

  useEffect(() => {
    fetchTrees();
  }, [loggingFilter, speciesFilter]); // Re-run fetchTrees when filter changes

  const handleTreeClick = (treeId) => {
    const tree = trees.find((t) => t.id === treeId);
    setSelectedTreeDetails(tree);
    setIsModalOpen(true);
  };

  function refreshTreeList() {
    fetchTrees();
  }

  return (
    <Grid container spacing={2} border={1} p={2}>
      <Grid item xs={12}>
        <Typography variant="h4" color="initial">
          Trees
        </Typography>
      </Grid>
      <Grid item xs={6}>
        <FormControl fullWidth>
          <InputLabel id="logging-filter-select-label">
            Logging Status
          </InputLabel>
          <Select
            labelId="logging-filter-select-label"
            id="logging-filter-select"
            value={loggingFilter}
            label="Logging Status"
            onChange={(e) => setLoggingFilter(e.target.value)}
          >
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="logged">Logged</MenuItem>
            <MenuItem value="unlogged">Unlogged</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={6}>
        <FormControl fullWidth>
          <InputLabel id="species-filter-select-label">Species</InputLabel>
          <Select
            labelId="species-filter-select-label"
            id="species-filter-select"
            value={speciesFilter}
            label="Species"
            onChange={(e) => setSpeciesFilter(e.target.value)}
          >
            <MenuItem value="all">All</MenuItem>
            {species.map((specie) => (
              <MenuItem key={specie.id} value={specie.id}>
                {specie.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid
        container
        sx={{ justifyContent: { xs: "center", sm: "flex-start" } }}
        alignContent={"center"}
      >
        {trees.length > 0 ? (
          trees.map((tree) => (
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
          refreshTreeList();
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
