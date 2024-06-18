import React, { useContext, useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import UserContext from "../Contexts/UserContext"; // Adjust the import path as needed
import UserProfileForm from "../components/users/UserProfileForm";
import UserProfilesList from "../components/users/UserProfilesList";
import AddSawmillForm from "../components/sawmill/AddSawmillForm";
import TreeGauge from "./user-homepage/TreeGauge";
import LogGauge from "./user-homepage/LogGauge";
import PlankGauge from "./user-homepage/PlankGauge";
import WaterGauge from "./user-homepage/WaterGauge";
import LocationGauge from "./user-homepage/LocationGauge";
import MovementsGauge from "./user-homepage/Movements";
import ProjectGauge from "./user-homepage/ProjectGauge";
import SpeciesGauge from "./user-homepage/SpeicesGauge";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Flag } from "@mui/icons-material";
import FlagIcon from "../components/country-components/FlagIcon";
import SettingsIcon from "@mui/icons-material/Settings";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import AddSawmillGauge from "./user-homepage/AddSawmillGauge";
import KeyIcon from '@mui/icons-material/Key';

const UserHomePage = () => {
  // Access user information from context
  //   const { userProfile } = useContext(UserContext);
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
      {/* <Typography variant="h6" gutterBottom>
        {userInfo ? userInfo.displayName : "Not Available"}
        {userInfo?.country && <FlagIcon countryCode={userInfo.country} />}
      </Typography> */}

      {isCreator ? (
        <>
          <Grid item xs={12} border={"2px solid black"}>
            <Typography variant="h3" p={2}>
              {" "}
              * Creator Zone *{" "}
            </Typography>
            <Typography variant="h5" p={2}>
              {" "}
              This is where you manage your on going projects{" "}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            You Projects will be displayed here
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
        <Grid container>
          <Grid
            container
            item
            xs={12}
            p={1}
            mt={2}
            mb={2}
            borderRadius={3}
            border="solid black 1px"
            sx={{ backgroundColor: "#f5f5f5" }}
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
          </Grid>

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
          </Grid>

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
