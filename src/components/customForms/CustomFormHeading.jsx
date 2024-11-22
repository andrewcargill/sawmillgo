import React from 'react';
import { Grid, Typography } from '@mui/material';
import CustomBox from '../customContainers/CustomBox';
import CustomTypography from '../typography/CustomTypography';
import CustomBoxDialog from '../customContainers/CustomBoxDialog';

const CustomFormHeading = ({ title }) => {
  return (
    <CustomBoxDialog variant="primary" sx={{ marginBottom: '32px' }}>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <CustomTypography.dialogHeading>
            {title}
          </CustomTypography.dialogHeading>
        </Grid>
      </Grid>
    </CustomBoxDialog>
  );
};

export default CustomFormHeading;
