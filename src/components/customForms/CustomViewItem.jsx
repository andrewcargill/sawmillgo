import React from "react";
import { Grid, Typography } from "@mui/material";
import CustomBox from "../customContainers/CustomBox";
import CustomTypography from "../typography/CustomTypography";
import CustomBoxSimple from "../customContainers/CustomBoxSimple";

const CustomViewItem = ({ title, data }) => {
  return (
    <Grid container>
      <Grid item xs={6}>
        <CustomBox variant="dark" >
          <Grid container spacing={1}>
            <CustomTypography.dialogItemTitle>
              {title}
            </CustomTypography.dialogItemTitle>
          </Grid>
        </CustomBox>
      </Grid>
      <Grid item xs={6}>
        <CustomBoxSimple>
          <Grid container spacing={1}>
            <CustomTypography.dialogItemData>
              {data}
            </CustomTypography.dialogItemData>
          </Grid>
        </CustomBoxSimple>
      </Grid>
    </Grid>
  );
};

export default CustomViewItem;
