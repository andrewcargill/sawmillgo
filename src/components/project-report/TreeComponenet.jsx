import React from 'react';
import { Typography, Grid, Paper, Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import LogComponent from './LogComponent'; // Subcomponent for log rendering

const TreeComponent = ({ tree, color }) => {
  return (
    <Grid item xs={12} style={{ border: `2px solid ${color}`, marginBottom: 16 }}>
      <Typography variant="h5">{tree.species}</Typography>
      <Typography variant="body2">Lumberjack: {tree.lumberJack}</Typography>
      <Typography variant="body2">Location: {tree.location}</Typography>
      <Typography variant="body2">Reason for Removal: {tree.reasonForRemoval}</Typography>
      <Typography variant="body2">Age: {tree.age}</Typography>
      <img src={tree.treeImage} alt={`Tree ${tree.id}`} style={{ width: '100%', height: 'auto' }} />
      
      {tree.logs.map((log, index) => (
        <LogComponent key={log.id} log={log} color={color} />
      ))}
    </Grid>
  );
};

export default TreeComponent;

