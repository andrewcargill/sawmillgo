import React, { useEffect, useState } from 'react';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { app } from '../../firebase-config'; // Adjust the path as necessary
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
 
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const LocationsTable = () => {
  const [locations, setLocations] = useState({
    forest: [],
    sawmill: [],
    storage: [],
    drying: [],
  });

  const fetchLocations = async () => {
    const db = getFirestore(app);
    const userLocalStorage = JSON.parse(localStorage.getItem('user'));
    const sawmillId = userLocalStorage?.sawmillId;

    if (!sawmillId) {
      console.error('Sawmill ID is not available. Cannot fetch locations.');
      return;
    }

    try {
      console.log('Fetching locations from Firestore...');
      const querySnapshot = await getDocs(collection(db, `sawmill/${sawmillId}/locations`));
      const locationsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      console.log('Fetched locations:', locationsData);

      // Separate locations by type
      const separatedLocations = {
        forest: locationsData.filter(location => location.type === 'Forest'),
        sawmill: locationsData.filter(location => location.type === 'Sawmill'),
        storage: locationsData.filter(location => location.type === 'Storage'),
        drying: locationsData.filter(location => location.type === 'Drying'),
      };

      setLocations(separatedLocations);
    } catch (error) {
      console.error('Error fetching locations: ', error);
    }
  };

  useEffect(() => {
    fetchLocations();
  }, []);

  const renderTable = (locations, type) => {
    if (locations.length === 0) return null;

    return (
      <Accordion key={type}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>{type.charAt(0).toUpperCase() + type.slice(1)} Locations</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Edit</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Description</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {locations.map(location => (
                  <TableRow key={location.id}>
                    <TableCell>Edit Button</TableCell>
                    <TableCell>{location.name}</TableCell>
                    <TableCell>{location.type}</TableCell>
                    <TableCell>{location.description}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </AccordionDetails>
      </Accordion>
    );
  };

  return (
    <div>
      {renderTable(locations.forest, 'forest')}
      {renderTable(locations.sawmill, 'sawmill')}
      {renderTable(locations.storage, 'storage')}
      {renderTable(locations.drying, 'drying')}
    </div>
  );
};

export default LocationsTable;
