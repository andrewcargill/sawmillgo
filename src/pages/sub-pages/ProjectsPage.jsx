import React from 'react';
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import AddProjectForm from '../../components/components-for-dev/projects/AddProjectsForm';
import EditProjectForm from '../../components/components-for-dev/projects/EditProjectForm';


const ProjectsPage = () => {
 

  return (
    <>
    <Grid border={1} p={2} >
      <Typography color="initial">Projects Page</Typography>
      <AddProjectForm />
 
      </Grid>
       <Grid border={1} p={2} >
      <EditProjectForm />
       </Grid>
        </>
  );
};

export default ProjectsPage;
