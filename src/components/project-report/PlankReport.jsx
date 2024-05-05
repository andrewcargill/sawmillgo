import { Container, Grid } from "@mui/material";
import React from "react";
import ForwardIcon from '@mui/icons-material/Forward';

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
        sx={{ minWidth: 2000, minHeight: 200, flexWrap: "nowrap" }}
      >
        <Grid container flexDirection={"row"} spacing={2}>
          <Grid
            item
            xs={12}
            bgcolor="primary.main"
            container
            sx={{ height: 40 }}
          >
            {/* TimeLine 1 */}
            <Grid container item xs={3} bgcolor={'primary'}>
            <Grid item xs={8} >
            Tree Felled: {tree.date}
            </Grid>
            <Grid item xs={4} >
            <ForwardIcon />
            </Grid>
            </Grid>
            {/* TimeLine 2 */}
            <Grid item xs={3} bgcolor={''}>
            
           Tree Logged: {log.date}
            </Grid>
            {/* TimeLine 3 */}
            <Grid item xs={3} bgcolor={'lightblue'}>
            
           Log Milled: {plank.milledDate}

            </Grid>
            {/* TimeLine 4 */}
            <Grid item xs={3} bgcolor={'grey'}>
            
            This is the titleThis is the title This is the tits the titleThis is
            the titleThis is the title
            </Grid>
          </Grid>
          <Grid item xs={12} container sx={{ minHeight: 160 }}>
             {/* Content 1 */}
             <Grid item xs={3} bgcolor={'pink'}>
            
            This is the titleThis is the title This is the tits the titleThis is
            the titleThis is the title
            </Grid>
            {/* Content 2 */}
            <Grid item xs={3} bgcolor={'red'}>
            
            This is the titleThis is the title This is the tits the titleThis is
            the titleThis is the title
            </Grid>
            {/* Content 3 */}
            <Grid item xs={3} bgcolor={'lightblue'}>
            
            This is the titleThis is the title This is the tits the titleThis is
            the titleThis is the title
            </Grid>
            {/* Content 4 */}
            <Grid item xs={3} bgcolor={'grey'}>
            
            This is the titleThis is the title This is the tits the titleThis is
            the titleThis is the title
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default PlankReport;
