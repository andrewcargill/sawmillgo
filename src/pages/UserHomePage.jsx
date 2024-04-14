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

const UserHomePage = () => {
  // Access user information from context
//   const { userProfile } = useContext(UserContext);
const [userInfo, setUserInfo] = useState(null);


  useEffect(() => {
    // fetch user data from local storage
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
        setUserInfo(user);
    }
    }, []);


  return (
    <Grid container padding={2}>
      <Typography variant="h4" gutterBottom>
        Welcome {userInfo ? userInfo.displayName : "Not Available"}
      </Typography>
 
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

        {/* <Grid item xs={12}>
          <Typography variant="body1">
            Sawmill: {userProfile ? userProfile.sawmillName : "Not Available"}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body1">
            Role: {userProfile ? userProfile.role : "Not Available"}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body1">
            About: {userProfile ? userProfile.about : "Not Available"}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body1">
            Email: {userProfile ? userProfile.email : "Not Available"}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body1">
            Joined: {userProfile ? userProfile.creationTime : "Not Available"}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body1">
            ID: {userProfile ? userProfile.id : "Not Available"}
          </Typography>
        </Grid> */}
        <Grid item xs={12}>
          <AddSawmillForm />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default UserHomePage;
