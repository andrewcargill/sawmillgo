import React from 'react';
import { Grid, Typography } from '@mui/material';
import CustomBox from '../customContainers/CustomBox';
import CustomTypography from '../typography/CustomTypography';

const CustomFormHeading = ({ title }) => {
  return (
    <CustomBox variant="primary" sx={{ marginBottom: '32px' }}>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <CustomTypography.heading>
            {title}
          </CustomTypography.heading>
        </Grid>
      </Grid>
    </CustomBox>
  );
};

export default CustomFormHeading;
