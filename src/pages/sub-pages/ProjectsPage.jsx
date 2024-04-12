import React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import AddProjectForm from "../../components/components-for-dev/projects/AddProjectsForm";
import EditProjectForm from "../../components/components-for-dev/projects/EditProjectForm";
import ListAllProjects from "../../components/projects/ListAllProjects";

const ProjectsPage = () => {
  return (
    <>
      
        <Grid p={1}>
          <ListAllProjects />
        </Grid>

    </>
  );
};

export default ProjectsPage;
