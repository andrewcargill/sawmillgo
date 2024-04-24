import React, { useState, useEffect } from "react";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { app } from "../../firebase-config";
import { Grid, ToggleButton, ToggleButtonGroup } from "@mui/material";

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
import AppsIcon from "@mui/icons-material/Apps";
import GridOnIcon from "@mui/icons-material/GridOn";
import ListIcon from "@mui/icons-material/List";


const ListAllProjects = () => {
  const [verifiedProjectsOnly, setVerifiedProjectsOnly] = useState(true);
  const [filterSelector, setFilterSelector] = useState("active")
  const [selectedProjectDetails, setSelectedProjectDetails] = useState(null);
  const [projects, setProjects] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("view");
  const [dynamicView, setDynamicView] = useState("list");

  const db = getFirestore(app);
  const userLocalStorage = JSON.parse(localStorage.getItem("user"));
  const sawmillId = userLocalStorage?.sawmillId;

  const views = [
    { view: "grid", icon: <GridOnIcon /> },
    { view: "list", icon: <ListIcon /> },
  ];

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

  const handleStatusClick = (event, newStatus) => {
    // Check if newStatus is not null to avoid clearing the selection when clicking the same button
    if (newStatus !== null) {
      setFilterSelector(newStatus);
    }
  };

  const handleDynamicViewClick = () => {
    const currentIndex = views.findIndex((v) => v.view === dynamicView);
    const nextIndex = (currentIndex + 1) % views.length;
    setDynamicView(views[nextIndex].view);
  };
  

  return (
    <Grid>
      <Grid container spacing={1}>
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
        <Grid
          item
          xs={12}
          m={2}
          borderRadius={"10px"}
          bgcolor={verifiedProjectsOnly ? "primary.main" : ""}
        >
          <FormControlLabel
            control={
              <Switch
                color={
                  verifiedProjectsOnly ? "primary.contrastText" : "primary"
                }
                checked={verifiedProjectsOnly}
                onChange={switchVerifiedProjects}
                checkedIcon={<VerifiedIcon />} // Icon when the switch is on
              />
            }
            label={
              verifiedProjectsOnly ? "Verified Projects" : "Unverified Projects"
            }
          />
        </Grid>
        <Grid container xs={12}></Grid>
        <Grid item xs={8}>
          <ToggleButtonGroup
            value={filterSelector}
            exclusive
            onChange={handleStatusClick}
            aria-label="filter selector"
          >
            <ToggleButton color="secondary" value="active" aria-label="active">
              Active
            </ToggleButton>
            <ToggleButton color="secondary" value="paused" aria-label="paused">
            Paused
            </ToggleButton>
            <ToggleButton color="secondary"  value="creator" aria-label="creator">
             Creator
            </ToggleButton>
            <ToggleButton color="secondary"  value="complete" aria-label="complete">
            Complete
            </ToggleButton>
          </ToggleButtonGroup>
        </Grid>

        <Grid item xs={4}>

          <Button
          variant="outlined"
          color="primary"
          onClick={handleDynamicViewClick}
          startIcon={views.find((v) => v.view === dynamicView)?.icon}
        >
          {dynamicView === 'list' ? 'List View' : 'Grid View'}
        </Button>
          </Grid>

        {/* Displaying projects based on their status */}
        {filterSelector === 'active' && (
        <FilteredProjectsTable
          projects={projects.filter((p) => p.status === "active")}
          dynamicView={dynamicView}
          title="Status: Active"
          openProjectModal={openProjectModal}
        />
          )}

{filterSelector === 'paused' && (
        <FilteredProjectsTable
          projects={projects.filter((p) => p.status === "paused")}
          dynamicView={dynamicView}
          title="Status: Paused"
          openProjectModal={openProjectModal}
        />
      )}
      
{filterSelector === 'creator' && (
        <FilteredProjectsTable
          projects={projects.filter((p) => p.status === "withCreator")}
          dynamicView={dynamicView}
          title="Status: With Creator"
          openProjectModal={openProjectModal}
        />
)}

{filterSelector === 'sold' && (
        <FilteredProjectsTable
          projects={projects.filter((p) => p.status === "sold")}
          dynamicView={dynamicView}
          title="Status: Sold"
          openProjectModal={openProjectModal}
        />
)}

        {/* Additional project statuses can be added in the same way */}
      </Grid>

      <ProjectListModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        projectDetails={selectedProjectDetails}
        mode={modalMode}
        setMode={setModalMode}
      />
    </Grid>
  );
};

export default ListAllProjects;
