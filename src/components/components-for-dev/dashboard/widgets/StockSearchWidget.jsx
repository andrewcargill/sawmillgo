import React, { useState } from 'react';
import {
  Paper,
  CardContent,
  Typography,
  TextField,
  IconButton,
  Grid,
  Box,
  List,
  ListItem,
  ListItemText,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Collapse,
  Divider,
  Checkbox,
  FormGroup,
  FormControlLabel,
  useMediaQuery,
  useTheme,
  ToggleButtonGroup,
  ToggleButton,
  Fade,
  Dialog,
  DialogTitle,
  DialogContent,
} from '@mui/material';
import { Search as SearchIcon, FilterList as FilterListIcon } from '@mui/icons-material';

const stockData = [
  { id: '1', type: 'Tree', name: 'Tree 1', species: 'Pine', age: '60-80', verified: true },
  { id: '2', type: 'Log', name: 'Log 1', species: 'Pine', length: 400, diameter: 30, verified: false },
  { id: '3', type: 'Plank', name: 'Plank 1', species: 'Pine', grade: '2', typeOfPlank: 'Construction', verified: true },
  { id: '4', type: 'Tree', name: 'Tree 2', species: 'Oak', age: '40-60', verified: true },
  { id: '5', type: 'Log', name: 'Log 2', species: 'Oak', length: 350, diameter: 35, verified: false },
  { id: '6', type: 'Plank', name: 'Plank 2', species: 'Oak', grade: '1', typeOfPlank: 'Furniture', verified: true },
  { id: '7', type: 'Tree', name: 'Tree 3', species: 'Oak', age: '40-60', verified: true },
  { id: '8', type: 'Log', name: 'Log 3', species: 'Oak', length: 350, diameter: 35, verified: false },
  { id: '9', type: 'Plank', name: 'Plank 3', species: 'Oak', grade: '1', typeOfPlank: 'Furniture', verified: true },
  { id: '10', type: 'Tree', name: 'Tree 4', species: 'Oak', age: '40-60', verified: true },
  { id: '11', type: 'Log', name: 'Log 4', species: 'Oak', length: 350, diameter: 35, verified: false },
  { id: '12', type: 'Plank', name: 'Plank 4', species: 'Oak', grade: '1', typeOfPlank: 'Furniture', verified: true },
];

const StockSearchWidget = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('Tree');
  const [filteredStock, setFilteredStock] = useState(stockData.filter(item => item.type === 'Tree'));
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleTypeChange = (event, newType) => {
    if (newType !== null) {
      setSelectedType(newType);
      applyFilters(searchQuery, newType);
    }
  };

  const handleSearchChange = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
    applyFilters(query, selectedType);
  };

  const applyFilters = (query, type) => {
    setFilteredStock(
      stockData.filter(
        (item) =>
          item.type === type &&
          (item.name.toLowerCase().includes(query) || item.type.toLowerCase().includes(query))
      )
    );
  };

  const handleFilterToggle = () => {
    setFilterOpen(!filterOpen);
  };

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  const handleCloseDialog = () => {
    setSelectedItem(null);
  };

  return (
    <Paper elevation={3} style={{ width: '100%', position: 'relative' }}>
      <CardContent>
        {/* Top Section: Type Selection and Search */}
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={8}>
            <ToggleButtonGroup
              value={selectedType}
              exclusive
              onChange={handleTypeChange}
              aria-label="Stock Type"
              fullWidth
              size="small"
              sx={{ display: 'flex', justifyContent: 'center' }}
            >
              <ToggleButton value="Tree" aria-label="Tree" sx={{ padding: '4px 8px', fontSize: '0.8rem' }}>
                Tree
              </ToggleButton>
              <ToggleButton value="Log" aria-label="Log" sx={{ padding: '4px 8px', fontSize: '0.8rem' }}>
                Log
              </ToggleButton>
              <ToggleButton value="Plank" aria-label="Plank" sx={{ padding: '4px 8px', fontSize: '0.8rem' }}>
                Plank
              </ToggleButton>
            </ToggleButtonGroup>
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              variant="outlined"
              placeholder="Search..."
              fullWidth
              value={searchQuery}
              onChange={handleSearchChange}
              size="small"
              InputProps={{
                endAdornment: (
                  <IconButton size="small">
                    <SearchIcon />
                  </IconButton>
                ),
              }}
            />
          </Grid>
        </Grid>

        {/* Middle Section: Advanced Filters Button */}
        <Grid container spacing={2} alignItems="center" mt={1}>
          <Grid item xs={12}>
            <Button
              variant="outlined"
              startIcon={<FilterListIcon />}
              onClick={handleFilterToggle}
              fullWidth
              size="small"
            >
              {filterOpen ? 'Hide Filters' : 'Advanced Filters'}
            </Button>
          </Grid>
        </Grid>

        {/* Filter Panel: Overlay with Absolute Position */}
        <Fade in={filterOpen}>
          <Box
            sx={{
              position: 'absolute',
              top: '120px',
              left: 0,
              right: 0,
              backgroundColor: 'background.paper',
              zIndex: 1,
              boxShadow: 2,
              borderRadius: 1,
              padding: 2,
            }}
          >
            <Typography variant="h6" gutterBottom>
              Advanced Filters
            </Typography>
            <Divider />
            <FormGroup>
              <FormControlLabel control={<Checkbox />} label="Species: Pine" />
              <FormControlLabel control={<Checkbox />} label="Age: 60-80" />
              <FormControlLabel control={<Checkbox />} label="Verified" />
              {/* Add more advanced filters as needed */}
            </FormGroup>
          </Box>
        </Fade>

        {/* Bottom Section: Data Display */}
        <Box mt={3}>
          {isMobile ? (
            <List>
              {filteredStock.map((item) => (
                <ListItem button key={item.id} onClick={() => handleItemClick(item)}>
                  <ListItemText primary={item.name} secondary={item.type} />
                </ListItem>
              ))}
            </List>
          ) : (
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Type</TableCell>
                    <TableCell>Species</TableCell>
                    {filteredStock.some((item) => item.age) && <TableCell>Age</TableCell>}
                    {filteredStock.some((item) => item.length) && <TableCell>Length</TableCell>}
                    {filteredStock.some((item) => item.diameter) && <TableCell>Diameter</TableCell>}
                    {filteredStock.some((item) => item.grade) && <TableCell>Grade</TableCell>}
                    {filteredStock.some((item) => item.typeOfPlank) && <TableCell>Type of Plank</TableCell>}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredStock.map((item) => (
                    <TableRow
                      key={item.id}
                      onClick={() => handleItemClick(item)}
                      sx={{
                        cursor: 'pointer',
                        '&:hover': {
                          backgroundColor: 'action.hover',
                        },
                      }}
                    >
                      <TableCell>
                        <Typography variant="subtitle2" fontWeight="bold">
                          {item.name}
                        </Typography>
                      </TableCell>
                      <TableCell>{item.type}</TableCell>
                      <TableCell>{item.species}</TableCell>
                      {item.age && <TableCell>{item.age}</TableCell>}
                      {item.length && <TableCell>{item.length}</TableCell>}
                      {item.diameter && <TableCell>{item.diameter}</TableCell>}
                      {item.grade && <TableCell>{item.grade}</TableCell>}
                      {item.typeOfPlank && <TableCell>{item.typeOfPlank}</TableCell>}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Box>

        {/* Item Details Dialog */}
        <Dialog open={!!selectedItem} onClose={handleCloseDialog}>
          <DialogTitle>Item Details</DialogTitle>
          <DialogContent>
            {selectedItem && (
              <Box>
                <Typography variant="body1">
                  <strong>Name:</strong> {selectedItem.name}
                </Typography>
                <Typography variant="body1">
                  <strong>Type:</strong> {selectedItem.type}
                </Typography>
                <Typography variant="body1">
                  <strong>Species:</strong> {selectedItem.species}
                </Typography>
                {selectedItem.age && (
                  <Typography variant="body1">
                    <strong>Age:</strong> {selectedItem.age}
                  </Typography>
                )}
                {selectedItem.length && (
                  <Typography variant="body1">
                    <strong>Length:</strong> {selectedItem.length}
                  </Typography>
                )}
                {selectedItem.diameter && (
                  <Typography variant="body1">
                    <strong>Diameter:</strong> {selectedItem.diameter}
                  </Typography>
                )}
                {selectedItem.grade && (
                  <Typography variant="body1">
                    <strong>Grade:</strong> {selectedItem.grade}
                  </Typography>
                )}
                {selectedItem.typeOfPlank && (
                  <Typography variant="body1">
                    <strong>Type of Plank:</strong> {selectedItem.typeOfPlank}
                  </Typography>
                )}
              </Box>
            )}
          </DialogContent>
        </Dialog>
      </CardContent>
    </Paper>
  );
};

export default StockSearchWidget;
