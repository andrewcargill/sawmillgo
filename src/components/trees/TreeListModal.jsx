import React, { useState, useEffect } from "react";
import { Modal, Box, Typography } from "@mui/material";
import TreeDetailsModal from "./TreeDetailsModal";
import AddEditTreeForm from "../components-for-dev/trees/AddEditTreeForm";

function TreeListModal({ isOpen, onClose, treeDetails, mode, setMode }) {
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setEditMode(false);
    }
  }, [isOpen]);

  const handleEditClick = () => {
    setEditMode(!editMode);
  };

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
          width: { xs: "90%", sm: 500 },
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          maxHeight: { xs: "80vh", sm: "90vh" }, // Adjusted max height
          overflowY: "auto", // Ensures scrollability
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* {editMode ? (
             <AddEditTreeForm handleEditClick={handleEditClick} treeDetails={treeDetails} onClose={onClose} /> 
      
           
        ) : (
            <TreeDetailsModal handleEditClick={handleEditClick} onClose={onClose} treeDetails={treeDetails}/>
       
        )} */}
        {mode === "view" && (
          <TreeDetailsModal
            setMode={setMode}
            treeDetails={treeDetails}
            onClose={onClose}
          />
        )}
        {mode === "edit" && (
          <AddEditTreeForm treeDetails={treeDetails} onClose={onClose} />
        )}
        {mode === "add" && <AddEditTreeForm onClose={onClose} />}
        {/* {mode === 'add' && <AddTreeForm onClose={onClose} />} */}
      </Box>
    </Modal>
  );
}

export default TreeListModal;
