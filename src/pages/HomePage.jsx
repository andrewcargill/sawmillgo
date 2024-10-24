import React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { Button, Container, CardMedia } from "@mui/material";
import hero from "../media/images/home_hero2.webp";
import { useTheme } from "@mui/material/styles";
import { Link } from "react-router-dom";


const HomePage = () => {
  const theme = useTheme();
  const image1 = hero;

  return (
    <Container maxWidth="lg" style={{ padding: '20px' }}>
      {/* Hero Section */}
      <Grid container spacing={4} alignItems="center" style={{ marginBottom: '40px' }}>
        <Grid item xs={12} md={6}>
          <Typography variant="h2" component="h1" gutterBottom className="fade-in-2">
            Welcome to SawmillGo
          </Typography>
          <Typography variant="h6" paragraph className="fade-in-5">
            Data-driven forestry for a sustainable future.
          </Typography>
          <Typography variant="body1" paragraph className="fade-in-3">
            SawmillGo empowers forest owners, sawmills, and creators to enhance transparency and authenticity through verified data. 
            Our system supports sustainable practices, giving stakeholders the tools they need to increase both environmental impact and profitability.
          </Typography>
          <Button
              component={Link}
              to="/concept"
              variant="contained"
              color="primary"
              size="large"
              className="fade-in-4"
            >
              discover more
          </Button>
        </Grid>
        <Grid item xs={12} md={6}>
          <CardMedia
            component="img"
            image={image1}
            alt="SawmillGo Overview"
            className="fade-in-1"
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default HomePage;
