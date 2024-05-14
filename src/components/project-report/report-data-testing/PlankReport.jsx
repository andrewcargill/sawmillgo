import React from 'react';
import { Typography, Grid } from "@mui/material";

const PlankReport = ({ plank }) => {
  return (
    <Grid container>
      <Typography variant="body2">Plank ID: {plank.id}</Typography>
      <Typography variant="body2">Operator: {plank.operator}</Typography>
      <Typography variant="body2">Milled Date: {plank.milledDate}</Typography>
      <Typography variant="body2">Comments: {plank.comments}</Typography>
      <Typography variant="body2">Dimensions: {plank.width} x {plank.depth} x {plank.length}</Typography>
      <Typography variant="body2">Grade: {plank.grade}</Typography>
      <Typography variant="body2">Moisture Content:</Typography>
      {/* {plank.moistureContent.map((mc, index) => (
        <Typography key={index} variant="body2"> - {mc.value}% at {mc.createdAt}</Typography>
      ))} */}
    </Grid>
  );
};

export default PlankReport;
