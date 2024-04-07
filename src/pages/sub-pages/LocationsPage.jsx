import React from 'react';
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import AddLocationForm from '../../components/components-for-dev/locations/AddLocationForm';


const LocationsPage = () => {
 

  return (
    <Grid border={1} p={2} >
      <Typography color="initial">Locations Page</Typography>
      <AddLocationForm />
      </Grid>
  );
};

export default LocationsPage;
