import React, { useEffect, useState } from 'react';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { app } from '../../../firebase-config'; // Adjust the path as necessary
import StockMapComponent from '../../google-maps/StockMapComponent'; // Adjust the path as necessary
import { Grid } from '@mui/material';

const AllPlanksMap = () => {
  const [locations, setLocations] = useState([]);
  const [planks, setPlanks] = useState([]);

  const fetchLocationsAndPlanks = async () => {
    const db = getFirestore(app);
    const userLocalStorage = JSON.parse(localStorage.getItem('user'));
    const sawmillId = userLocalStorage?.sawmillId;

    if (!sawmillId) {
      console.error('Sawmill ID is not available. Cannot fetch locations and planks.');
      return;
    }

    try {
      console.log('Fetching locations and planks from Firestore...');
      const locationsSnapshot = await getDocs(collection(db, `sawmill/${sawmillId}/locations`));
      const planksSnapshot = await getDocs(collection(db, `sawmill/${sawmillId}/planks`));

      const locationsData = locationsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      const planksData = planksSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

      console.log('Fetched locations:', locationsData);
      console.log('Fetched planks:', planksData);

      // Filter out locations that do not have planks
      const locationsWithPlanks = locationsData.filter(location =>
        planksData.some(plank => plank.locationId === location.id)
      );

      console.log('Locations with planks:', locationsWithPlanks);

      setLocations(locationsWithPlanks);
      setPlanks(planksData);
    } catch (error) {
      console.error('Error fetching locations and planks:', error);
    }
  };

  useEffect(() => {
    fetchLocationsAndPlanks();
  }, []);

  return (
    <Grid container>
      <h3>All Planks Map</h3>
      <StockMapComponent locations={locations} planks={planks} />
    </Grid>
  );
};

export default AllPlanksMap;
