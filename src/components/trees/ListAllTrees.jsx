import React, { useState, useEffect } from "react";
import {
  getFirestore,
  collection,
  getDocs,
  where,
  query,
} from "firebase/firestore";
import { app } from "../../firebase-config";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import TextField from "@mui/material/TextField";
import { fetchSpeciesForSawmill } from "../../utils/filestoreOperations";
import CarpenterIcon from "@mui/icons-material/Carpenter";
import BlockIcon from "@mui/icons-material/Block";
import ItemDialog from "../item-dialogs/ItemDialog";

const ListAllTrees = () => {
  const [trees, setTrees] = useState([]);
  const [modalMode, setModalMode] = useState("view");
  const [loggingFilter, setLoggingFilter] = useState("all");
  const [speciesFilter, setSpeciesFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("available");
  const [refIdFilter, setRefIdFilter] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTreeDetails, setSelectedTreeDetails] = useState(null);
  const [species, setSpecies] = useState([]);
  const db = getFirestore(app);
  const sawmillId = JSON.parse(localStorage.getItem("user"))?.sawmillId;

  const fetchTrees = async (statusFilter) => {
    if (!sawmillId) {
      console.log("Sawmill ID not found. Cannot fetch trees.");
      return;
    }

    let q = collection(db, `sawmill/${sawmillId}/trees`);

    let conditions = []; // Array to hold query conditions
    // Add condition for logging status

    if (statusFilter) {
      conditions.push(where("status", "==", statusFilter));
    }

    if (refIdFilter.trim()) {
      // Filter by refId if it is provided
      q = query(q, where("refId", "==", refIdFilter.trim()));
    } else {
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
    }
    const snapshot = await getDocs(q);
    const treesList = snapshot.docs.map((doc) => ({
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
    fetchTrees(statusFilter);
  }, [loggingFilter, speciesFilter, refIdFilter, statusFilter]); // Re-run fetchTrees when filter changes

  const handleTreeClick = (treeId) => {
    const tree = trees.find((t) => t.id === treeId);
    setSelectedTreeDetails(tree);
    setModalMode("view");
    setIsModalOpen(true);
  };

  const handleAddTreeClick = () => {
    setModalMode("add");
    setIsModalOpen(true);
  };

  function refreshTreeList() {
    fetchTrees(statusFilter);
  }

  const handleSaveLog = (updatedLog) => {
    // Logic to save the updated or new log
    console.log("Save log:", updatedLog);
    setIsModalOpen(false);
    fetchTrees(); // Refresh the list after saving
  };

  const handleCloseDialog = () => {
    setIsModalOpen(false);
    setSelectedTreeDetails(null); // Clear selected log to ensure fresh state
    console.log("Dialog closed");
  };

  return (
    <Grid container spacing={2} p={2}>
      <Grid container item xs={12}>
        <Grid xs={6} sm={10} container item justifyContent={"start"}>
          <Typography variant="h4" color="initial">
            Trees
          </Typography>
        </Grid>
        <Grid container item xs={6} sm={2} justifyContent={"end"}>
          <Button
            variant="outlined"
            color="primary"
            onClick={handleAddTreeClick}
            startIcon={<AddIcon />}
          >
            add
          </Button>
        </Grid>
      </Grid>
      <Grid item xs={6} md={3}>
        <FormControl fullWidth>
          <InputLabel id="status-filter-select-label">Availability</InputLabel>
          <Select
            size="small"
            labelId="status-filter-select-label"
            id="status-filter-select"
            value={statusFilter}
            label="avaliability"
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <MenuItem value="available">Available</MenuItem>
            <MenuItem value="reserved">Reserved</MenuItem>
            <MenuItem value="sold">Sold</MenuItem>
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={6} md={3}>
        <FormControl fullWidth>
          <InputLabel id="logging-filter-select-label">
            Logging Status
          </InputLabel>
          <Select
            size="small"
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
      <Grid item xs={6} md={3}>
        <FormControl fullWidth>
          <InputLabel id="species-filter-select-label">Species</InputLabel>
          <Select
            size="small"
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
      <Grid item xs={6} md={3}>
        <FormControl fullWidth>
          <TextField
            size="small"
            label="Tree ID"
            variant="outlined"
            value={refIdFilter}
            onChange={(e) => setRefIdFilter(e.target.value.toUpperCase())}
            // helperText="Enter a Ref ID to filter by specific tree"
          />
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
              item
              xs={3}
              sm={2}
              lg={2}
              key={tree.id}
              m={1}
              border={1}
              borderRadius={3}
              p={2}
              boxShadow={2}
              bgcolor={"white.main"}
              textAlign="center"
              style={{
                position: "relative",
              }}
              sx={{
                cursor: "pointer",
                "&:hover": {
                  backgroundColor: "primary.main",
                },
                transition: "background-color 0.5s",
              }}
              onClick={() => handleTreeClick(tree.id)}
            >
              <Grid item>
                <h3>{tree.refId}</h3>
              </Grid>
              <Grid item>
                <p>{tree.speciesName}</p>
              </Grid>
              <div style={{ position: "absolute", top: "8px", right: "8px" }}>
                {tree.logIds && tree.logIds.length > 0 && (
                  <CarpenterIcon color="dark" fontSize="small" />
                )}
                {tree.logged && (
                  <BlockIcon color="secondary" fontSize="small" />
                )}
              </div>
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <Typography variant="body1">No trees found.</Typography>
          </Grid>
        )}
      </Grid>

      <ItemDialog
        isOpen={isModalOpen}
        onClose={handleCloseDialog}
        itemDetails={selectedTreeDetails}
        mode={modalMode}
        type="tree"
      />
    </Grid>
  );
};

export default ListAllTrees;
