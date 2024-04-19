import React, { useEffect } from "react";
import { Box, Typography, Modal } from "@mui/material";
import GradeFilter from "./GradeFilter";



const FilterModal = ({allFilters, setAllFilters, openModal, setOpenModal, modalType }) => {


    const getFilterComponent = () => {
        switch (modalType) {
            case 'species':
                return 'Species Filter';
            case 'status':
                return 'Status Filter';
            case 'grade':
                return <GradeFilter allFilters={allFilters} setAllFilters={setAllFilters} />;
            case 'dimensions':
                return 'Dimensions Filter';
            case 'locations':
                return 'Locations Filter';
            case 'projects':
                return 'Projects Filter';
            // Add other cases as needed
            default:
                return <Typography>No filter selected</Typography>;
        }
    };

    
    return (
<Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
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
         {getFilterComponent()}
        </Box>
      </Modal>
    );
};

export default FilterModal; 
