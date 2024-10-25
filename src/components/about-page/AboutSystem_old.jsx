import React, { useState } from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";

const AboutSystem = () => {
  const [expanded, setExpanded] = useState(false); // State to track which accordion is expanded

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false); // Only allow one accordion to be open
  };

  return (
    <Grid container>
      <Grid item xs={12} sx={{ mb: 2 }}>
        <Typography variant="h4" align="left" color="primary">
          Key Features
        </Typography>
      </Grid>

      {/* Left Column */}
      <Grid item xs={12} md={6}>
        <Box sx={{ paddingRight: { xs: "0px", md: "20px" } }}>
          <Accordion
            expanded={expanded === "panel1"}
            onChange={handleChange("panel1")}
            sx={{ mb: 2 }}
            className="fade-in-1"
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Box display="flex" flexDirection="column">
                <Typography variant="h5" align="left" color="primary">
                  Wood Source Transparency (Verified Stock)
                </Typography>
                <Typography variant="body1" align="left" color="textSecondary">
                  Follow the lifecycle of your stock from tree to plank,
                  ensuring traceability and transparency.
                </Typography>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <List>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircleIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText primary="Stores GPS Location of trees & image before felling" />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircleIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText primary="Commit a reason for felling (e.g thinning, wind-fallen)" />
                </ListItem>
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
                  <ListItemText primary="Automatically updates the movement of stock between locations" />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircleIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText primary="Achieve 100% traceability with verified stock" />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircleIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText primary="Provide the end customer with a transparent report full of rich data" />
                </ListItem>
              </List>
            </AccordionDetails>
          </Accordion>

          <Accordion
            expanded={expanded === "panel2"}
            onChange={handleChange("panel2")}
            sx={{ mb: 2 }}
            className="fade-in-2"
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <Box display="flex" flexDirection="column">
                <Typography variant="h5" align="left" color="primary">
                  Track Sawmill Stock
                </Typography>
                <Typography variant="body1" align="left" color="textSecondary">
                  Categorize and manage stock into three types: Trees, Logs, and
                  Planks.
                </Typography>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
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
                  <ListItemText primary="Log stock stores information such as diameter, species and length" />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircleIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText primary="Plank stock stores information such as dimensions, grade, species and customized notes" />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircleIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText primary="Stores pictures of each plank from the sawmill" />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircleIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText primary="Know the location of stock via customised locations" />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircleIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText primary="Comprehensive search and filter functions" />
                </ListItem>
              </List>
            </AccordionDetails>
          </Accordion>

          <Accordion
            expanded={expanded === "panel3"}
            onChange={handleChange("panel3")}
            sx={{ mb: 2 }}
            className="fade-in-3"
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel3a-content"
              id="panel3a-header"
            >
              <Box display="flex" flexDirection="column">
                <Typography variant="h5" align="left" color="primary">
                  Stock Locations
                </Typography>
                <Typography variant="body1" align="left" color="textSecondary">
                  Create custom locations to keep track of stock.
                </Typography>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
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
            </AccordionDetails>
          </Accordion>

          <Accordion
            expanded={expanded === "panel4"}
            onChange={handleChange("panel4")}
            sx={{ mb: 2 }}
            className="fade-in-4"
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel4a-content"
              id="panel4a-header"
            >
              <Box display="flex" flexDirection="column">
                <Typography variant="h5" align="left" color="primary">
                  Moisture Content Monitoring
                </Typography>
                <Typography variant="body1" align="left" color="textSecondary">
                  Add moisture checks to your stock to monitor the drying
                  process.
                </Typography>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
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
            </AccordionDetails>
          </Accordion>
        </Box>
      </Grid>

      {/* Right Column */}
      <Grid item xs={12} md={6}>
        <Box sx={{ paddingLeft: { xs: "0px", md: "20px" } }}>
          <Accordion
            expanded={expanded === "panel5"}
            onChange={handleChange("panel5")}
            sx={{ mb: 2 }}
            className="fade-in-1"
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Box display="flex" flexDirection="column">
                <Typography variant="h5" align="left" color="primary">
                  Project Management
                </Typography>
                <Typography variant="body1" align="left" color="textSecondary">
                  Allocate your stock to different projects and keep track of
                  their progress.
                </Typography>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
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
            </AccordionDetails>
          </Accordion>

          <Accordion
            expanded={expanded === "panel6"}
            onChange={handleChange("panel6")}
            sx={{ mb: 2 }}
            className="fade-in-2"
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Box display="flex" flexDirection="column">
                <Typography variant="h5" align="left" color="primary">
                  Collaborate with Creators
                </Typography>
                <Typography variant="body1" align="left" color="textSecondary">
                  Work with wood product creators by providing them their own
                  logins and tracking their process.
                </Typography>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
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
            </AccordionDetails>
          </Accordion>

          <Accordion
            expanded={expanded === "panel7"}
            onChange={handleChange("panel7")}
            sx={{ mb: 2 }}
            className="fade-in-3"
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Box display="flex" flexDirection="column">
                <Typography variant="h5" align="left" color="primary">
                  Interactive End Reports
                </Typography>
                <Typography variant="body1" align="left" color="textSecondary">
                  Provide customers with interactive reports that show the
                  entire journey of the wood.
                </Typography>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
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
            </AccordionDetails>
          </Accordion>
        </Box>
      </Grid>
    </Grid>
  );
};

export default AboutSystem;
