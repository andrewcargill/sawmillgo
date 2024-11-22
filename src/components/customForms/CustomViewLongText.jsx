import React from "react";
import { Grid, Typography } from "@mui/material";
import CustomBox from "../customContainers/CustomBox";
import CustomTypography from "../typography/CustomTypography";
import CustomBoxSimple from "../customContainers/CustomBoxSimple";

const CustomViewLongText = ({ title, data }) => {
  return (
    <Grid container >
      <Grid item xs={6}>
        <CustomBoxSimple variant="lightgrey" sx={{padding: '15px, 2px', borderRadius: '5px'}} >
          <Grid container spacing={1}>
            <CustomTypography.dialogItemTitle>
            {`${title}:`}
            </CustomTypography.dialogItemTitle>
          </Grid>
        </CustomBoxSimple>
      </Grid>
      <Grid item xs={12}>
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

export default CustomViewLongText;
