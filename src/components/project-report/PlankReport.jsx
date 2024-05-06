import { Container, Grid } from "@mui/material";
import React from "react";
import ForwardIcon from "@mui/icons-material/Forward";
import ReportMoistureGraph from "./sub-components/ReportMoistureGraph";

const PlankReport = ({ tree, log, plank }) => {
  return (
    <Grid
      container
      border={2}
      sx={{
        overflowX: "auto",
        "&::-webkit-scrollbar": {
          display: "none",
        },
        scrollbarWidth: "none",
      }}
      alignContent="flex-start"
    >
      <Grid
        item
        xs={12}
        mt={1}
        container
        sx={{
          minWidth: {
            xs: "380vw", // for xs (extra small) view size
            sm: "385vw", // for sm (small) view size
            md: "390vw", // for md (medium) view size
            lg: "380vw", // for lg (large) view size
            xl: "280vw", // for xl (extra large) view size
          },
          minHeight: 200,
          flexWrap: "nowrap",
        }}
      >
        <Grid container flexDirection={"row"}>
          <Grid
            item
            xs={12}
            bgcolor="primary.main"
            container
            sx={{ height: 40 }}
          >
            {/* TimeLine 1 - Tree Felled */}
            <Grid container item xs={3}>
              Tree Felled: {tree.date}
            </Grid>
            {/* TimeLine 2 - Logged */}
            <Grid container item xs={3}>
              Tree Logged: {log.date}
            </Grid>
            {/* TimeLine 3 - Milled */}
            <Grid container item xs={3}>
              Log Milled: {plank.milledDate}
            </Grid>
            {/* TimeLine 4 - Drying */}
            <Grid container item xs={3}>
              Drying Information
            </Grid>
          </Grid>
          <Grid item xs={12} container sx={{ height: 160 }}>
            {/* Content 1 - Tree Felled */}
            <Grid item xs={3} bgcolor={"pink"}>
              <div>Tree RefID: {tree.id}</div>
              <div>Lumberjack: {tree.lumberJack}</div>
              <div>Area of Forest: {tree.location}</div>
              <div>Latitude: {tree.latitude}</div>
              <div>Longitude: {tree.longitude}</div>
              <div>Age: {tree.age}</div>
              <div>Reason for Removal: {tree.reasonForRemoval}</div>
            </Grid>
            {/* Content 2 - Logged */}
            <Grid item xs={3} bgcolor={"red"}>
              <div>Log ID: {log.id}</div>
              <div>Logging Date: {log.date}</div>
              <div>Cut Length: {log.length}</div>
              <div>Diameter: {log.diameter}</div>
              <div>Lumberjack: {log.lumberJack}</div>
            </Grid>
            {/* Content 3 - Milling info */}
            <Grid item xs={3} bgcolor={"lightblue"}>
              <div>Plank ID: {plank.id}</div>
              <div>Milled Date: {plank.milledDate}</div>
              <div>Operator: {plank.operator}</div>
              <div>Comments: {plank.comments}</div>
              <div>
                Dimensions: {plank.dimensions.width} x {plank.dimensions.depth}{" "}
                x {plank.dimensions.length}
              </div>
              <div>Grade: {plank.grade}</div>
            </Grid>
            {/* Content 4 */}
            <Grid item xs={3} bgcolor={"grey"}>
              <ReportMoistureGraph plankData={plank.moistureContent} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default PlankReport;
