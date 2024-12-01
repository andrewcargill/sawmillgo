import React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import UserProfileForm from "../components/users/UserProfileForm";
import UserProfileInfo from "../components/users/UserProfileInfo";

const UserProfilePage = () => {
  return (
    <>
      <UserProfileInfo />
      <UserProfileForm />
    </>
  );
};

export default UserProfilePage;
