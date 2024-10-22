import React, { useState } from 'react';
import { Container, Typography, Grid, Button, Card, CardContent, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useTheme } from '@mui/material/styles';

const SawmillGoOverview = () => {
  const theme = useTheme();
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Container maxWidth="lg" style={{ padding: '20px' }}>
      {/* Problem & Solution Section */}
      <Grid container spacing={4} style={{ marginBottom: '40px' }}>
        <Grid item xs={12}>
          <Typography variant="h4" component="h2" gutterBottom>
            Overview
          </Typography>
          <Typography variant="body1" paragraph>
            Learn how SawmillGo addresses transparency, environmental impact, and financial benefits in the forestry industry.
          </Typography>
        </Grid>
      </Grid>

      {/* Problem Section */}
      <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h5">The Problem</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="body1">
            Traditional forestry and logging practices can be harmful to ecosystems, and customers often lack transparency
            regarding the source and sustainability of the wood products they buy.
          </Typography>
        </AccordionDetails>
      </Accordion>

      {/* Solution Section */}
      <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h5">The Solution</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="body1">
            SawmillGo offers forest owners the ability to verify sustainable practices such as selective cutting and mixed-species forestry.
            It tracks and shares data throughout the process, offering transparency from tree to finished product.
          </Typography>
        </AccordionDetails>
      </Accordion>

      {/* Environmental & Financial Benefits */}
      <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h5">Environmental & Financial Benefits</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="body1">
            SawmillGo encourages sustainable forestry by verifying eco-friendly practices. This transparency allows forest owners and
            sawmills to charge more for their sustainable wood, with the premium benefiting the entire ecosystem.
          </Typography>
        </AccordionDetails>
      </Accordion>

      {/* How It Works Section */}
      <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h5">How It Works</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={2}>
            {['1. Forest Owners', '2. Sawmills', '3. Creators', '4. End Customers'].map((step, index) => (
              <Grid item xs={12} md={6} key={index}>
                <Card>
                  <CardContent>
                    <Typography variant="h6">{step}</Typography>
                    <Typography variant="body2">
                      Description of how {step.toLowerCase()} interacts with SawmillGo.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </AccordionDetails>
      </Accordion>

      {/* Call to Action */}
      <Grid container justifyContent="center" style={{ marginTop: '40px' }}>
        <Button variant="contained" color="primary" size="large">
          Get Involved
        </Button>
      </Grid>
    </Container>
  );
};

export default SawmillGoOverview;
