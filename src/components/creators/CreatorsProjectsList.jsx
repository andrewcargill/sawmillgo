import React, { useState, useEffect } from "react";
import { Grid, Typography, Dialog, DialogContent, DialogActions, Button, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import ProjectDetailDialogue from "./projectDetailDialogue";

const CreatorsProjectsList = ({ userProfile }) => {
  const [allProjects, setAllProjects] = useState([]);  // Store all projects
  const [displayProjects, setDisplayProjects] = useState([]);  // Projects to display
  const [selectedProjectDetails, setSelectedProjectDetails] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState("all");
  const db = getFirestore();

  useEffect(() => {
    const fetchProjects = async () => {
      if (userProfile && userProfile.projects && userProfile.projects.length > 0) {
        const projectsData = await Promise.all(
          userProfile.projects.map(async (project) => {
            const projectRef = doc(db, `sawmill/${project.sawmillId}/projects/${project.projectId}`);
            const docSnap = await getDoc(projectRef);
            return docSnap.exists() ? { id: docSnap.id, ...docSnap.data(), sawmillName: project.sawmillName } : null;
          })
        );
        setAllProjects(projectsData.filter(p => p));  // Filter out nulls and store all projects
        setDisplayProjects(projectsData.filter(p => p));  // Initially display all projects
      }
    };
    fetchProjects();
  }, [userProfile, db]);

  useEffect(() => {
    // Filter projects when statusFilter changes
    if (statusFilter === "all") {
      setDisplayProjects(allProjects);
    } else {
      setDisplayProjects(allProjects.filter(p => p.status === statusFilter));
    }
  }, [statusFilter, allProjects]);

  function capitalizeWords(string) {
    return string.toLowerCase().split(" ").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
  }

  const handleProjectClick = (project) => {
    setSelectedProjectDetails(project);
    setIsModalOpen(true);
  };

  const handleCloseDialog = () => {
    setIsModalOpen(false);
  };

  return (
    <Grid container sx={{ justifyContent: { xs: "center", sm: "flex-start" }, alignContent: "center", p: 2 }}>
      <FormControl fullWidth margin="normal">
        <InputLabel id="status-select-label">Status</InputLabel>
        <Select labelId="status-select-label" id="status-select" value={statusFilter} label="Status" onChange={e => setStatusFilter(e.target.value)}>
          <MenuItem value="all">All</MenuItem>
          <MenuItem value="active">Active</MenuItem>
          <MenuItem value="paused">Paused</MenuItem>
          <MenuItem value="withCreator">With Creator</MenuItem>
          <MenuItem value="sold">Sold</MenuItem>
        </Select>
      </FormControl>
      {displayProjects.length > 0 ? displayProjects.map(project => (
        <Grid className="item-select" item xs={12} sm={6} md={4} lg={3} key={project.id} bgcolor="white.main" sx={{ m: 1, border: 1, borderColor: 'grey.300', borderRadius: 2, p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer' }} onClick={() => handleProjectClick(project)}>
          <Typography variant="h6">{capitalizeWords(project.sawmillName)}</Typography>
          <Typography>{project.projectName}</Typography>
        </Grid>
      )) : <Typography variant="subtitle1" p={2}>No projects found.</Typography>}
      <Dialog open={isModalOpen} onClose={handleCloseDialog} onExited={() => setSelectedProjectDetails(null)} >
        <DialogContent>
          <ProjectDetailDialogue data={selectedProjectDetails} />
        </DialogContent>
        <DialogActions>
        
          <Button onClick={handleCloseDialog}>Close</Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
};

export default CreatorsProjectsList;


