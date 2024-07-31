import React from 'react';
import { Container, Grid, Typography } from '@mui/material';
import TreesWidget from './widgets/TreesWidget';
import LogsWidget from './widgets/LogsWidget';
import PlanksWidget from './widgets/PlanksWidget';
import StockLevelsWidget from './widgets/StockLevelsWidget';
import ProjectStatusWidget from './widgets/ProjectStatusWidget';
import ProjectDeadlinesWidget from './widgets/ProjectDeadlinesWidget';

const DashboardWireFrame = () => {
  return (
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom>
        Sawmill Management Dashboard
      </Typography>

      <Grid container spacing={2}>
      <Grid item xs={6} sm={4} md={3}>
          <TreesWidget />
        </Grid>
        <Grid item xs={6} sm={4} md={3}>
          <LogsWidget />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <PlanksWidget />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <StockLevelsWidget />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <ProjectStatusWidget />
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <ProjectDeadlinesWidget />
        </Grid>
      </Grid>
    </Container>
  );
};

export default DashboardWireFrame;
