import React from 'react';
import { Container, Typography, Grid, Card, CardContent } from '@mui/material';

const AboutPage = () => {
  return (
    <Container maxWidth="md" style={{ padding: '40px 20px' }}>
      <Typography variant="h4" component="h1" gutterBottom>
        About Me
      </Typography>

      {/* Introduction */}
      <Card style={{ marginBottom: '20px' }}>
        <CardContent>
          <Typography variant="h5" component="h2">
            Introduction
          </Typography>
          <Typography variant="body1">
            I am a programmer, teacher, and woodworking enthusiast with a passion for sustainable forestry. I come from England, where I built a successful business in music for 15 years. Later, I moved to Stockholm, where I ran a recording studio and began teaching music. Eventually, I moved to the north of Sweden with my family, where we bought a farm with forests and farmland.
          </Typography>
        </CardContent>
      </Card>

      {/* Journey to SawmillGo */}
      <Card style={{ marginBottom: '20px' }}>
        <CardContent>
          <Typography variant="h5" component="h2">
            The Journey to SawmillGo
          </Typography>
          <Typography variant="body1">
            After moving to northern Sweden, I studied woodwork full-time for one year and then bought a sawmill. I became deeply involved in learning about Swedish forestry methods and sustainable practices. This connection to the land helped shape my approach to forestry. Through my own experiences, I understood that the real money in the forest industry often comes from clear-cutting large areas for forest companies, leaving sustainable practices undervalued.
          </Typography>
          <Typography variant="body1">
            This frustration, combined with my love for woodworking, led me to develop SawmillGo. This product comes from a place of need—both for forest owners like myself who want to treat their forests right, and for creators and carpenters who want to promote good forestry practices to their customers. I believe that small communities should be able to work together to get true value from their forests, and this product is designed to achieve that.
          </Typography>
        </CardContent>
      </Card>

      {/* Vision for SawmillGo */}
      <Card style={{ marginBottom: '20px' }}>
        <CardContent>
          <Typography variant="h5" component="h2">
            The Vision for SawmillGo
          </Typography>
          <Typography variant="body1">
            My vision for SawmillGo is to create a global system that promotes sustainable forestry and transparency. It’s designed to support small communities by helping them get value from their forests and local craftsmen. With features like QR code generation, stock management, and reporting systems, SawmillGo makes it easier for creators and forest owners to show the value of sustainable practices.
          </Typography>
        </CardContent>
      </Card>

      {/* Skills and Expertise */}
      <Card style={{ marginBottom: '20px' }}>
        <CardContent>
          <Typography variant="h5" component="h2">
            My Skills and Expertise
          </Typography>
          <Typography variant="body1">
            I transitioned into programming in 2020 when I studied at the Code Institute, where I developed my expertise in tools like React, Google Cloud, and Firestore. My background in running a business, teaching woodwork, and my passion for woodworking and craftsmanship have all contributed to my ability to build meaningful solutions like SawmillGo.
          </Typography>
        </CardContent>
      </Card>

      {/* Why SawmillGo Matters */}
      <Card style={{ marginBottom: '20px' }}>
        <CardContent>
          <Typography variant="h5" component="h2">
            Why SawmillGo Matters
          </Typography>
          <Typography variant="body1">
            SawmillGo not only provides transparency in the wood industry but also encourages sustainable forestry practices. It helps forest owners and creators promote selective cutting and responsible land use to their customers, contributing to both environmental conservation and better economic outcomes for small communities.
          </Typography>
        </CardContent>
      </Card>

      {/* Personal Note */}
      <Card style={{ marginBottom: '20px' }}>
        <CardContent>
          <Typography variant="h5" component="h2">
            A Personal Note
          </Typography>
          <Typography variant="body1">
            Building cabins, stables, and barns around our farm has given me a deep appreciation for craftsmanship. I also enjoy carving and fine woodwork, and working as a woodwork teacher since 2024 has been incredibly rewarding. I want to share my vision for SawmillGo, which I believe can make a real difference to both the environment and the local economies of small communities.
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
};

export default AboutPage;
