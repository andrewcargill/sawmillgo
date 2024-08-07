import React, { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { app } from "../../firebase-config"; // Make sure this path is correct
import { useNavigate } from "react-router-dom";
import FactoryIcon from "@mui/icons-material/Factory";
import { Tooltip } from "@mui/material";

const AddSawmillGauge = () => {
  const navigate = useNavigate();

  const handleAddClick = () => {
    navigate("/addsawmill");
  };

  return (
    <>
      <Tooltip title="Create a new sawmill">
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
          <FactoryIcon fontSize="large" />
          <Typography color="initial">Add Sawmill</Typography>
        </Grid>
      </Tooltip>
    </>
  );
};

export default AddSawmillGauge;
