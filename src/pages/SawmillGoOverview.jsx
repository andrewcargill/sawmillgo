import React, { useState } from "react";
import {
  Container,
  Typography,
  Grid,
  Button,
  Card,
  CardContent,
  CardMedia,
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ecoImage from "../media/images/trees.png"; 
import ecoImage2 from "../media/images/tree_dead.png";
import ecoThumbImage from "../media/images/env1.jpg"; 
import financeImage from "../media/images/finance2.jpg";
import forestOwnerImage from "../media/images/forest_owner.jpg";
import sawmillImage from "../media/images/sawmill.jpg";
import creatorImage from "../media/images/4.png";
import customerImage from "../media/images/qr.jpg";
import { Link } from "react-router-dom";

import PublicIcon from "@mui/icons-material/Public";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import VerifiedIcon from "@mui/icons-material/Verified";
import BarChartIcon from "@mui/icons-material/BarChart";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

const SawmillGoOverview = () => {
  const [hovered, setHovered] = useState(false);

  const handleMouseEnter = () => setHovered(true);
  const handleMouseLeave = () => setHovered(false);

  return (
    <Container maxWidth="lg" style={{ padding: "40px 20px" }}>
      {/* Hero Section */}

      <Box
        className="cross-fade-image"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        sx={{
          backgroundImage: `url(${hovered ? ecoImage2 : ecoImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "20vh",
          borderRadius: "10px",
          transition: "background-image 3s ease-in-out",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      ></Box>

      {/* Problem & Solution Section */}
      <Grid
        className="fade-in-2"
        container
        spacing={4}
        style={{ marginTop: "40px", marginBottom: "40px" }}
      >
        <Grid item xs={12} md={6}>
          <Card style={{ height: "100%" }} elevation={6}>
            <CardContent>
              <Typography
                variant="h4"
                component="h2"
                gutterBottom
                style={{ backgroundColor: "#79c000", color: "white" }}
              >
                The Problem
              </Typography>
              <List>
                <ListItem>
                  <ListItemIcon>
                    <PublicIcon style={{ color: "#79c000" }} />
                  </ListItemIcon>
                  <ListItemText primary="Harmful Practices: Traditional logging practices damage ecosystems." />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <VisibilityOffIcon style={{ color: "#79c000" }} />
                  </ListItemIcon>
                  <ListItemText primary="Lack of Transparency: Customers are unaware of wood sustainability." />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <MonetizationOnIcon style={{ color: "#79c000" }} />
                  </ListItemIcon>
                  <ListItemText primary="Lost Value: Sustainable practices don’t always bring financial reward." />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card style={{ height: "100%" }} elevation={6}>
            <CardContent>
              <Typography
                variant="h4"
                component="h2"
                gutterBottom
                style={{ backgroundColor: "#79c000", color: "white" }}
              >
                The Solution
              </Typography>
              <List>
                <ListItem>
                  <ListItemIcon>
                    <VerifiedIcon style={{ color: "#79c000" }} />
                  </ListItemIcon>
                  <ListItemText primary="Verified Sustainability: Track the lifecycle from tree to product." />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <BarChartIcon style={{ color: "#79c000" }} />
                  </ListItemIcon>
                  <ListItemText primary="Data-Driven: Share real-time data with customers, from felling to finished product." />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <AttachMoneyIcon style={{ color: "#79c000" }} />
                  </ListItemIcon>
                  <ListItemText primary="Increase Profits: Add value through transparency and authenticity." />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Environmental & Financial Benefits */}
      <Grid
        className="fade-in-3"
        container
        spacing={4}
        style={{ marginBottom: "40px" }}
      >
        <Grid item xs={12} md={6}>
          <Card>
            <CardMedia
              component="img"
              height="200"
              image={ecoThumbImage} // Image representing eco-friendly practices
              alt="Eco-friendly forestry"
            />

            <CardContent>
              <Typography variant="h4" component="h2" gutterBottom>
                Environmental Benefits
              </Typography>
              <Typography variant="body1">
                Our system encourages sustainable forestry by verifying and
                promoting eco-friendly practices. Supporters can choose to
                purchase wood from forests that use responsible cutting methods,
                contributing to a healthier planet.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardMedia
              component="img"
              height="200"
              image={financeImage}
              alt="Financial Benefits"
            />
            <CardContent>
              <Typography variant="h4" component="h2" gutterBottom>
                Financial Benefits
              </Typography>
              <Typography variant="body1">
                By adding transparency and authenticity to the product's origin,
                forest owners and sawmills can charge more for their sustainable
                wood. This premium can be passed on through the value chain,
                benefiting the entire ecosystem.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* How It Works Section */}
      <Typography
        className="fade-in-4"
        variant="h4"
        component="h2"
        gutterBottom
        style={{ marginBottom: "20px" }}
      >
        How It Works
      </Typography>
      <Grid
        className="fade-in-4"
        container
        spacing={4}
        style={{ marginBottom: "40px" }}
      >
        {[
          {
            title: "Forest Owners",
            image: forestOwnerImage,
            text: "At the time of felling, essential tree data—such as GPS coordinates, species, images, and the reason for felling is recorded and stored.",
          },
          {
            title: "Sawmills",
            image: sawmillImage,
            text: "As logs are processed into planks, detailed data is recorded, including the exact location and drying information for each piece of wood.",
          },
          {
            title: "Creators",
            image: creatorImage,
            text: "Stock is assigned to a creator, who then documents the entire creation process, adding value and transparency to the final product.",
          },
          {
            title: "End Customers",
            image: customerImage,
            text: "Each finished product comes with a QR code linking to a detailed report, showcasing the creator’s work and all relevant sawmill data.",
          },
        ].map((step, index) => (
          <Grid item xs={12} md={3} key={index}>
            <Card sx={{ position: "relative" }}>
              {/* Number Circle */}
              <Box
                sx={{
                  position: "absolute",
                  top: "10px",
                  left: "10px",
                  width: "30px",
                  height: "30px",
                  backgroundColor: "#79c001",
                  color: "white",
                  borderRadius: "50%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontSize: "18px",
                  fontWeight: "bold",
                }}
              >
                {index + 1}
              </Box>

              {/* Image and Content */}
              <CardMedia
                component="img"
                height="200"
                image={step.image} // Dynamic images for each step
                alt={step.title}
              />
              <CardContent>
                <Typography variant="h6" component="h3" gutterBottom>
                  {step.title}
                </Typography>
                <Typography variant="body2">{step.text}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Testimonials Section */}
      <Typography
        variant="h4"
        component="h2"
        gutterBottom
        style={{ marginBottom: "20px" }}
      >
        Find out more
      </Typography>

      {/* Call to Action */}
      <Grid
        container
        justifyContent="center"
        style={{ marginTop: "20px", marginBottom: "20px" }}
      >
        <Button
          variant="contained"
          color="secondary"
          size="large"
          component={Link}
          to="/features"
        >
          System Features
        </Button>
      </Grid>
      <Typography variant="body1" paragraph>
        Placeholder for future case studies or testimonials from users who have
        benefited from SawmillGo.
      </Typography>
    </Container>
  );
};

export default SawmillGoOverview;
