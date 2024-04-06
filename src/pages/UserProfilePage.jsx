import React from 'react';
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import UserProfileForm from '../components/users/UserProfileForm';
import UserProfileInfo from '../components/users/UserProfileInfo';

const UserProfilePage = () => {
 

  return (
    <Grid container bgcolor={'lightblue'}>
     <Typography variant="h1" color="initial">User Profile</Typography>
     <Grid container bgcolor={'lightblue'}>
  
      <UserProfileInfo />
      </Grid>
     <Grid container bgcolor={'lightblue'}>
  
        <UserProfileForm />
      </Grid>
    </Grid>
    
  );
};

export default UserProfilePage;
