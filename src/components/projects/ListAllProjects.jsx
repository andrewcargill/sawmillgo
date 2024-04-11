import React, { useState, useEffect } from "react";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { app } from "../../firebase-config";
import { Grid } from "@mui/material";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import ProjectListModal from "./ProjectListModal";

const ListAllProjects = () => {
  const [projects, setProjects] = useState([]);
  const [activeProjects, setActiveProjects] = useState([]);
  const [pausedProjects, setPausedProjects] = useState([]);
  const [withCreatorProjects, setWithCreatorProjects] = useState([]);
  const [soldProjects, setSoldProjects] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProjectDetails, setSelectedProjectDetails] = useState(null);
  const [modalMode, setModalMode] = useState('view');

  const db = getFirestore(app);
  const userLocalStorage = JSON.parse(localStorage.getItem("user"));
  const sawmillId = userLocalStorage?.sawmillId;

  useEffect(() => {
    const fetchProjects = async () => {
      if (!sawmillId) {
        console.log("Sawmill ID is not available");
        return;
      }

      const q = query(collection(db, `sawmill/${sawmillId}/projects`));
      try {
        const querySnapshot = await getDocs(q);
        const projectsArray = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProjects(projectsArray);

        // Filter projects based on their status and update state accordingly
        setActiveProjects(
          projectsArray.filter((project) => project.status === "active")
        );
        setPausedProjects(
          projectsArray.filter((project) => project.status === "paused")
        );
        setWithCreatorProjects(
          projectsArray.filter((project) => project.status === "with creator")
        );
        setSoldProjects(
          projectsArray.filter((project) => project.status === "sold")
        );
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchProjects();
  }, [db, sawmillId]); // Re-fetch when db or sawmillId changes

  const openProjectModal = (project, mode = 'view') => {
    setSelectedProjectDetails(project);
    setModalMode(mode);
    setIsModalOpen(true);

};

const handleAddTreeClick = () => {
  setModalMode('add');
  setIsModalOpen(true);
};

  return (
    <div>
      <Grid container>
        <Grid container item xs={12}>
        <Grid xs={10} container item justifyContent={'start'}>
          <Typography variant="h4" color="initial">
            Projects
          </Typography>
        </Grid>
        <Grid xs={2}>
         <Button
           variant="outlined"
           color="primary"
            onClick={handleAddTreeClick}
           startIcon={<AddIcon />}
           
         >
           add
         </Button>
         </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={3}>
            <h2>Active</h2>
            {activeProjects.length > 0 ? (
              <Grid item container xs={12}>
                {activeProjects.map((project) => (
                  <Grid
                    item
                    xs={12}
                    m={1}
                    p={1}
                    key={project.id}
                    border={"2px solid lightgrey"}
                    onClick={() => openProjectModal(project, 'view')}
                    style={{ cursor: 'pointer' }}
                  >
                    <strong>{project.projectName}</strong>
                    {/* Add more details or a link to edit/view each project */}
                  </Grid>
                ))}
              </Grid>
            ) : (
              <p>No projects found.</p>
            )}
          </Grid>
          <Grid item xs={3}>
            <h2>Paused</h2>
            {pausedProjects.length > 0 ? (
              <Grid item container xs={12}>
                {pausedProjects.map((project) => (
                  <Grid
                    item
                    xs={12}
                    m={1}
                    p={1}
                    key={project.id}
                    border={"2px solid lightgrey"}
                    onClick={() => openProjectModal(project, 'view')}
                    style={{ cursor: 'pointer' }}
                  >
                    <strong>{project.projectName}</strong>
                    {/* Add more details or a link to edit/view each project */}
                  </Grid>
                ))}
              </Grid>
            ) : (
              <p>No projects found.</p>
            )}
          </Grid>

          <Grid item xs={3}>
            <h2>With Creator</h2>
            {withCreatorProjects.length > 0 ? (
              <Grid item container xs={12}>
                {withCreatorProjects.map((project) => (
                  <Grid
                    item
                    xs={12}
                    m={1}
                    p={1}
                    key={project.id}
                    border={"2px solid lightgrey"}
                    onClick={() => openProjectModal(project, 'view')}
                    style={{ cursor: 'pointer' }}
                  >
                    <strong>{project.projectName}</strong>
                    {/* Add more details or a link to edit/view each project */}
                  </Grid>
                ))}
              </Grid>
            ) : (
              <p>No projects found.</p>
            )}
          </Grid>
          <Grid item xs={3}>
            <h2>Sold</h2>
            {soldProjects.length > 0 ? (
              <Grid item container xs={12}>
                {soldProjects.map((project) => (
                  <Grid
                    item
                    xs={12}
                    m={1}
                    p={1}
                    key={project.id}
                    border={"2px solid lightgrey"}
                    onClick={() => openProjectModal(project, 'view')}
                    style={{ cursor: 'pointer' }}
                  >
                    <strong>{project.projectName}</strong>
                    {/* Add more details or a link to edit/view each project */}
                  </Grid>
                ))}
              </Grid>
            ) : (
              <p>No projects found.</p>
            )}
          </Grid>
        </Grid>
      </Grid>
      <ProjectListModal
    isOpen={isModalOpen}
    onClose={() => setIsModalOpen(false)}
    projectDetails={selectedProjectDetails}
    mode={modalMode}
    setMode={setModalMode}
/>
    </div>
  );
};

export default ListAllProjects;
