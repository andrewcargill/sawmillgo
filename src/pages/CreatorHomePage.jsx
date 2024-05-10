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

const CreatorHomePage = () => {
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
    }


  return (


    <Grid container padding={2}>
      <Typography variant="h4" gutterBottom>
        Welcome {userInfo ? userInfo.displayName : "Not Available"}
        {userInfo?.country && <FlagIcon countryCode={userInfo.country} />}

      </Typography>

      {isCreator ? (
      <>
      <Grid item xs={12} border={'2px solid black'}> 
      <Typography variant="h3" p={2}> * Creator Zone * </Typography>
      <Typography variant="h5" p={2}> This is where you manage your on going projects </Typography>
      
      </Grid>
      <Grid item xs={12}>
        You Projects will be displayed here
        </Grid>
      <Grid item xs={12} p={3}>
        <Button variant="contained" color="primary" onClick={profileButtonClick}> View & Update your profile</Button>
        </Grid>
      </>
      ) : (
 
      <Grid container spacing={1}>
        <Grid container item xs={12} spacing={1}>
          <Grid item xs={6} md={3}>
            <TreeGauge />
          </Grid>
          <Grid item xs={6} md={3}>
            <LogGauge />
          </Grid>
          <Grid item xs={6} md={3}>
            <PlankGauge />
          </Grid>
          <Grid item xs={6} md={3}>
            <WaterGauge />
          </Grid>
        </Grid>
        <Grid container item xs={12} spacing={1}>
        <Grid item xs={6} md={3}>
            <LocationGauge />
          </Grid>
          <Grid item xs={6} md={3}>
            <MovementsGauge />
          </Grid>
          <Grid item xs={6} md={3}>
            <ProjectGauge />
          </Grid>
          <Grid item xs={6} md={3}>
            <SpeciesGauge />
          </Grid>
       
        </Grid>

        <Grid item xs={12}>
          <AddSawmillForm />
        </Grid>
      </Grid>
      )}
    </Grid>
  );
};

export default CreatorHomePage;
