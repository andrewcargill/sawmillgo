import React from 'react';
import { Container, Typography, Grid, Button, Card, CardContent, CardMedia, Box } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ecoImage from '../media/images/trees.png'; // Example image imports
import ecoThumbImage from '../media/images/env1.jpg'; // Example image imports
import financeImage from '../media/images/finance2.jpg';
import forestOwnerImage from '../media/images/forest_owner.jpg';
import sawmillImage from '../media/images/sawmill.jpg';
import creatorImage from '../media/images/4.png';
import customerImage from '../media/images/qr.jpg';

const SawmillGoOverview = () => {
  return (
    <Container maxWidth="lg" style={{ padding: '40px 20px' }}>
      {/* Hero Section */}
      <Box
        sx={{
          backgroundImage: `url(${ecoImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '20vh',
          borderRadius: '10px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {/* <Typography
          variant="h2"
          component="h1"
          style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', padding: '10px', borderRadius: '10px' }}
        >
          Welcome to SawmillGo
        </Typography> */}
      </Box>

      {/* Problem & Solution Section */}
      <Grid container spacing={4} style={{ marginTop: '40px', marginBottom: '40px' }}>
        <Grid item xs={12} md={6}>
          <Card style={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h4" component="h2" gutterBottom>
                The Problem
              </Typography>
              <Typography variant="body1">
                Traditional forestry and logging practices can be harmful to ecosystems, and customers often lack transparency 
                regarding the source and sustainability of the wood products they buy.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card style={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h4" component="h2" gutterBottom>
                The Solution
              </Typography>
              <Typography variant="body1">
                SawmillGo offers forest owners the ability to verify sustainable practices such as selective cutting and mixed-species forestry.
                It tracks and shares data throughout the process, offering transparency from tree to finished product.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Environmental & Financial Benefits */}
      <Grid container spacing={4} style={{ marginBottom: '40px' }}>
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
                Our system encourages sustainable forestry by verifying and promoting eco-friendly practices.
                Supporters can choose to purchase wood from forests that use responsible cutting methods, contributing to a healthier planet.
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
                By adding transparency and authenticity to the product's origin, forest owners and sawmills can charge more for their sustainable wood. 
                This premium can be passed on through the value chain, benefiting the entire ecosystem.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* How It Works Section */}
      <Typography variant="h4" component="h2" gutterBottom style={{ marginBottom: '20px' }}>
        How It Works
      </Typography>
      <Grid container spacing={4} style={{ marginBottom: '40px' }}>
        {[
         { 
          title: 'Forest Owners', 
          image: forestOwnerImage, 
          text: 'At the time of felling, essential tree data—such as GPS coordinates, species, images, and the reason for felling—is recorded and stored.' 
        },
        { 
          title: 'Sawmills', 
          image: sawmillImage, 
          text: 'As logs are processed into planks, detailed data is recorded, including the exact location and drying information for each piece of wood.' 
        },
        { 
          title: 'Creators', 
          image: creatorImage, 
          text: 'Stock is assigned to a creator, who then documents the entire creation process, adding value and transparency to the final product.' 
        },
        { 
          title: 'End Customers', 
          image: customerImage, 
          text: 'Each finished product comes with a QR code linking to a detailed report, showcasing the creator’s work and all relevant sawmill data.' 
        },
        
        ].map((step, index) => (
          <Grid item xs={12} md={3} key={index}>
            <Card>
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
                <Typography variant="body2">
                  {step.text}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Testimonials Section */}
      <Typography variant="h4" component="h2" gutterBottom style={{ marginBottom: '20px' }}>
        Testimonials & Case Studies
      </Typography>
      <Typography variant="body1" paragraph>
        Placeholder for future case studies or testimonials from users who have benefited from SawmillGo.
      </Typography>

      {/* Call to Action */}
      <Grid container justifyContent="center" style={{ marginTop: '40px' }}>
        <Button variant="contained" color="secondary" size="large">
          Get Involved
        </Button>
      </Grid>
    </Container>
  );
};

export default SawmillGoOverview;
