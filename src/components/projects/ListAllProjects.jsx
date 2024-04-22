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
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import AdjustIcon from "@mui/icons-material/Adjust";
import VerifiedIcon from "@mui/icons-material/Verified";
import { Filter } from "@mui/icons-material";
import FilteredProjectsTable from "./sub-components/FilteredProjectsTable";

const ListAllProjects = () => {
  const [verifiedProjectsOnly, setVerifiedProjectsOnly] = useState(true);
  const [selectedProjectDetails, setSelectedProjectDetails] = useState(null);
  const [projects, setProjects] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("view");

  const db = getFirestore(app);
  const userLocalStorage = JSON.parse(localStorage.getItem("user"));
  const sawmillId = userLocalStorage?.sawmillId;

  useEffect(() => {
    if (!sawmillId) {
      console.log("Sawmill ID is not available");
      return;
    }
    const q = query(
      collection(db, `sawmill/${sawmillId}/projects`),
      where("verified", "==", verifiedProjectsOnly)
    );

    const fetchProjects = async () => {
      try {
        const querySnapshot = await getDocs(q);
        const projectsArray = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProjects(projectsArray);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchProjects();
  }, [db, sawmillId, verifiedProjectsOnly]);

  const openProjectModal = (project, mode = "view") => {
    setSelectedProjectDetails(project);
    setModalMode(mode);
    setIsModalOpen(true);
  };

  const handleAddTreeClick = () => {
    setModalMode("add");
    setIsModalOpen(true);
  };

  const switchVerifiedProjects = () => {
    setVerifiedProjectsOnly(!verifiedProjectsOnly);
  };

  return (
    <div>
      <Grid container spacing={2}>
      <Grid container item xs={12}>
          <Grid xs={6} sm={10} container item justifyContent={"flex-start"}>
          
              <Typography variant="h4" color="initial">
                Projects
              </Typography>
          
            
          </Grid>
          
          <Grid container item xs={6} sm={2} justifyContent={"end"}>
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
        <Grid item xs={12} m={2} borderRadius={'10px'} bgcolor={verifiedProjectsOnly ? "primary.main" : '' } >
              <FormControlLabel
                control={
                  <Switch
                    color={verifiedProjectsOnly ? "primary.contrastText" : "primary"}
                    checked={verifiedProjectsOnly}
                    onChange={switchVerifiedProjects}
                    checkedIcon={<VerifiedIcon />} // Icon when the switch is on
                  />
                }
                label={
                  verifiedProjectsOnly
                    ? "Verified Projects"
                    : "Unverified Projects"
                }
              />
            </Grid>

        {/* Displaying projects based on their status */}
        <FilteredProjectsTable
          projects={projects.filter((p) => p.status === "active")}
          title="Status: Active"
          openProjectModal={openProjectModal}
        />

        <FilteredProjectsTable
          projects={projects.filter((p) => p.status === "paused")}
          title="Status: Paused"
          openProjectModal={openProjectModal}
        />
        <FilteredProjectsTable
          projects={projects.filter((p) => p.status === "withCreator")}
          title="Status: With Creator"
          openProjectModal={openProjectModal}
        />

        {/* Additional project statuses can be added in the same way */}
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
