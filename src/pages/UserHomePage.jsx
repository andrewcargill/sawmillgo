import React, { useContext } from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import UserContext from "../Contexts/UserContext"; // Adjust the import path as needed
import UserProfileForm from "../components/users/UserProfileForm";
import UserProfilesList from "../components/users/UserProfilesList";

const UserHomePage = () => {
  // Access user information from context
  const { userProfile } = useContext(UserContext);

  console.log("UserProfile:", userProfile);

  return (
    <Grid container bgcolor={"lightblue"} padding={2}>
      <Typography variant="h1" gutterBottom>
        UserHomePage
      </Typography>
      <Typography variant="h6" gutterBottom>
        You are logged in!
      </Typography>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Typography variant="body1">
            Username: {userProfile ? userProfile.username : "Not Available"}
          </Typography>
        </Grid>
        <Grid item xs={12}>
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
        </Grid>
        <Grid item xs={12}>
          <UserProfileForm />
        </Grid>
        <Grid item xs={12}>
          <UserProfilesList />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default UserHomePage;
