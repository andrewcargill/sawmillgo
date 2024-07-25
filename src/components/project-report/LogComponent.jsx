import React from 'react';
import { Typography, Grid, Paper, Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import PlankReport from './PlankReport'; // Subcomponent for plank rendering

const LogComponent = ({ log, color }) => {
  return (
    <Accordion>
      <AccordionSummary expandIcon={<ArrowDownwardIcon />}>
        <Typography>Log ID: {log.id}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Grid container>
          <Typography variant="body2">Date: {log.date}</Typography>
          <Typography variant="body2">Length: {log.length}</Typography>
          <Typography variant="body2">Diameter: {log.diameter}</Typography>
          <Typography variant="body2">Milled Date: {log.milledDate}</Typography>
          <Typography variant="body2">Lumberjack: {log.lumberJack}</Typography>

          {log.planks.map((plank) => (
            <Paper key={plank.id} style={{ border: `2px solid ${color}`, padding: 8, marginBottom: 8 }}>
              <PlankReport plank={plank} />
            </Paper>
          ))}
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
};

export default LogComponent;
