import React from 'react';
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import ListAllTrees from '../../components/trees/ListAllTrees';
import IconButton from '@mui/material/IconButton'
import { Add } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import ListAllLogs from '../../components/treeLogs/ListAllLogs';



const LogsPage = () => {
 
    const navigate = useNavigate();



  return (
    <>
    <Box container color={'primary'} p={1} >
      Navigation
      </Box>
    <Grid p={1} >
      <ListAllLogs />
      </Grid>
      </>
  );
};

export default LogsPage;
