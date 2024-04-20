import React from 'react';
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import { Paper } from '@mui/material';

const AboutPage = () => {
 

  return (
    <Grid container>
      <Paper sx={{padding: '15px'}} >
     <Typography variant="h4" align='left' color="initial">Transform Your Forestry Business with Sawmill Go</Typography>
     <Typography variant="h5" align='left'  color="initial">A cloud-based forestry management system that delivers complete transparency and the story behind your wood products. Enhance the value of every 
     tree with detailed tracking from forest to final product, ensuring sustainability and maximizing your profits.</Typography>
     </Paper>
    </Grid>
  );
};

export default AboutPage;
