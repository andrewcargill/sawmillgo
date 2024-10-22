import React from 'react';
import { Container, Typography, Grid, Button, Card, CardContent, CardMedia } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import hero from '../media/images/home_hero2.webp'

const SawmillGoOverview = () => {
  const theme = useTheme();
  const image1 = hero

  return (
    <Container maxWidth="lg" style={{ padding: '20px' }}>
      {/* Problem & Solution Section */}
      <Grid container spacing={4} style={{ marginBottom: '40px' }}>
        <Grid item xs={12} md={6}>
          <Typography variant="h4" component="h2" gutterBottom>
            The Problem
          </Typography>
          <Typography variant="body1" paragraph>
            Traditional forestry and logging practices can be harmful to ecosystems, and customers often lack transparency 
            regarding the source and sustainability of the wood products they buy.
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h4" component="h2" gutterBottom>
            The Solution
          </Typography>
          <Typography variant="body1" paragraph>
            SawmillGo offers forest owners the ability to verify sustainable practices such as selective cutting and mixed-species forestry.
            It tracks and shares data throughout the process, offering transparency from tree to finished product.
          </Typography>
        </Grid>
      </Grid>

      {/* Environmental & Financial Benefits Section */}
      <Grid container spacing={4} style={{ marginBottom: '40px' }}>
        <Grid item xs={12} md={6}>
          <Typography variant="h4" component="h2" gutterBottom>
            Environmental Benefits
          </Typography>
          <Typography variant="body1" paragraph>
            Our system encourages sustainable forestry by verifying and promoting eco-friendly practices. Supporters can choose to purchase 
            wood from forests that use responsible cutting methods, contributing to a healthier planet.
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h4" component="h2" gutterBottom>
            Financial Benefits
          </Typography>
          <Typography variant="body1" paragraph>
            By adding transparency and authenticity to the product's origin, forest owners and sawmills can charge more for their sustainable wood. 
            This premium can be passed on through the value chain, ultimately benefiting the entire ecosystem.
          </Typography>
        </Grid>
      </Grid>

      {/* How It Works Section */}
      <Typography variant="h4" component="h2" gutterBottom style={{ marginBottom: '20px' }}>
        How It Works
      </Typography>
      <Grid container spacing={4} style={{ marginBottom: '40px' }}>
        {['1. Forest Owners', '2. Sawmills', '3. Creators', '4. End Customers'].map((step, index) => (
          <Grid item xs={12} md={3} key={index}>
            <Card>
              <CardContent>
                <Typography variant="h6" component="h3" gutterBottom>
                  {step}
                </Typography>
                <Typography variant="body2">
                  {`Placeholder description for ${step.toLowerCase()} and how they interact with SawmillGo.`}
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
      <Grid container spacing={4}>
        {['Testimonial 1', 'Testimonial 2'].map((testimonial, index) => (
          <Grid item xs={12} md={6} key={index}>
            <Card>
              <CardContent>
                <Typography variant="h6" component="h3" gutterBottom>
                  {testimonial}
                </Typography>
                <Typography variant="body2">
                  {`Placeholder testimonial text for ${testimonial.toLowerCase()}.`}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Call to Action Section */}
      <Grid container justifyContent="center" style={{ marginTop: '40px' }}>
        <Button variant="contained" color="secondary" size="large">
          Get Involved
        </Button>
      </Grid>
    </Container>
  );
};

export default SawmillGoOverview;
