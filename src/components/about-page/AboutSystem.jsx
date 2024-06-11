import React from 'react';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Grid, List, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material';

const AboutSystem = () => {
    return (


<Grid container spacing={4} direction="column">
  <Grid item>
    <Typography variant="h4" align='left' color="primary">
      How It Works
    </Typography>
  </Grid>
  
  <Grid item>
    <Typography variant="h5" align='left' color="primary">
      Step 1: Track Your Stock
    </Typography>
    <Typography variant="body1" align='left' color="textSecondary">
      Our system helps you categorize and manage your stock in three types: Trees, Logs, and Planks.
    </Typography>
    <List>
      <ListItem>
        <ListItemIcon>
          <CheckCircleIcon color="primary" />
        </ListItemIcon>
        <ListItemText primary="Easily categorize your stock" />
      </ListItem>
      <ListItem>
        <ListItemIcon>
          <CheckCircleIcon color="primary" />
        </ListItemIcon>
        <ListItemText primary="Search and filter stock with ease" />
      </ListItem>
    </List>
  </Grid>
  
  <Grid item>
    <Typography variant="h5" align='left' color="primary">
      Step 2: Manage Projects
    </Typography>
    <Typography variant="body1" align='left' color="textSecondary">
      Allocate your stock to different projects and keep track of their progress.
    </Typography>
    <List>
      <ListItem>
        <ListItemIcon>
          <CheckCircleIcon color="primary" />
        </ListItemIcon>
        <ListItemText primary="Assign stock to specific projects" />
      </ListItem>
      <ListItem>
        <ListItemIcon>
          <CheckCircleIcon color="primary" />
        </ListItemIcon>
        <ListItemText primary="Monitor project progress in real-time" />
      </ListItem>
    </List>
  </Grid>
  
  <Grid item>
    <Typography variant="h5" align='left' color="primary">
      Step 3: Full Lifecycle Tracking
    </Typography>
    <Typography variant="body1" align='left' color="textSecondary">
      Follow the lifecycle of your stock from tree to plank, ensuring traceability and transparency.
    </Typography>
    <List>
      <ListItem>
        <ListItemIcon>
          <CheckCircleIcon color="primary" />
        </ListItemIcon>
        <ListItemText primary="Add trees, log them, and convert logs to planks" />
      </ListItem>
      <ListItem>
        <ListItemIcon>
          <CheckCircleIcon color="primary" />
        </ListItemIcon>
        <ListItemText primary="Achieve 100% traceability with verified stock" />
      </ListItem>
    </List>
  </Grid>
  
  <Grid item>
    <Typography variant="h5" align='left' color="primary">
      Step 4: Collaborate with Creators
    </Typography>
    <Typography variant="body1" align='left' color="textSecondary">
      Work with wood product creators by providing them their own logins and tracking their process.
    </Typography>
    <List>
      <ListItem>
        <ListItemIcon>
          <CheckCircleIcon color="primary" />
        </ListItemIcon>
        <ListItemText primary="Creators can document their product creation process" />
      </ListItem>
      <ListItem>
        <ListItemIcon>
          <CheckCircleIcon color="primary" />
        </ListItemIcon>
        <ListItemText primary="Generate QR codes linking to detailed end reports" />
      </ListItem>
    </List>
  </Grid>
  
  <Grid item>
    <Typography variant="h5" align='left' color="primary">
      Step 5: Interactive End Reports
    </Typography>
    <Typography variant="body1" align='left' color="textSecondary">
      Provide customers with interactive reports that show the entire journey of the wood.
    </Typography>
    <List>
      <ListItem>
        <ListItemIcon>
          <CheckCircleIcon color="primary" />
        </ListItemIcon>
        <ListItemText primary="Interactive graphs and maps" />
      </ListItem>
      <ListItem>
        <ListItemIcon>
          <CheckCircleIcon color="primary" />
        </ListItemIcon>
        <ListItemText primary="Show the journey from forest to final product" />
      </ListItem>
    </List>
  </Grid>
</Grid>
    );
}

export default AboutSystem;
