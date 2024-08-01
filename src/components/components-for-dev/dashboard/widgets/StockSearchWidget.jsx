import React, { useState, useEffect, useRef, useCallback } from 'react';
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
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  useMediaQuery,
  useTheme,
  ToggleButtonGroup,
  ToggleButton,
  Fade,
  CircularProgress,
} from '@mui/material';
import { Search as SearchIcon, FilterList as FilterListIcon } from '@mui/icons-material';
import { getFirestore, collection, getDocs, query, where, orderBy, limit, startAfter } from 'firebase/firestore';
import { app } from '../../../../firebase-config'; // Adjust the import path as needed

const StockSearchWidget = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('Tree');
  const [stockData, setStockData] = useState([]);
  const [lastDoc, setLastDoc] = useState(null); // Track the last document for pagination
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true); // Track if more data is available
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const db = getFirestore(app);
  const sawmillId = JSON.parse(localStorage.getItem('user'))?.sawmillId;

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    // Fetch initial data when the component mounts or when selectedType changes
    setStockData([]);
    setLastDoc(null);
    setHasMore(true);
    fetchStockData(true);  // Ensure we fetch fresh data
  }, [selectedType]);

  // Function to fetch data from Firestore
  const fetchStockData = useCallback(async (isNewType = false) => {
    if (!sawmillId || !hasMore) {
      console.error('Sawmill ID not found or no more data to fetch.');
      return;
    }

    if (loading) return; // Prevent multiple fetch calls

    setLoading(true);

    try {
      // Determine the collection to fetch based on selected type
      const collectionMap = {
        Tree: 'trees',
        Log: 'logs',
        Plank: 'planks',
      };

      const collectionName = collectionMap[selectedType];
      const fetchLimit = 5; // Number of documents to fetch per batch

      // Create Firestore query with pagination
      let q;
      
      // Adjust the query based on the selected type
      if (selectedType === 'Tree') {
        q = query(
          collection(db, `sawmill/${sawmillId}/${collectionName}`),
          where('logged', '==', false), // Ensure only unlogged trees
          orderBy('refId'), // Order by some field to maintain consistent order
          limit(fetchLimit)
        );
      } else if (selectedType === 'Log') {
        q = query(
          collection(db, `sawmill/${sawmillId}/${collectionName}`),
          where('planked', '==', false), // Ensure only unplanked logs
          orderBy('refId'),
          limit(fetchLimit)
        );
      } else {
        // For Planks, just order by refId, no additional where clause needed
        q = query(
          collection(db, `sawmill/${sawmillId}/${collectionName}`),
          orderBy('refId'),
          limit(fetchLimit)
        );
      }

      if (lastDoc && !isNewType) {
        // Use startAfter for pagination if lastDoc is set and it's not a new type fetch
        if (selectedType === 'Tree') {
          q = query(
            collection(db, `sawmill/${sawmillId}/${collectionName}`),
            where('logged', '==', false),
            orderBy('refId'),
            startAfter(lastDoc),
            limit(fetchLimit)
          );
        } else if (selectedType === 'Log') {
          q = query(
            collection(db, `sawmill/${sawmillId}/${collectionName}`),
            where('planked', '==', false),
            orderBy('refId'),
            startAfter(lastDoc),
            limit(fetchLimit)
          );
        } else {
          q = query(
            collection(db, `sawmill/${sawmillId}/${collectionName}`),
            orderBy('refId'),
            startAfter(lastDoc),
            limit(fetchLimit)
          );
        }
      }

      // Execute query
      const snapshot = await getDocs(q);

      // Determine if more data is available
      if (snapshot.docs.length < fetchLimit) {
        setHasMore(false); // No more data to fetch
      }

      // Map through documents to format data
      const dataList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      console.log(`Fetched ${selectedType.toLowerCase()}s:`, dataList);

      // Append data to existing state
      setStockData((prevData) => isNewType ? dataList : [...prevData, ...dataList]);
      setLastDoc(snapshot.docs[snapshot.docs.length - 1]); // Set last document for pagination
      setLoading(false);

    } catch (error) {
      console.error(`Error fetching ${selectedType.toLowerCase()}s:`, error);
      setLoading(false);
    }
  }, [sawmillId, selectedType, lastDoc, hasMore, loading]);

  // Set up Intersection Observer to load more data on scroll
  const observer = useRef();
  const lastElementRef = useCallback((node) => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore) {
        fetchStockData();
      }
    });

    if (node) observer.current.observe(node);
  }, [loading, hasMore, fetchStockData]);

  const handleTypeChange = (event, newType) => {
    if (newType !== null) {
      setSelectedType(newType);
      setSearchQuery(''); // Clear search when changing type
      setStockData([]); // Clear previous data to refetch
      setLastDoc(null);
      setHasMore(true);
    }
  };

  const handleSearchChange = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
  };

  const handleFilterToggle = () => {
    setFilterOpen(!filterOpen);
  };

  const handleItemClick = (item) => {
    console.log('Item clicked:', item);
    setSelectedItem(item);
  };

  const handleCloseDialog = () => {
    setSelectedItem(null);
  };

  // Filter stock data based on search query
  const filteredStockData = stockData.filter(
    (item) =>
      item.refId.toLowerCase().includes(searchQuery) || item.speciesName.toLowerCase().includes(searchQuery)
  );

  return (
    <Paper elevation={3} style={{ width: '100%', position: 'relative', height: '435px' }}>
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
              top: isSmallScreen ? '130px' : '80px',
              left: 0,
              right: 0,
              backgroundColor: 'background.paper',
              zIndex: 10, // Ensure it's above other elements
              boxShadow: 2,
              borderRadius: 1,
              padding: 2,
              maxHeight: '280px', // Ensure the overlay fits within the container
              overflowY: 'auto',
              marginTop: 4, // Space out from top section
            }}
          >
            <Typography variant="h6" gutterBottom>
              Advanced Filters
            </Typography>
            <Divider />
            <Typography variant="body2" gutterBottom>
              [Advanced filter options go here]
            </Typography>
          </Box>
        </Fade>

        {/* Bottom Section: Data Display */}
        <Box mt={3} sx={{ maxHeight: {xs: '210px', md: '240px'}, overflowY: 'auto' }}>  {/* Adjust maxHeight for data section */}
          {isMobile ? (
            <List>
              {filteredStockData.map((item, index) => (
                <ListItem button key={item.id} onClick={() => handleItemClick(item)} ref={index === filteredStockData.length - 1 ? lastElementRef : null}>
                  <ListItemText primary={item.refId} secondary={item.speciesName} />
                </ListItem>
              ))}
              {loading && <CircularProgress />}
            </List>
          ) : (
            <TableContainer component={Paper} sx={{ maxHeight: {xs: '200px', md: '240px'} }}>
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Species</TableCell>
                    {selectedType === 'Tree' && <TableCell>Age</TableCell>}
                    {selectedType === 'Log' && <TableCell>Diameter</TableCell>}
                    {selectedType === 'Plank' && <TableCell>Grade</TableCell>}
                    <TableCell>Verified</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredStockData.map((item, index) => (
                    <TableRow
                      key={item.id}
                      onClick={() => handleItemClick(item)}
                      sx={{
                        cursor: 'pointer',
                        '&:hover': {
                          backgroundColor: 'action.hover',
                        },
                      }}
                      ref={index === filteredStockData.length - 1 ? lastElementRef : null}
                    >
                      <TableCell>
                        <Typography variant="subtitle2" fontWeight="bold">
                          {item.refId}
                        </Typography>
                      </TableCell>
                      <TableCell>{item.speciesName}</TableCell>
                      {selectedType === 'Tree' && <TableCell>{item.age}</TableCell>}
                      {selectedType === 'Log' && <TableCell>{item.diameter}</TableCell>}
                      {selectedType === 'Plank' && <TableCell>{item.grade}</TableCell>}
                      <TableCell>{item.verified ? 'Yes' : 'No'}</TableCell>
                    </TableRow>
                  ))}
                  {loading && (
                    <TableRow>
                      <TableCell colSpan={5} align="center">
                        <CircularProgress />
                      </TableCell>
                    </TableRow>
                  )}
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
                  <strong>Name:</strong> {selectedItem.refId}
                </Typography>
                <Typography variant="body1">
                  <strong>Species:</strong> {selectedItem.speciesName}
                </Typography>
                {selectedItem.age && (
                  <Typography variant="body1">
                    <strong>Age:</strong> {selectedItem.age}
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
                {selectedItem.verified !== undefined && (
                  <Typography variant="body1">
                    <strong>Verified:</strong> {selectedItem.verified ? 'Yes' : 'No'}
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
