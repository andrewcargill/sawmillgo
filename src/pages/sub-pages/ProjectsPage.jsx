import React from 'react';
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import AddProjectForm from '../../components/components-for-dev/projects/AddProjectsForm';
import EditProjectForm from '../../components/components-for-dev/projects/EditProjectForm';
import ListAllProjects from '../../components/projects/ListAllProjects';


const ProjectsPage = () => {
 

  return (
    <>
    <Grid border={1} p={2} >
      <Typography color="initial">Projects Page</Typography>
      <Grid border={1} p={2} >
      <ListAllProjects />
       </Grid>
      <AddProjectForm />
 
      </Grid>
       <Grid border={1} p={2} >
      <EditProjectForm />
       </Grid>
       
        </>
  );
};

export default ProjectsPage;
