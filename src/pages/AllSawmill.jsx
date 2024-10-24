import React from "react";
import AllSawmillsMap from "../components/google-maps/AllSawmillsMaps";
import { Typography, Grid } from "@mui/material";

const AllSawmill = () => {
  return (
    <Grid container p={5}>
      <Grid item xs={12} sx={{ mb: 2 }} className="fade-in-1">
        <Typography variant="h4" align="left" color="primary">
          Sawmills
        </Typography>
      </Grid>
    
      <AllSawmillsMap />
  
    </Grid>
  );
};

export default AllSawmill;
