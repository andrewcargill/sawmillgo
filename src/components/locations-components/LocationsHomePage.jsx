import React from "react";
import AddLocationForm from "./AddLocationForm";
import AreasMap from "./AreasMap";
import LocationsTable from "./LocationsTable";
import { Button, Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";

const LocationsHomePage = () => {

    const navigate = useNavigate();

    const handleAddLocationClick = () => {
        navigate("/add-location");
        
      };

  return (
    <Grid container spacing={2} p={2}>
      <Grid container item xs={12}>
        <Grid xs={6} sm={10} container item justifyContent={"start"}>
          <Typography variant="h4" color="initial">
            Locations
          </Typography>
        </Grid>
        <Grid container item xs={6} sm={2} justifyContent={"end"}>
          <Button
            variant="outlined"
            color="primary"
            onClick={handleAddLocationClick}
            startIcon={<AddIcon />}
          >
            add
          </Button>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <div>
          {/* <AddLocationForm /> */}
          <AreasMap />
          <LocationsTable />
        </div>
      </Grid>
    </Grid>
  );
};

export default LocationsHomePage;
