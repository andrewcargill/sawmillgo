import React from 'react';
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import ListAllTrees from '../../components/trees/ListAllTrees';
import IconButton from '@mui/material/IconButton'
import { Add } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import ListAllPlanks from '../../components/planks/ListAllPlanks';



const PlanksPage = () => {
 
    const navigate = useNavigate();



  return (
    <>
   
    <Grid p={1} >
      <ListAllPlanks />
      </Grid>
      </>
  );
};

export default PlanksPage;
