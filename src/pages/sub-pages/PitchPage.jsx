import React from "react";
import {
  Container,
  Typography,
  Box,
  Button,
  Grid,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import PublicIcon from "@mui/icons-material/Public";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import VerifiedIcon from "@mui/icons-material/Verified";
import BarChartIcon from "@mui/icons-material/BarChart";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import RoadmapSection from "./RoadmapSection";

const PitchPage = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      {/* 1. Core Message */}
      <Box textAlign="center" mb={8}>
        <Typography variant="h3" component="h1" gutterBottom>
          Transforming Forestry Through Transparency and Technology
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          SawmillGo empowers forest owners and creators by providing traceable
          data on every log and plank, promoting sustainable forestry practices.
        </Typography>
      </Box>

      {/* 2. The Problem / The Solution */}
      {/* <Grid container spacing={4} mb={8}>
                <Grid item xs={12} md={6}>
                    <Card elevation={6} sx={{ borderRadius: 2 }}>
                        <CardContent>
                            <Typography variant="h4" component="h2" gutterBottom sx={{ backgroundColor: '#79c000', color: 'white', p: 1 }}>
                                The Problem
                            </Typography>
                            <List>
                                <ListItem>
                                    <ListItemIcon><PublicIcon sx={{ color: '#79c000' }} /></ListItemIcon>
                                    <ListItemText primary="Harmful Practices: Traditional logging damages ecosystems." />
                                </ListItem>
                                <ListItem>
                                    <ListItemIcon><VisibilityOffIcon sx={{ color: '#79c000' }} /></ListItemIcon>
                                    <ListItemText primary="Lack of Transparency: Customers lack visibility into wood sustainability." />
                                </ListItem>
                                <ListItem>
                                    <ListItemIcon><MonetizationOnIcon sx={{ color: '#79c000' }} /></ListItemIcon>
                                    <ListItemText primary="Lost Value: Sustainable practices are not always financially rewarded." />
                                </ListItem>
                            </List>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} md={6}>
                    <Card elevation={6} sx={{ borderRadius: 2 }}>
                        <CardContent>
                            <Typography variant="h4" component="h2" gutterBottom sx={{ backgroundColor: '#79c000', color: 'white', p: 1 }}>
                                The Solution
                            </Typography>
                            <List>
                                <ListItem>
                                    <ListItemIcon><VerifiedIcon sx={{ color: '#79c000' }} /></ListItemIcon>
                                    <ListItemText primary="Verified Sustainability: Track wood from tree to product." />
                                </ListItem>
                                <ListItem>
                                    <ListItemIcon><BarChartIcon sx={{ color: '#79c000' }} /></ListItemIcon>
                                    <ListItemText primary="Data-Driven: Share real-time data with customers." />
                                </ListItem>
                                <ListItem>
                                    <ListItemIcon><AttachMoneyIcon sx={{ color: '#79c000' }} /></ListItemIcon>
                                    <ListItemText primary="Increase Profits: Add value through traceability and transparency." />
                                </ListItem>
                            </List>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid> */}

      {/* 4. Market Opportunity */}
      <Box mb={8}>
        <Typography variant="h4" gutterBottom>
          Market Opportunity
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          The global sustainable forestry market is valued at $317 billion, with
          the high-end custom furniture market projected to grow to $49 billion
          by 2031. SawmillGo aligns with both sectors by adding traceability and
          authenticity to wood products.
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          Over 50% of U.S. forestland is owned and managed by more than 10
          million private owners, with an average parcel size smaller than 25
          acres. This highlights the significant role of private forest owners
          in sustainable forestry practices.
          <a
            href="https://www.stateforesters.org/timber-assurance/legality/forest-ownership-statistics/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Source: State Foresters
          </a>
          .
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          The global portable sawmills market is expected to grow at a CAGR of
          4.5%, reaching USD 1.2 billion by 2030. This growth indicates
          increasing demand for portable sawmills among small-scale operators
          and private forest owners.
          <a
            href="https://industrygrowthinsights.com/report/portable-sawmills-market/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Source: Industry Growth Insights
          </a>
          .
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          The global sustainable forestry market is valued at $317 billion, with
          the high-end custom furniture market projected to grow to $49 billion
          by 2031. SawmillGo aligns with both sectors by adding traceability and
          authenticity to wood products.
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          Globally, 73% of forests are publicly owned, while 22% are under
          private ownership. Notably, the share of publicly owned forests has
          decreased since 1990, with private ownership on the rise. This shift
          underscores the increasing role of private entities in forest
          management.{" "}
          <a
            href="https://www.fao.org/interactive/forest-resources-assessment/2020/en/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Source: FAO Global Forest Resources Assessment 2020
          </a>
          .
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          In Europe, approximately 60% of forests are privately owned, with
          significant variations across countries. For instance, private
          ownership accounts for 98% of forests in Portugal, while Bulgaria has
          only 13% under private ownership. This diversity highlights the varied
          landscape of forest ownership in Europe.{" "}
          <a
            href="https://en.wikipedia.org/wiki/Private_forest"
            target="_blank"
            rel="noopener noreferrer"
          >
            Source: Wikipedia - Private Forest
          </a>
          .
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          In Sweden, forests cover about 70% of the land area, with private
          individuals owning approximately 50% of the forested land. This
          significant private ownership emphasizes the importance of sustainable
          practices among individual forest owners.{" "}
          <a
            href="https://www.skogsstyrelsen.se/en/about-forests/forest-facts/forest-ownership/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Source: Swedish Forest Agency
          </a>
          .
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          The global portable sawmills market is expected to grow at a CAGR of
          4.5%, reaching USD 1.2 billion by 2030. This growth indicates
          increasing demand for portable sawmills among small-scale operators
          and private forest owners.{" "}
          <a
            href="https://industrygrowthinsights.com/report/portable-sawmills-market/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Source: Industry Growth Insights
          </a>
          .
        </Typography>
      </Box>

      {/* 5. Revenue Model */}
      <Box mb={8}>
        <Typography variant="h4" gutterBottom>
          Revenue Model
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          SawmillGo’s revenue streams are designed to scale across different
          user segments, creating opportunities for growth at multiple levels of
          the forestry ecosystem. Our flexible model allows us to cater to both
          small-scale sawmill operators and large forestry networks, ensuring
          accessibility and long-term engagement.
        </Typography>

        <Typography variant="h5" gutterBottom>
          Core Revenue Streams
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          - **Subscriptions:** Monthly or annual subscription plans for
          sawmills, creators, and forest owners to access the core platform. -
          **Sawmill Stock Management Module:** A standalone product offering
          inventory and log tracking for sawmills, enabling precise stock
          control and traceability. - **Creator QR Code Diaries:** A separate
          module allowing creators to generate QR codes for products, linking
          them to transparent production diaries, boosting product authenticity.
          - **Tiered Plans:** Basic, Pro, and Enterprise tiers, offering
          progressively more features such as automated logging, enhanced
          analytics, and multi-user collaboration tools.
        </Typography>

        <Typography variant="h5" gutterBottom>
          Licensing & Long-Term Partnerships
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          - **Long-Term Leasing:** For larger sawmills and regional operators,
          SawmillGo will offer leasing options, allowing continuous access to
          the software at a fixed annual rate. - **Regional Government
          Licenses:** We plan to collaborate with regional governments and
          forestry agencies to provide licenses, encouraging local forest owners
          and sawmills to adopt sustainable practices through subsidized access
          to SawmillGo. - **Community Partnerships:** Partnerships with local
          forestry cooperatives and craft guilds can facilitate group licenses,
          enabling small-scale operators to share resources and collectively
          invest in sustainable technology.
        </Typography>

        <Typography variant="h5" gutterBottom>
          Value-Added Services
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          - **Custom Integrations:** Tailored solutions for large sawmill
          operations or forestry conglomerates, integrating SawmillGo’s tracking
          tools into existing enterprise systems. - **Training & Support:**
          Offering premium onboarding services, training workshops, and ongoing
          technical support to ensure seamless adoption of the platform. -
          **Data & Analytics:** Advanced reporting features and sustainability
          analytics, providing valuable insights to forest owners and creators
          about their production impact.
        </Typography>

        <Typography variant="body1" color="text.secondary" paragraph>
          By diversifying our revenue model, SawmillGo not only maximizes
          profitability but also strengthens its role in promoting sustainable
          forestry and supporting local economies.
        </Typography>
      </Box>

      {/* 6. Roadmap */}
      {/* <Box mb={8}>
        <Box textAlign="center" mb={6}>
          <Typography variant="h4" gutterBottom>
            Roadmap & Next Steps
          </Typography>
        </Box>

        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Card elevation={3} sx={{ borderRadius: 2 }}>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  Current Progress
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  ✅ MVP Completed – SawmillGo’s core software is developed and
                  ready for investment and testing.
                  <br />✅ Video Demonstrations – A series of videos showcasing
                  SawmillGo’s features are available.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card elevation={3} sx={{ borderRadius: 2 }}>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  2025 Key Milestones
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  🔹 Q1 2025 – Finalize MVP testing with user feedback.
                  <br />
                  🔹 Q2 2025 – Implement new features based on market and user
                  needs.
                  <br />
                  🔹 Q3 2025 – Launch pilot program with select sawmills and
                  creators.
                  <br />
                  🔹 Q4 2025 – Refine software and prepare for broader rollout.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box> */}

      {/* 7. Social & Environmental Impact */}
      <Box mb={8}>
        <Typography variant="h4" gutterBottom>
          Social & Environmental Impact
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          SawmillGo is dedicated to promoting sustainable forestry practices
          that benefit both the environment and rural communities. By providing
          transparent data on every log and plank, we empower forest owners and
          sawmill operators to adopt eco-friendly methods, ensuring the
          preservation of forests for future generations.
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          In Europe, rural areas host more than 55% of the overall population
          and embed unique cultural and natural heritage. Implementing
          technology-driven solutions like SawmillGo can play a crucial role in
          regenerating these areas by enhancing economic opportunities and
          preserving local traditions.{" "}
          <a
            href="https://www.academia.edu/58545295/Participatory_Process_for_Regenerating_Rural_Areas_through_Heritage_Led_Plans_The_RURITAGE_Community_Based_Methodology"
            target="_blank"
            rel="noopener noreferrer"
          >
            Source: Academia.edu
          </a>
          .
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          Sustainable forestry practices are essential for maintaining
          biodiversity, protecting water quality, and supporting the livelihoods
          of those who depend on forest resources. By adopting methods such as
          selective cutting and reduced impact logging, forest owners can ensure
          the long-term health and productivity of their forests.{" "}
          <a
            href="https://forestry.com/guides/forest-management-best-sustainable-practices/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Source: Forestry.com
          </a>
          .
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          The integration of digital technologies in rural areas has been shown
          to foster rural revitalization by improving access to information,
          enhancing productivity, and creating new economic opportunities.
          SawmillGo's platform facilitates the adoption of such technologies in
          the forestry sector, contributing to the overall development of rural
          communities.{" "}
          <a
            href="https://www.mdpi.com/2077-0472/14/11/1903"
            target="_blank"
            rel="noopener noreferrer"
          >
            Source: MDPI
          </a>
          .
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          By supporting small forest owners and local sawmill operators,
          SawmillGo contributes to the economic vitality of rural areas. Our
          platform enables these stakeholders to access broader markets, receive
          fair compensation for their sustainably harvested timber, and invest
          in the growth and development of their operations.
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          In summary, SawmillGo's commitment to transparency and sustainability
          not only aids in forest preservation but also plays a significant role
          in rural regeneration, supporting local economies, and promoting the
          adoption of technology in traditionally underserved areas.
        </Typography>
      </Box>

      {/* 8. Call to Action */}
      <Box textAlign="center" mt={8}>
        <Typography variant="h4" gutterBottom>
          Join Us in Building a Sustainable Future
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          Whether you're an investor, forest owner, or creator, your involvement
          can drive change in forestry. Let's shape a more transparent,
          sustainable future together.
        </Typography>
        <Box mt={3}>
          <Button variant="contained" color="primary" href="/contact">
            Get in Touch
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            href="/concept"
            sx={{ ml: 2 }}
          >
            Learn More
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default PitchPage;
