import React from 'react';
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import ListAllTrees from '../../components/trees/ListAllTrees';



const TreesPage = () => {
 

  return (
    <>
    <Grid border={1} p={2} >
      <Typography color="initial">Trees Page</Typography>
      </Grid>
    <Grid border={1} p={2} >
      <ListAllTrees />
      </Grid>
      </>
  );
};

export default TreesPage;
