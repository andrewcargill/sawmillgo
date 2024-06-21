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
import ContactsIcon from "@mui/icons-material/Contacts";
import { Tooltip } from "recharts";

const ContactsGauge = () => {
  const navigate = useNavigate();

  const handleAddClick = () => {
    navigate("/addsawmill");
  };

  return (
    <>
     
        <Grid
          border={1}
          borderRadius={3}
          p={2}
          boxShadow={5}
          bgcolor={"lightgray"}
          textAlign="center"
          sx={{
            // cursor: "pointer",
            "&:hover": {
              backgroundColor: "lightgray",
            },
            transition: "lightgray 0.3s",
          }}
        >
          <ContactsIcon fontSize="large" />
          <Typography color="initial">CUSTOMERS</Typography>
        </Grid>
  
    </>
  );
};

export default ContactsGauge;
