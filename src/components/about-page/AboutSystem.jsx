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
  Button,
  Card,
  CardContent,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import imageSmall from "../../media/images/screen_shots.jpg";
import imageMedium from "../../media/images/screens_medium.jpg";
import imageLarge from "../../media/images/screens_large.jpg";

const AboutSystem = () => {
  const [expanded, setExpanded] = useState(false); // State to track which accordion is expanded
  const theme = useTheme();

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false); // Only allow one accordion to be open
  };

  return (
    <Grid container>
      <Box
        sx={{
          backgroundImage: `url(${imageSmall})`, // Default for small screens
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "26vh",

          width: "100%",
          borderRadius: "10px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          [theme.breakpoints.up("sm")]: {
            backgroundImage: `url(${imageLarge})`,
            height: "26vh",
          },
          [theme.breakpoints.up("md")]: {
            backgroundImage: `url(${imageLarge})`,
            height: "24vh",
            backgroundSize: "contain",
            position: "top",
          },
        }}
      ></Box>

      <Grid item xs={12} sx={{ mb: 6 }}>
        {/* Call to Action Button */}
        <Box mt={3}>
          <Button
            variant="outlined"
            color="primary"
            component={Link}
            to="/demos"
          >
            System Demos
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            component={Link}
            to="/investors"
            sx={{ ml: 2 }}
          >
            Get Involved
          </Button>
        </Box>
      </Grid>

      {/* Our Vision */}
      {/* <Grid container spacing={4} sx={{ mb: 4 }}>
        <Grid item xs={12} sx={{ mt: 4 }}>
      
          <Card
            elevation={3}
            sx={{
              mt: 2,
              p: 2,
              backgroundColor: "background.paper",
              borderRadius: 2,
            }}
          >
            <CardContent>
            <Typography
            variant="h4"
            align="left"
            color="primary"
            sx={{
              borderColor: "primary.main",
              display: "inline-block",
              pb: 1,
            }}
          >
            Our Vision
          </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: "text.secondary",
                  lineHeight: 1.7,
                  fontWeight: 800,
                }}
              >
                At SawmillGo, we envision a world where sustainably sourced wood
                becomes the standard. By empowering small-scale forest owners
                and creators, we not only drive environmental stewardship but
                also help build stronger, more connected communities that value
                the journey of every tree.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid> */}

      {/* <Grid item xs={12} sx={{ mb: 2 }}>
        <Typography variant="h4" align="center" color="primary">
          System Features
        </Typography>
      </Grid> */}

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
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body1" align="left" color="textSecondary">
                Follow the lifecycle of your stock from tree to plank, ensuring
                traceability and transparency.
              </Typography>
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
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body1" align="left" color="textSecondary">
                Categorize and manage stock into three types: Trees, Logs, and
                Planks.
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
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body1" align="left" color="textSecondary">
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
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body1" align="left" color="textSecondary">
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
            </AccordionDetails>
          </Accordion>
        </Box>
      </Grid>

      {/* Right Column */}
      <Grid item xs={12} md={6}>
        <Box sx={{ paddingLeft: { xs: "0px", md: "20px" } }}>
          <Accordion
            expanded={expanded === "panel8"}
            onChange={handleChange("panel8")}
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
                  Stock handling
                </Typography>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body1" align="left" color="textSecondary">
                Handle both normal and transparent stock seamlessly in one
                system, offering flexibility for all operations.
              </Typography>
              <List>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircleIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText primary="Status levels (avaliable, reserved, sold)" />
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
                  <ListItemText primary="Manage locations and moisture history" />
                </ListItem>
              </List>
            </AccordionDetails>
          </Accordion>

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
                  Customer management
                </Typography>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body1" align="left" color="textSecondary">
                Allocate your stock to different projects and keep track of
                their progress.
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
                  Collaborate with Carpenters
                </Typography>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body1" align="left" color="textSecondary">
                Work with wood product creators by providing them their own
                logins and tracking their process.
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
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body1" align="left" color="textSecondary">
                Provide customers with interactive reports that show the entire
                journey of the wood.
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
            </AccordionDetails>
          </Accordion>
        </Box>
      </Grid>
    </Grid>
  );
};

export default AboutSystem;
