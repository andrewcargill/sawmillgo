import React, { useState, useEffect } from "react";
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  IconButton,
  Drawer,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  ButtonGroup,
} from "@mui/material";
import {
  Search as SearchIcon,
  Add as AddIcon,
  Close as CloseIcon,
  FilterList as FilterListIcon,
} from "@mui/icons-material";

import TreeFilter from "./TreeFilter";
import LogFilter from "./LogFilter";
import PlankFilter from "./PlankFilter";

const UnifiedStockWireFrame = ({ project }) => {
  const [filter, setFilter] = useState("");
  const [advancedFilter, setAdvancedFilter] = useState({});
  const [availableStock, setAvailableStock] = useState([]);
  const [projectStock, setProjectStock] = useState({
    Trees: [],
    Logs: [],
    Planks: [],
  });

  const [selectedItem, setSelectedItem] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleFilterChange = (type) => {
    setFilter(type);
    setAdvancedFilter({});
    fetchItems(type);
  };

  const handleAdvancedFilterChange = (criteria) => {
    setAdvancedFilter(criteria);
  };

  const handleAddToProject = (item) => {
    setAvailableStock(
      availableStock.filter((stockItem) => stockItem.id !== item.id)
    );
    setProjectStock((prevStock) => ({
      ...prevStock,
      [item.type + "s"]: [...prevStock[item.type + "s"], item],
    }));
  };

  const handleRemoveFromProject = (item, type) => {
    setProjectStock((prevStock) => ({
      ...prevStock,
      [type]: prevStock[type].filter((stockItem) => stockItem.id !== item.id),
    }));
    setAvailableStock([...availableStock, item]);
  };

  const handleClickItem = (item) => {
    setSelectedItem(item);
  };

  const handleCloseDialog = () => {
    setSelectedItem(null);
  };

  const fetchItems = (type) => {
    // Simulate an API call to fetch items based on the selected type
    const allItems = [
      { id: "1", type: "Tree", name: "Tree 1" },
      { id: "2", type: "Log", name: "Log 1" },
      { id: "3", type: "Plank", name: "Plank 1" },
      { id: "4", type: "Tree", name: "Tree 2" },
      { id: "5", type: "Log", name: "Log 2" },
      { id: "6", type: "Plank", name: "Plank 2" },
    ];
    const filteredItems = allItems.filter((item) => item.type === type);
    setAvailableStock(filteredItems);
  };

  const applyAdvancedFilter = () => {
    let filtered = availableStock.filter((item) => {
      if (filter !== "All" && item.type !== filter) return false;
      for (const key in advancedFilter) {
        if (item[key] !== undefined && item[key] < advancedFilter[key]) {
          return false;
        }
      }
      return true;
    });

    setAvailableStock(filtered);
  };

  const renderAdvancedFilter = () => {
    switch (filter) {
      case "Tree":
        return <TreeFilter onFilterChange={handleAdvancedFilterChange} />;
      case "Log":
        return <LogFilter onFilterChange={handleAdvancedFilterChange} />;
      case "Plank":
        return <PlankFilter onFilterChange={handleAdvancedFilterChange} />;
      default:
        return null;
    }
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom>
        Project: {project.name}
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Available Stock
              </Typography>
              {!filter && (
                <Box display="flex" justifyContent="center" alignItems="center" mb={2}>
                  <FormControl variant="outlined" size="small">
                    <InputLabel>Select Type</InputLabel>
                    <Select
                      value={filter}
                      onChange={(e) => handleFilterChange(e.target.value)}
                      label="Select Type"
                      fullWidth
                    >
                      <MenuItem value="Tree">Trees</MenuItem>
                      <MenuItem value="Log">Logs</MenuItem>
                      <MenuItem value="Plank">Planks</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              )}
              {filter && (
                <>
                  <Box display="flex" justifyContent="center" alignItems="center" mb={2}>
                    <ButtonGroup variant="contained">
                      <Button
                        style={{ backgroundColor: filter === "Tree" ? "#3f51b5" : undefined }}
                        onClick={() => handleFilterChange("Tree")}
                      >
                        Trees
                      </Button>
                      <Button
                        style={{ backgroundColor: filter === "Log" ? "#3f51b5" : undefined }}
                        onClick={() => handleFilterChange("Log")}
                      >
                        Logs
                      </Button>
                      <Button
                        style={{ backgroundColor: filter === "Plank" ? "#3f51b5" : undefined }}
                        onClick={() => handleFilterChange("Plank")}
                      >
                        Planks
                      </Button>
                    </ButtonGroup>
                  </Box>
                  <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                    <TextField
                      variant="outlined"
                      placeholder="Search Stock"
                      InputProps={{
                        endAdornment: (
                          <IconButton>
                            <SearchIcon />
                          </IconButton>
                        ),
                      }}
                    />
                    <IconButton color="primary" onClick={() => setDrawerOpen(true)}>
                      <FilterListIcon />
                    </IconButton>
                  </Box>
                  <List>
                    {availableStock.map((item) => (
                      <ListItem key={item.id}>
                        <ListItemText
                          primary={item.name}
                          secondary={item.type}
                          onClick={() => handleClickItem(item)}
                        />
                        <IconButton color="primary" onClick={() => handleAddToProject(item)}>
                          <AddIcon />
                        </IconButton>
                      </ListItem>
                    ))}
                  </List>
                </>
              )}
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Project Stock
              </Typography>
              <Divider />
              <Grid container spacing={2} mt={2}>
                <Grid item xs={4}>
                  <Typography variant="subtitle1">Trees</Typography>
                  <List>
                    {projectStock.Trees.map((item) => (
                      <Grid container key={item.id}>
                        <Grid item xs={10}>
                          <ListItem button onClick={() => handleClickItem(item)}>
                            <ListItemText primary={item.name} />
                          </ListItem>
                        </Grid>
                        <Grid item xs={2}>
                          <IconButton
                            color="warning"
                            onClick={() => handleRemoveFromProject(item, "Trees")}
                          >
                            <CloseIcon />
                          </IconButton>
                        </Grid>
                      </Grid>
                    ))}
                  </List>
                </Grid>
                <Grid item xs={4}>
                  <Typography variant="subtitle1">Logs</Typography>
                  <List>
                    {projectStock.Logs.map((item) => (
                      <Grid container key={item.id}>
                        <Grid item xs={10}>
                          <ListItem button onClick={() => handleClickItem(item)}>
                            <ListItemText primary={item.name} />
                          </ListItem>
                        </Grid>
                        <Grid item xs={2}>
                          <IconButton
                            color="warning"
                            onClick={() => handleRemoveFromProject(item, "Logs")}
                          >
                            <CloseIcon />
                          </IconButton>
                        </Grid>
                      </Grid>
                    ))}
                  </List>
                </Grid>
                <Grid item xs={4}>
                  <Typography variant="subtitle1">Planks</Typography>
                  <List>
                    {projectStock.Planks.map((item) => (
                      <Grid container key={item.id}>
                        <Grid item xs={10}>
                          <ListItem button onClick={() => handleClickItem(item)}>
                            <ListItemText primary={item.name} />
                          </ListItem>
                        </Grid>
                        <Grid item xs={2}>
                          <IconButton
                            color="warning"
                            onClick={() => handleRemoveFromProject(item, "Planks")}
                          >
                            <CloseIcon />
                          </IconButton>
                        </Grid>
                      </Grid>
                    ))}
                  </List>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <Box sx={{ width: 300 }} role="presentation" p={2}>
          <Typography variant="h6" gutterBottom>
            Filter Options
          </Typography>
          {renderAdvancedFilter()}
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              applyAdvancedFilter();
              setDrawerOpen(false);
            }}
          >
            Apply Filters
          </Button>
        </Box>
      </Drawer>

      <Dialog open={!!selectedItem} onClose={handleCloseDialog}>
        <DialogTitle>Item Details</DialogTitle>
        <DialogContent>
          <Typography>{selectedItem?.name}</Typography>
        </DialogContent>
      </Dialog>
    </Container>
  );
};

export default UnifiedStockWireFrame;
