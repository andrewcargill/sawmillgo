import React from 'react';
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import AddLocationForm from '../../components/components-for-dev/locations/AddLocationForm';
import AddSpeciesForm from '../../components/components-for-dev/species/AddSpeciesForm';


const SpeciesPage = () => {
 

  return (
    <Grid border={1} p={2} >
      <Typography color="initial">Species Page</Typography>
      <AddSpeciesForm />
      </Grid>
  );
};

export default SpeciesPage;
