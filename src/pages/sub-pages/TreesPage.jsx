import React from 'react';
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import ListAllTrees from '../../components/trees/ListAllTrees';
import IconButton from '@mui/material/IconButton'
import { Add } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';



const TreesPage = () => {
 
    const navigate = useNavigate();



  return (
    <>
    <Grid  flexDirection={'row'} border={1} p={2} >
        
      <Typography color="initial">Trees Page</Typography>
    
      </Grid>
    <Grid border={1} p={2} >
      <ListAllTrees />
      </Grid>
      </>
  );
};

export default TreesPage;
