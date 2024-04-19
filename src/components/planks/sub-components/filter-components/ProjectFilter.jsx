import React, { useEffect, useState } from "react";
import { Grid, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { getFirestore } from "firebase/firestore";
import { app } from "../../../../firebase-config"
import { getAuth } from "firebase/auth";
import { fetchProjectsForSawmill } from "../../../../utils/filestoreOperations";



const ProjectFilter = ({ allFilters, setAllFilters, setOpenModal }) => {
 
    const [projects, setProjects] = useState([]);

  const db = getFirestore(app);
  const auth = getAuth(app);
  const currentUserUID = auth.currentUser ? auth.currentUser.uid : null;
  const sawmillId = JSON.parse(localStorage.getItem("user"))?.sawmillId;
  const userName = JSON.parse(localStorage.getItem("user"))?.displayName;

  useEffect(() => {
    if (sawmillId) {
      fetchProjectsForSawmill(db, sawmillId)
      .then(setProjects)
      .catch(console.error);
    }
  }, [db, sawmillId]);

  const handleChange = (event) => {
    const selectedId = event.target.value;
    if (selectedId === "") {
        setAllFilters(prevFilters => ({
            ...prevFilters,
            projectId: null,
            projectName: null
        }));
        setOpenModal(false);
        return;
    }

    const selectedProject = projects.find(project => project.id === selectedId);
    if (selectedProject) {
        setAllFilters(prevFilters => ({
            ...prevFilters,
            projectId: selectedProject.id,
            projectName: selectedProject.projectName,
        }));
    }
    setOpenModal(false);
};


    return (
      <Grid item xs={12}>
      <FormControl fullWidth>
        <InputLabel id="project-label">Project</InputLabel>
        <Select
          labelId="project-label"
          id="projectId"
          name="projectId"
          value={allFilters.projectId}
          label="Project"
          onChange={handleChange}
        >
          {projects.map((project) => (
            <MenuItem key={project.id} value={project.id}>
              {project.projectName}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Grid>

 
    );
};

export default ProjectFilter;
