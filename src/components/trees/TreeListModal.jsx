import React, { useState, useEffect } from "react";
import {
  Modal,
  Box, Typography,
} from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import TreeDetailsModal from "./TreeDetailsModal";
import AddEditTreeForm from "../components-for-dev/trees/AddEditTreeForm";

function TreeListModal({ isOpen, onClose, treeDetails }) {
    
    const [editMode, setEditMode] = useState(false);
  

    useEffect(() => {
        if (!isOpen) {
            setEditMode(false);
        }
      
    }, [isOpen]);

    const handleEditClick = () => {
        setEditMode(!editMode);
    }

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="tree-details-title"
      aria-describedby="tree-details-description"
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
        {editMode ? (
             <AddEditTreeForm treeDetails={treeDetails} onClose={onClose} /> 
      
           
        ) : (
            <TreeDetailsModal handleEditClick={handleEditClick} onClose={onClose} treeDetails={treeDetails}/>
       
        )}
      </Box>
    </Modal>
  );
}

export default TreeListModal;
