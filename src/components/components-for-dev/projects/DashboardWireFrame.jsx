import React, { useState } from 'react';
import { Container, Grid, Card, CardContent, Typography, Button, List, ListItem, ListItemText } from '@mui/material';
import UnifiedStockWireFrame from './UnifiedStockWireFrame';

const projects = [
  { id: 1, name: 'Project A' },
  { id: 2, name: 'Project B' },
  { id: 3, name: 'Project C' },
];

const Dashboard = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  const handleProjectSelect = (project) => {
    setSelectedProject(project);
  };

  if (selectedProject) {
    return <UnifiedStockWireFrame project={selectedProject} />;
  }

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom>
        Select a Project
      </Typography>
      <Grid container spacing={3}>
        {projects.map((project) => (
          <Grid item xs={12} md={4} key={project.id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{project.name}</Typography>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleProjectSelect(project)}
                >
                  Open Project
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Dashboard;
