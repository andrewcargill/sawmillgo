import React from 'react';
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import ListAllTrees from '../../components/trees/ListAllTrees';
import IconButton from '@mui/material/IconButton'
import { Add } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';



const TreesPage = () => {
 
    const navigate = useNavigate();

    const handleAddClick = () => {
        navigate('/addtree');
    };


  return (
    <>
    <Grid container flexDirection={'row'} border={1} p={2} >
        <Grid item xs={8}>
      <Typography color="initial">Trees Page</Typography>
      </Grid>
        <Grid item xs={4}>
     <IconButton onClick={handleAddClick}>
       <Add />
     </IconButton>
      </Grid>
      </Grid>
    <Grid border={1} p={2} >
      <ListAllTrees />
      </Grid>
      </>
  );
};

export default TreesPage;
