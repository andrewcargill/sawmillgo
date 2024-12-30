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

  const introtext = "My name is Andrew Cargill. I am a musician from Bristol, England that moved to Stockholm, Sweden 15 years ago."
  const studytext = "In Stockholm I met my wife and six years we brought a farm in the north of Sweden. I studied carpentary and bought a sawmill, immersing myself in Swedish forestry. It was here that I saw the need for a platform like SawmillGo."
  const skillstext = "I realized that providing a transparent way to share sustainable forestry practices with end customers was essential, and software would be the key to achieving this. In 2020, I pursued programming studies at the Code Institute."
  const whytext = "While SawmillGo is still in development, each milestone brings us closer to launching a product that empowers forest owners and creators globally. This project is more than software—it's a movement toward sustainable forestry."
  const personaltext= "Building cabins, stables, and barns around our farm has given me a deep appreciation for craftsmanship. I also enjoy carving and fine woodwork, and working as a woodwork teacher since 2024 has been incredibly rewarding. I want to share my vision for SawmillGo, which I believe can make a real difference to both the environment and the local economies of small communities."


  return (
    <Container maxWidth="md" style={{ padding: "40px 20px" }}>
       
      <Typography variant="h4" component="h1" color="primary" gutterBottom>
       The Road to SawmillGo
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
