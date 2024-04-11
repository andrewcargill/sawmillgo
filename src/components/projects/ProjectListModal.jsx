import React, { useState, useEffect } from "react";
import {
  Modal,
  Box,
} from "@mui/material";
import ProjectDetailsModal from "./ProjectDetailsModal";
import ProjectAddEditModal from "./ProjectAddEditModal";
// import ProjectDetailsModal from "./ProjectDetailsModal"; // Assuming this is for viewing project details
// import AddEditProjectForm from "../components-for-dev/projects/AddEditProjectForm"; // Adjust the import path as needed

function ProjectListModal({ isOpen, onClose, projectDetails, mode, setMode }) {
    
    useEffect(() => {
        if (!isOpen) {
            setMode('view'); // Reset mode to view when modal is closed
        }
    }, [isOpen, setMode]);

    return (
        <Modal
            open={isOpen}
            onClose={onClose}
            aria-labelledby="project-details-title"
            aria-describedby="project-details-description"
        >
            <Box
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: 400,
                    bgcolor: "background.paper",
                    boxShadow: 24,
                    p: 4,
                }}
            >
              Project List Modal 
        
                {mode === 'view' && <ProjectDetailsModal setMode={setMode} projectDetails={projectDetails} onClose={onClose} />}
                {mode === 'edit' && <ProjectAddEditModal projectDetails={projectDetails} onClose={onClose} />}
                {mode === 'add' && <ProjectAddEditModal onClose={onClose} />}
            </Box>
        </Modal>
    );
}

export default ProjectListModal;
