import React, { useEffect, useState } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { app } from "../../firebase-config"; // Make sure this path is correct
import { useNavigate } from "react-router-dom";
import EventNoteIcon from "@mui/icons-material/EventNote";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import PersonIcon from '@mui/icons-material/Person';
import { IconButton, Tooltip } from "@mui/material";

const UserProfileGauge = () => {
  const [projects, setProjects] = useState([]);
  const db = getFirestore(app);

  const navigate = useNavigate();

 

  const handleAddClick = () => {
    navigate("/profile");
  };

  return (
    <>
      <Tooltip title="Here you can view and edit your profile">
        <Grid
          border={1}
          borderRadius={3}
          p={2}
          boxShadow={5}
          bgcolor={"white.main"}
          textAlign="center"
          onClick={handleAddClick}
          sx={{
            cursor: "pointer",
            "&:hover": {
              backgroundColor: "primary.main",
            },
            transition: "background-color 0.5s",
          }}
        >
          <PersonIcon fontSize="large" />
          <Typography color="initial">
            User Profile
     
          </Typography>
        </Grid>
      </Tooltip>
    </>
  );
};

export default UserProfileGauge;
