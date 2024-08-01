import React, { useContext, useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import UserContext from "../Contexts/UserContext"; // Adjust the import path as needed
import { Button, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import FlagIcon from "../components/country-components/FlagIcon";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import SettingsIcon from "@mui/icons-material/Settings";
import KeyIcon from "@mui/icons-material/Key";
import TreeGauge from "./user-homepage/TreeGauge";
import LogGauge from "./user-homepage/LogGauge";
import PlankGauge from "./user-homepage/PlankGauge";
import ProjectGauge from "./user-homepage/ProjectGauge";
import UserProfileGauge from "./user-homepage/UserProfileGauge";
import LocationsGauge from "./user-homepage/LocationsGauge";
import DryingGauge from "./user-homepage/DryingGauge";
import ContactsGauge from "./user-homepage/ContactsGauge";
import LocationGauge from "./user-homepage/LocationGauge";
import SpeciesGauge from "./user-homepage/SpeicesGauge";
import SawmillProfileGauge from "./user-homepage/SawmillProfileGauge";
import TreeAgeGauge from "./user-homepage/TreeAgeGauge";
import UsersGauge from "./user-homepage/UsersGauge";
import AddSawmillGauge from "./user-homepage/AddSawmillGauge";
import StockSearchWidget from "../components/components-for-dev/dashboard/widgets/StockSearchWidget";
import TreesWidget from "../components/components-for-dev/dashboard/widgets/TreesWidget";
import LogsWidget from "../components/components-for-dev/dashboard/widgets/LogsWidget";
import PlanksWidgetNew from "../components/components-for-dev/dashboard/widgets/PlanksWidgetNew";
import StockLevelsWidget from "../components/components-for-dev/dashboard/widgets/StockLevelsWidget";
import ProjectStatusWidget from "../components/components-for-dev/dashboard/widgets/ProjectStatusWidget";
import ProjectDeadlinesWidget from "../components/components-for-dev/dashboard/widgets/ProjectDeadlinesWidget";
import Carousel from "react-material-ui-carousel"; // Import the carousel
import DashboardIcon from "@mui/icons-material/Dashboard";
import ParkIcon from "@mui/icons-material/Park";

const UserHomePage = () => {
  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // fetch user data from local storage
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setUserInfo(user);
      console.log("user info: ", user);
    }
  }, []);

  const isCreator = userInfo && userInfo.role === "creator";

  const profileButtonClick = () => {
    const encodedUsername = encodeURIComponent(userInfo.username);
    navigate(`/creatorprofile/${encodedUsername}`);
  };

  return (
    <Grid container padding={2}>
      {isCreator ? (
        <>
          <Grid item xs={12} border={"2px solid black"}>
            <Typography variant="h3" p={2}>
              {" "}
              * Creator Zone *{" "}
            </Typography>
            <Typography variant="h5" p={2}>
              {" "}
              This is where you manage your ongoing projects{" "}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            Your Projects will be displayed here
          </Grid>
          <Grid item xs={12} p={3}>
            <Button
              variant="contained"
              color="primary"
              onClick={profileButtonClick}
            >
              {" "}
              View & Update your profile
            </Button>
          </Grid>
        </>
      ) : (
        <Grid container spacing={2}>
          {/* Stock Search Widget */}
          <Grid item container xs={12} md={6} p={1} mt={2} mb={2}>
            <Grid item xs={12} mb={2}>
              <StockSearchWidget />
            </Grid>

            {/* Modules Section */}
            <Grid
              container
              item
              xs={12}
              p={1}
              mt={2}
              mb={2}
              borderRadius={3}
              border="solid #79c000 5px"
            >
              <Grid item container xs={12} p={1} alignContent={"flex-start"}>
                <ViewModuleIcon fontSize="large" />
                <Typography variant="body1" p={1}>
                  {" "}
                  Quick Add{" "}
                </Typography>
              </Grid>

              <Grid item container justifyContent={"space-around"} p={1}>

          
                {/* <TreeGauge /> */}
                <Button
               component="label"
               role={undefined}
               variant="contained"
               tabIndex={-1}
               startIcon={<ParkIcon />}
               size="large"
               color="dark"
                >
                  Tree
                </Button>
            
                {/* <LogGauge /> */}
                <Button
                 component="label"
                 role={undefined}
                 variant="contained"
                 tabIndex={-1}
                 startIcon={<ParkIcon />}
                 size="large"
                 color="dark"
                >
                  Log
                </Button>
             
              
                {/* <PlankGauge /> */}
                <Button
                  component="label"
                  role={undefined}
                  variant="contained"
                  tabIndex={-1}
                  startIcon={<ParkIcon />}
                  size="large"
                  color="dark"
                >
                  Plank
                </Button>
           
            
                {/* <ProjectGauge /> */}
                <Button
                  component="label"
                  role={undefined}
                  variant="contained"
                  tabIndex={-1}
                  startIcon={<ParkIcon />}
                  size="large"
                  color="dark"
                >
                  Project
                </Button>
                </Grid>
           
            </Grid>
          </Grid>

          {/* Carousel Section */}
          <Grid item xs={12} md={6} p={1} mt={2} mb={2}>
            <Paper elevation={3}>
              {/* Carousel with pages */}
              <Grid item container xs={12} p={1} alignContent={"flex-start"}>
                <DashboardIcon fontSize="large" />
                <Typography variant="body1" p={1}>
                  {" "}
                  Dashboard{" "}
                </Typography>
              </Grid>
              <Carousel
                animation="slide"
                navButtonsAlwaysVisible={true}
                indicators={true} // Show dots for navigation
                cycleNavigation={true} // Enable cycling through slides
                autoPlay={false} // Disable auto-play
                height={"450px"}
              >
                {/* Page 1: General Widgets */}
                <Grid container spacing={2} padding={2}>
                  <Grid item xs={6} sm={4} md={6}>
                    <TreesWidget />
                  </Grid>
                  <Grid item xs={6} sm={4} md={6}>
                    <LogsWidget />
                  </Grid>
                  <Grid item xs={6} sm={4} md={6}>
                    <PlanksWidgetNew />
                  </Grid>
                </Grid>

                {/* Page 2: Stock and Projects Widgets */}
                <Grid container spacing={2} padding={2}>
                  <Grid item xs={6} sm={4} md={6}>
                    <StockLevelsWidget />
                  </Grid>
                  <Grid item xs={6} sm={4} md={6}>
                    <ProjectStatusWidget />
                  </Grid>
                  <Grid item xs={12} md={12}>
                    <ProjectDeadlinesWidget />
                  </Grid>
                </Grid>
              </Carousel>
            </Paper>
          </Grid>

          {/* Modules Section */}
          <Grid
            container
            item
            xs={12}
            p={1}
            mt={2}
            mb={2}
            borderRadius={3}
            border="solid #79c000 5px"
          >
            <Grid item container xs={12} p={1} alignContent={"flex-start"}>
              <ViewModuleIcon fontSize="large" />
              <Typography variant="body1" p={1}>
                {" "}
                Modules{" "}
              </Typography>
            </Grid>

            <Grid item xs={6} md={2} p={1}>
              <TreeGauge />
            </Grid>
            <Grid item xs={6} md={2} p={1}>
              <LogGauge />
            </Grid>
            <Grid item xs={6} md={2} p={1}>
              <PlankGauge />
            </Grid>
            <Grid item xs={6} md={2} p={1}>
              <ProjectGauge />
            </Grid>
            <Grid item xs={6} md={2} p={1}>
              <UserProfileGauge />
            </Grid>
            <Grid item xs={6} md={2} p={1}>
              <LocationsGauge />
            </Grid>
            <Grid item xs={6} md={2} p={1}>
              <DryingGauge />
            </Grid>
            <Grid item xs={6} md={2} p={1}>
              <ContactsGauge />
            </Grid>
          </Grid>

          {/* Sawmill Settings Section */}
          <Grid
            container
            borderRadius={3}
            item
            xs={12}
            p={1}
            mt={2}
            mb={2}
            border="solid black 1px"
          >
            <Grid item container xs={12} p={1} alignContent={"flex-start"}>
              <SettingsIcon fontSize="large" />
              <Typography variant="body1" p={1}>
                {" "}
                Sawmill Settings{" "}
              </Typography>
            </Grid>
            <Grid item xs={6} sm={3} md={3} lg={2} p={1}>
              <LocationGauge />
            </Grid>
            <Grid item xs={6} sm={3} md={3} lg={2} p={1}>
              <SpeciesGauge />
            </Grid>
            <Grid item xs={6} sm={3} md={3} lg={2} p={1}>
              <SawmillProfileGauge />
            </Grid>
            <Grid item xs={6} sm={3} md={3} lg={2} p={1}>
              <TreeAgeGauge />
            </Grid>
            <Grid item xs={6} sm={3} md={3} lg={2} p={1}>
              <UsersGauge />
            </Grid>
          </Grid>

          {/* Superuser Settings Section */}
          <Grid
            container
            borderRadius={3}
            item
            xs={12}
            p={1}
            mt={2}
            mb={2}
            border="solid black 1px"
          >
            <Grid item container xs={12} p={1} alignContent={"flex-start"}>
              <KeyIcon fontSize="large" />
              <Typography variant="body1" p={1}>
                {" "}
                Superuser Settings{" "}
              </Typography>
            </Grid>
            <Grid item xs={6} sm={3} md={3} lg={2} p={1}>
              <AddSawmillGauge />
            </Grid>
          </Grid>
        </Grid>
      )}
    </Grid>
  );
};

export default UserHomePage;
