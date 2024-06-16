import React from 'react';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Grid, List, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material';

const AboutSystem = () => {
    return (


<Grid container spacing={4} direction="column">
  <Grid item>
    <Typography variant="h4" align='left' color="primary">
     Key Features
    </Typography>
  </Grid>
  
  <Grid item>
    <Typography variant="h5" align='left' color="primary">
      Track Your Stock
    </Typography>
    <Typography variant="body1" align='left' color="textSecondary">
      Categorize and manage stock into three types: Trees, Logs, and Planks.
    </Typography>
    <List>
      <ListItem>
        <ListItemIcon>
          <CheckCircleIcon color="primary" />
        </ListItemIcon>
        <ListItemText primary="Easily Add Stock via mobile or laptop" />
      </ListItem>
      <ListItem>
        <ListItemIcon>
          <CheckCircleIcon color="primary" />
        </ListItemIcon>
        <ListItemText primary="Categorize your stock" />
      </ListItem>
      <ListItem>
        <ListItemIcon>
          <CheckCircleIcon color="primary" />
        </ListItemIcon>
        <ListItemText primary="Keep track of stock via customised locations" />
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
      Stock Locations
    </Typography>
    <Typography variant="body1" align='left' color="textSecondary">
      Create custom locations to keep track of stock.
    </Typography>
    <List>
      <ListItem>
        <ListItemIcon>
          <CheckCircleIcon color="primary" />
        </ListItemIcon>
        <ListItemText primary="Limitless number of customisable locations" />
      </ListItem>
      <ListItem>
        <ListItemIcon>
          <CheckCircleIcon color="primary" />
        </ListItemIcon>
        <ListItemText primary="Ability for multiple drying areas / stacks" />
      </ListItem>
      <ListItem>
        <ListItemIcon>
          <CheckCircleIcon color="primary" />
        </ListItemIcon>
        <ListItemText primary="Allocate stock to locations" />
      </ListItem>
      <ListItem>
        <ListItemIcon>
          <CheckCircleIcon color="primary" />
        </ListItemIcon>
        <ListItemText primary="Viewable location history for complete historical transparency" />
      </ListItem>
    </List>
  </Grid>

  <Grid item>
    <Typography variant="h5" align='left' color="primary">
     Moisture Content Monitoring
    </Typography>
    <Typography variant="body1" align='left' color="textSecondary">
      Add moisture checks to your stock to monitor the drying process.
    </Typography>
    <List>
      <ListItem>
        <ListItemIcon>
          <CheckCircleIcon color="primary" />
        </ListItemIcon>
        <ListItemText primary="Provide the customer with upto date moisture data" />
      </ListItem>
      <ListItem>
        <ListItemIcon>
          <CheckCircleIcon color="primary" />
        </ListItemIcon>
        <ListItemText primary="Ability to add moisture checks for each plank in stock" />
      </ListItem>
      <ListItem>
        <ListItemIcon>
          <CheckCircleIcon color="primary" />
        </ListItemIcon>
        <ListItemText primary="Search stock by moisture content value" />
      </ListItem>
      <ListItem>
        <ListItemIcon>
          <CheckCircleIcon color="primary" />
        </ListItemIcon>
        <ListItemText primary="Graphical display of current and historical data" />
      </ListItem>
     
    </List>
  </Grid>
  
  <Grid item>
    <Typography variant="h5" align='left' color="primary">
      Project Management
    </Typography>
    <Typography variant="body1" align='left' color="textSecondary">
      Allocate your stock to different projects and keep track of their progress.
    </Typography>
    <List>
      <ListItem>
        <ListItemIcon>
          <CheckCircleIcon color="primary" />
        </ListItemIcon>
        <ListItemText primary="Create projects for each customer" />
      </ListItem>
      <ListItem>
        <ListItemIcon>
          <CheckCircleIcon color="primary" />
        </ListItemIcon>
        <ListItemText primary="Assign stock to projects" />
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
      Full Lifecycle Tracking (Verified Stock)
    </Typography>
    <Typography variant="body1" align='left' color="textSecondary">
      Follow the lifecycle of your stock from tree to plank, ensuring traceability and transparency.
    </Typography>
    <List>
      <ListItem>
        <ListItemIcon>
          <CheckCircleIcon color="primary" />
        </ListItemIcon>
        <ListItemText primary="Revolutionary software that keeps track of tree, log and plank relationships" />
      </ListItem>
      <ListItem>
        <ListItemIcon>
          <CheckCircleIcon color="primary" />
        </ListItemIcon>
        <ListItemText primary="Automatically update movements of stock between locations" />
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
     Collaborate with Creators
    </Typography>
    <Typography variant="body1" align='left' color="textSecondary">
      Work with wood product creators by providing them their own logins and tracking their process.
    </Typography>
    <List>
      <ListItem>
        <ListItemIcon>
          <CheckCircleIcon color="primary" />
        </ListItemIcon>
        <ListItemText primary="Creators are linked to projects to open up a powerful feature of the software" />
      </ListItem>
      <ListItem>
        <ListItemIcon>
          <CheckCircleIcon color="primary" />
        </ListItemIcon>
        <ListItemText primary="Creators document their product creation process" />
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
     Interactive End Reports
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
