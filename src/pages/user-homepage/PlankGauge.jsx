import React from 'react';
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'

const PlankGauge = () => {
 

  return (
    <Grid border={1} p={2} bgcolor={'primary.main'}>
      <Typography color="initial">Plank Gauge</Typography>
      <Grid>
        <Button variant="contained" color="primary">View More</Button>
      </Grid>
      </Grid>
  );
};

export default PlankGauge;