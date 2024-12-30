import React from "react";
import { Link } from "react-router-dom";
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
import BarChartIcon from "@mui/icons-material/BarChart";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import VerifiedIcon from "@mui/icons-material/Verified";
import forestImage from "../../media/images/forest1.webp";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import PublicIcon from "@mui/icons-material/Public";
import GavelIcon from "@mui/icons-material/Gavel";
import PeopleIcon from "@mui/icons-material/People";
import Divider from "@mui/material/Divider";


const PitchPage = () => {
  return (
    <>
      {/* Hero Section with Overlay */}
      <Box
        sx={{
          position: "relative",
          backgroundImage: `url(${forestImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          color: "#fff",
          py: 12,
          textAlign: "center",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)", // Dark overlay
          }}
        />
        <Container sx={{ position: "relative" }}>
          <Typography variant="h2" gutterBottom fontWeight="700">
            Join Us in Building a Sustainable Future
          </Typography>
          <Typography variant="h6" sx={{ maxWidth: 800, margin: "auto" }}>
            Your involvement can drive change in forestry. Let's shape a more transparent, sustainable future together. By joining us at this stage, you play a key role in shaping SawmillGo and the sustainable forestry market.
          </Typography>
          <Box mt={4}>
            <Button variant="contained" color="primary" sx={{ mx: 2 }}
             component={Link}
             to="/contact">
              Get in Touch
            </Button>
            <Button variant="outlined" color="secondary" component={Link}
            to="/project">
              Learn More
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Market Opportunity Section */}
      <Container maxWidth="lg" sx={{ py: 10 }}>
        <Grid container spacing={6} alignItems="center">
          {/* Left Column - Text */}
          <Grid item xs={12} md={7}>
            <Typography variant="h4" gutterBottom>
              Market Opportunity
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
              The global sustainable forestry market is valued at $317 billion, with the high-end custom furniture market projected to grow to $49 billion by 2031. SawmillGo aligns with both sectors by adding traceability and authenticity to wood products.
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
              Over 50% of U.S. forestland is owned by more than 10 million private owners, highlighting their significant role in sustainable forestry.
              <a href="https://www.stateforesters.org/" target="_blank" rel="noopener noreferrer">
                Source: State Foresters
              </a>
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
              The global portable sawmills market is expected to grow at a CAGR of 4.5%, reaching USD 1.2 billion by 2030.
              <a href="https://industrygrowthinsights.com/" target="_blank" rel="noopener noreferrer">
                Source: Industry Growth Insights
              </a>
            </Typography>
          </Grid>

          {/* Right Column - Insights */}
          <Grid item xs={12} md={5}>
            <Card elevation={3} sx={{ borderRadius: 2 }}>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  Key Market Insights
                </Typography>
                <List>
                  <ListItem>
                    <ListItemIcon>
                      <BarChartIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText primary="Sustainable Forestry Market - $317 Billion" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <AttachMoneyIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText primary="High-End Furniture Market - $49 Billion by 2031" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <VerifiedIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText primary="Portable Sawmill Market - $1.2 Billion by 2030" />
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Revenue Model Section */}
      <Box textAlign="center" mb={8} mt={8}>
        <Typography variant="h4" gutterBottom>
          Revenue Model
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          SawmillGo’s revenue model scales across different forestry stakeholders. By providing flexible options, we ensure accessibility for small sawmills while supporting large-scale operators.
        </Typography>
      </Box>

      <Grid container spacing={6} alignItems={'stretch'}>
       {/* Core Revenue Streams */}
<Grid item xs={12} md={6} sx={{ display: 'flex' }}>
  <Card elevation={3} sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
    <CardContent>
      <Typography variant="h5" gutterBottom>
        Core Revenue Streams
      </Typography>
      <List>
        <ListItem>
          <ListItemIcon>
            <MonetizationOnIcon color="primary" />
          </ListItemIcon>
          <ListItemText
            primary="Subscriptions"
            secondary="Monthly or annual plans designed specifically for small sawmills, forest owners, and creators."
          />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <VerifiedIcon color="primary" />
          </ListItemIcon>
          <ListItemText
            primary="Stock Management Module"
            secondary="Affordable inventory and log tracking solutions tailored for small sawmills."
          />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <PublicIcon color="primary" />
          </ListItemIcon>
          <ListItemText
            primary="Creator QR Code Diaries"
            secondary="Tools for creators to document and share the journey of finished products, enhancing transparency and value."
          />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <PeopleIcon color="primary" />
          </ListItemIcon>
          <ListItemText
            primary="Education"
            secondary="Offering remote training to help small sawmills and creators adopt the platform."
          />
        </ListItem>
      </List>
    </CardContent>
  </Card>
</Grid>

{/* Licensing & Partnerships */}
<Grid item xs={12} md={6} sx={{ display: 'flex' }}>
  <Card elevation={3} sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
    <CardContent>
      <Typography variant="h5" gutterBottom>
        Licensing & Partnerships
      </Typography>
      <List>
        <ListItem>
          <ListItemIcon>
            <GavelIcon color="primary" />
          </ListItemIcon>
          <ListItemText
            primary="Regional Government Licenses"
            secondary="Facilitating subsidized access to SawmillGo for small forest owners and sawmills through local government initiatives."
          />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <PeopleIcon color="primary" />
          </ListItemIcon>
          <ListItemText
            primary="Community Partnerships"
            secondary="Group licenses and shared resources for local forestry cooperatives and small sawmill collectives."
          />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <PeopleIcon color="primary" />
          </ListItemIcon>
          <ListItemText
            primary="Project Management & Education"
            secondary="Offering on-site and remote training to help small sawmills and creators adopt the platform, fostering collaboration between forest owners, sawmills, and craftspeople."
          />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <PeopleIcon color="primary" />
          </ListItemIcon>
          <ListItemText
            primary="Local Adoption Initiatives"
            secondary="Driving adoption by connecting forest owners with local creators and small sawmills, promoting regional economic growth through sustainable forestry."
          />
        </ListItem>
      </List>
    </CardContent>
  </Card>
</Grid>

      </Grid>

      {/* Social & Environmental Impact Section */}
      <Box textAlign="center" mt={12} mb={8}>
        <Typography variant="h4" gutterBottom>
          Social & Environmental Impact
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          SawmillGo promotes sustainable forestry while strengthening rural communities through economic and technological empowerment.
        </Typography>
      </Box>

      <Grid container spacing={6}>
        {/* Environmental Impact */}
        <Grid item xs={12} md={6}>
          <Card elevation={4}>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Environmental Impact
              </Typography>
              <Typography variant="body1" color="text.secondary" paragraph>
                By providing verified data on every log and plank, SawmillGo empowers forest owners to adopt sustainable practices, reducing deforestation and promoting biodiversity.
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Typography variant="body2" color="text.secondary">
                <a
                  href="https://forestry.com/guides/forest-management-best-sustainable-practices/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Source: Forestry.com
                </a>
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Rural Regeneration */}
        <Grid item xs={12} md={6}>
          <Card elevation={4}>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Rural Regeneration
              </Typography>
              <Typography variant="body1" color="text.secondary" paragraph>
                SawmillGo fosters economic growth by connecting rural sawmill operators and creators to wider markets, enhancing income through sustainable timber practices.
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Typography variant="body2" color="text.secondary">
                <a
                  href="https://www.mdpi.com/2077-0472/14/11/1903"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Source: MDPI
                </a>
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Cultural & Technological Growth */}
        <Grid item xs={12}>
          <Card elevation={4}>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Cultural & Technological Growth
              </Typography>
              <Typography variant="body1" color="text.secondary" paragraph>
                Rural areas host over 55% of Europe’s population. SawmillGo introduces digital tools to preserve local traditions while boosting productivity through tech.
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Typography variant="body2" color="text.secondary">
                <a
                  href="https://www.academia.edu/58545295/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Source: Academia.edu
                </a>
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      </Container>
    </>
  );
};

export default PitchPage;
