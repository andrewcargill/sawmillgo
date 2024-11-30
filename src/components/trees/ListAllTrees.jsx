import React, { useState, useEffect } from "react";
import {
  Grid,
  Typography,
  ButtonGroup,
  IconButton,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ListIcon from "@mui/icons-material/List";
import GridOnIcon from "@mui/icons-material/GridOn";
import { getFirestore, collection, getDocs, addDoc, query, where } from "firebase/firestore";
import { app } from "../../firebase-config";
import ItemDialog from "../item-dialogs/ItemDialog";
import TreesBasicView from "./sub-components/TreesBasicView";
import TreesListView from "./sub-components/TreesListView";
import { fetchSpeciesForSawmill } from "../../utils/filestoreOperations";

const ListAllTrees = () => {
  const [trees, setTrees] = useState([]);
  const [dynamicView, setDynamicView] = useState("basic");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTreeDetails, setSelectedTreeDetails] = useState(null);
  const [modalMode, setModalMode] = useState("view");

  // Filters
  const [statusFilter, setStatusFilter] = useState("available");
  const [loggingFilter, setLoggingFilter] = useState("all");
  const [speciesFilter, setSpeciesFilter] = useState("all");
  const [refIdFilter, setRefIdFilter] = useState("");
  const [species, setSpecies] = useState([]);

  const db = getFirestore(app);
  const sawmillId = JSON.parse(localStorage.getItem("user"))?.sawmillId;

  const views = [
    { view: "basic", icon: <GridOnIcon /> },
    { view: "list", icon: <ListIcon /> },
  ];

  const handleDynamicViewClick = () => {
    const currentIndex = views.findIndex((v) => v.view === dynamicView);
    const nextIndex = (currentIndex + 1) % views.length;
    setDynamicView(views[nextIndex].view);
  };

  const fetchTrees = async () => {
    if (!sawmillId) return;

    try {
      let treesRef = collection(db, `sawmill/${sawmillId}/trees`);
      let conditions = [];

      // Apply filters
      if (statusFilter) {
        conditions.push(where("status", "==", statusFilter));
      }

      if (loggingFilter === "logged") {
        conditions.push(where("logged", "==", true));
      } else if (loggingFilter === "unlogged") {
        conditions.push(where("logged", "==", false));
      }

      if (speciesFilter !== "all") {
        conditions.push(where("speciesId", "==", speciesFilter));
      }

      if (refIdFilter.trim()) {
        conditions.push(where("refId", "==", refIdFilter.trim()));
      }

      const treesQuery = conditions.length > 0 ? query(treesRef, ...conditions) : treesRef;
      const snapshot = await getDocs(treesQuery);

      const treesList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setTrees(treesList);
    } catch (error) {
      console.error("Error fetching trees:", error);
    }
  };

  useEffect(() => {
    fetchSpeciesForSawmill(db, sawmillId)
      .then((fetchedSpecies) => {
        setSpecies(fetchedSpecies);
      })
      .catch((error) => {
        console.error("Error fetching species:", error);
        alert("Failed to fetch species.");
      });
  }, [db, sawmillId]);

  useEffect(() => {
    fetchTrees();
  }, [statusFilter, loggingFilter, speciesFilter, refIdFilter, sawmillId]);

  const handleAddTreeClick = () => {
    setModalMode("add"); // Set mode to 'add'
    setSelectedTreeDetails(null); // Clear existing details
    setIsModalOpen(true);
  };

  const handleTreeClick = (tree) => {
    setModalMode("view"); // Set mode to 'view'
    setSelectedTreeDetails(tree);
    setIsModalOpen(true);
  };

  const handleSaveTree = async (treeData) => {
    try {
      const treesRef = collection(db, `sawmill/${sawmillId}/trees`);
      await addDoc(treesRef, {
        ...treeData,
        createdAt: new Date(),
      });
      alert("Tree added successfully!");
      setIsModalOpen(false);
      fetchTrees(); // Refresh list
    } catch (error) {
      console.error("Error adding tree:", error);
      alert("Failed to add tree.");
    }
  };

  const handleCloseDialog = () => {
    setIsModalOpen(false);
    setSelectedTreeDetails(null);
  };

  const renderTreeView = () => {
    switch (dynamicView) {
      case "basic":
        return <TreesBasicView trees={trees} onTreeClick={handleTreeClick} />;
      case "list":
        return <TreesListView trees={trees} onTreeClick={handleTreeClick} />;
      default:
        return null;
    }
  };

  const currentViewIcon =
    views.find((v) => v.view === dynamicView)?.icon || <AddIcon />;

  return (
    <Grid container spacing={2} p={2}>
      {/* Header */}
      <Grid container item xs={12} justifyContent="space-between" alignItems="center">
        <Typography variant="h4">Trees</Typography>
        <ButtonGroup>
          <IconButton onClick={handleDynamicViewClick}>{currentViewIcon}</IconButton>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleAddTreeClick}
          >
            Add Tree
          </Button>
        </ButtonGroup>
      </Grid>

      {/* Filters */}
      <Grid container item xs={12} spacing={2}>
        <Grid item xs={6} md={3}>
          <FormControl fullWidth>
            <InputLabel>Status</InputLabel>
            <Select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              size="small"
            >
              <MenuItem value="available">Available</MenuItem>
              <MenuItem value="reserved">Reserved</MenuItem>
              <MenuItem value="sold">Sold</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={6} md={3}>
          <FormControl fullWidth>
            <InputLabel>Logging Status</InputLabel>
            <Select
              value={loggingFilter}
              onChange={(e) => setLoggingFilter(e.target.value)}
              size="small"
            >
              <MenuItem value="all">All</MenuItem>
              <MenuItem value="logged">Logged</MenuItem>
              <MenuItem value="unlogged">Unlogged</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={6} md={3}>
          <FormControl fullWidth>
            <InputLabel>Species</InputLabel>
            <Select
              value={speciesFilter}
              onChange={(e) => setSpeciesFilter(e.target.value)}
              size="small"
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
          <TextField
            label="Tree ID"
            value={refIdFilter}
            onChange={(e) => setRefIdFilter(e.target.value)}
            size="small"
            fullWidth
          />
        </Grid>
      </Grid>

      {/* Render Tree View */}
      <Grid item xs={12}>
        {trees.length > 0 ? (
          renderTreeView()
        ) : (
          <Typography variant="body1">No trees found.</Typography>
        )}
      </Grid>

      {/* Item Dialog */}
      <ItemDialog
        isOpen={isModalOpen}
        onClose={handleCloseDialog}
        mode={modalMode} // Dynamically set mode
        type="tree"
        itemDetails={selectedTreeDetails}
        onSave={handleSaveTree} // Save handler for adding/editing
      />
    </Grid>
  );
};

export default ListAllTrees;
