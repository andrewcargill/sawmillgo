import React from "react";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import imageIntro from "../media/images/about_intro.webp";
import imageStudy from "../media/images/about_study.webp";
import imageSkills from "../media/images/about_skills.webp";
import imageWhy from "../media/images/about_why.webp";
import imagePersonal from "../media/images/about_personal.webp";
import ResponsiveCard from "../components/about-page/ResponsiveCard";

const AboutPage = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  const introtext = "My name is Andy Cargill. I am a programmer, teacher, and woodworking enthusiast passionate about sustainable forestry. Originally from England, I built a successful music business before moving to Stockholm to run a recording studio and teach. Now in northern Sweden, my family and I live on a farm surrounded by forests."
  const studytext = "After moving to northern Sweden, I studied woodwork for a year and bought a sawmill, immersing myself in Swedish forestry and sustainable practices. I realized the industry often prioritizes profit from clear-cutting over sustainability, leaving responsible methods undervalued. Frustrated but inspired by my love for woodworking, I developed SawmillGo to support forest owners and creators in promoting sustainable forestry. It empowers small communities to collaborate and gain real value from their forests."
  const skillstext = "I transitioned into programming in 2020 when I studied at the Code Institute, where I developed my expertise in tools like React, Google Cloud, and Firestore. My background in running a business, teaching woodwork, and my passion for woodworking and craftsmanship have all contributed to my ability to build meaningful solutions like SawmillGo."
  const whytext = "SawmillGo not only provides transparency in the wood industry but also encourages sustainable forestry practices. It helps forest owners and creators promote selective cutting and responsible land use to their customers, contributing to both environmental conservation and better economic outcomes for small communities."
  const personaltext= "Building cabins, stables, and barns around our farm has given me a deep appreciation for craftsmanship. I also enjoy carving and fine woodwork, and working as a woodwork teacher since 2024 has been incredibly rewarding. I want to share my vision for SawmillGo, which I believe can make a real difference to both the environment and the local economies of small communities."


  return (
    <Container maxWidth="md" style={{ padding: "40px 20px" }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Passion, drive and the future.
      </Typography>

{/* Introduction */}
      <div>
      <ResponsiveCard
        image={imageIntro}
        text={introtext}
        title="Introduction"
        imagePosition="left"
      />
    </div>

      {/* Journey to SawmillGo */}
      <div>
      <ResponsiveCard
        image={imageStudy}
        text={studytext}
        title="Journey to SawmillGo"
        imagePosition="right" 
      />
    </div>

      {/* Skills */}
      <div>
      <ResponsiveCard
        image={imageSkills}
        text={skillstext}
        title="My Skills and Experience"
        imagePosition="left"
      />
    </div>
      {/* Why */}
      <div>
      <ResponsiveCard
        image={imageWhy}
        text={whytext}
        title="Why SawmillGo Matters"
        imagePosition="right"
      />
    </div>
      {/* Personal */}
      <div>
      <ResponsiveCard
        image={imagePersonal}
        text={personaltext}
        title="A Personal Note"
        imagePosition="left"
      />
    </div>

     
    </Container>
  );
};

export default AboutPage;
