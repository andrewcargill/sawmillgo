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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';

const stockData = [
  { id: '1', type: 'Tree', name: 'Tree 1', species: 'Pine', age: '60-80' },
  { id: '2', type: 'Log', name: 'Log 1', species: 'Pine', length: 400, diameter: 30 },
  { id: '3', type: 'Plank', name: 'Plank 1', species: 'Pine', grade: '2', typeOfPlank: 'Construction' },
  { id: '4', type: 'Tree', name: 'Tree 2', species: 'Oak', age: '40-60' },
  { id: '5', type: 'Log', name: 'Log 2', species: 'Oak', length: 350, diameter: 35 },
  { id: '6', type: 'Plank', name: 'Plank 2', species: 'Oak', grade: '1', typeOfPlank: 'Furniture' },
];

const StockSearchWidget = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('All');
  const [filteredStock, setFilteredStock] = useState(stockData);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleSearchChange = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
    setFilteredStock(
      stockData.filter(
        (item) =>
          (item.name.toLowerCase().includes(query) || item.type.toLowerCase().includes(query)) &&
          (filter === 'All' || item.type === filter)
      )
    );
  };

  const handleFilterChange = (event) => {
    const newFilter = event.target.value;
    setFilter(newFilter);
    setFilteredStock(
      stockData.filter(
        (item) =>
          (item.name.toLowerCase().includes(searchQuery) || item.type.toLowerCase().includes(searchQuery)) &&
          (newFilter === 'All' || item.type === newFilter)
      )
    );
  };

  return (
    <Paper elevation={3} style={{ width: '100%',  }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Stock Search
        </Typography>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={6}>
            <TextField
              variant="outlined"
              placeholder="Search..."
              fullWidth
              value={searchQuery}
              onChange={handleSearchChange}
              InputProps={{
                endAdornment: (
                  <IconButton>
                    <SearchIcon />
                  </IconButton>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl variant="outlined" fullWidth>
              <InputLabel>Filter</InputLabel>
              <Select value={filter} onChange={handleFilterChange} label="Filter">
                <MenuItem value="All">All</MenuItem>
                <MenuItem value="Tree">Trees</MenuItem>
                <MenuItem value="Log">Logs</MenuItem>
                <MenuItem value="Plank">Planks</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Box mt={3}>
          {isMobile ? (
            <List>
              {filteredStock.map((item) => (
                <ListItem key={item.id}>
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
                    <TableRow key={item.id}>
                      <TableCell>{item.name}</TableCell>
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
      </CardContent>
    </Paper>
  );
};

export default StockSearchWidget;
