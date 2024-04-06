import React from 'react';
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'


const LoggedOutPage = () => {
 

  return (
    <Grid container bgcolor={'lightblue'}>
     <Typography variant="h1" color="initial">Logged Out</Typography>
     <Typography variant="h6" color="initial">You are logged out!</Typography>
    </Grid>
  );
};

export default LoggedOutPage;
