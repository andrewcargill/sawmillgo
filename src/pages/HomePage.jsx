import React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { Button, Container, CardMedia } from "@mui/material";
import hero from "../media/images/home_hero2.webp";
import { useTheme } from "@mui/material/styles";

const HomePage = () => {
  const theme = useTheme();
  const image1 = hero


  return (
    <Container maxWidth="lg" style={{ padding: '20px' }}>
    {/* Hero Section */}
    <Grid container spacing={4} alignItems="center" style={{ marginBottom: '40px' }}>
      <Grid item xs={12} md={6}>
        <Typography variant="h2" component="h1" gutterBottom>
          Welcome to SawmillGo
        </Typography>
        <Typography variant="body1" paragraph>
          SawmillGo empowers forest owners, sawmills, and creators by providing transparency and authenticity through verified data. 
          Support sustainable forestry practices while increasing profits.
        </Typography>
        <Button variant="contained" color="primary" size="large">
          Get Started
        </Button>
      </Grid>
      <Grid item xs={12} md={6}>
        {/* Placeholder Image */}
        <CardMedia
          component="img"
          image={image1}
          alt="SawmillGo Overview"
        />
      </Grid>
    </Grid>

  </Container>
  );
};

export default HomePage;
