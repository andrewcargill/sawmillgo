import React from 'react';
import { Grid } from '@mui/material';
import PlankListContent from '../sub-components/PlankListContent';

const DynamicView = ({ planks, onPlankClick }) => {
  return (
    <Grid container>
      {planks.map((plank) => (
        <Grid onClick={() => onPlankClick(plank)} key={plank.id}>
          <PlankListContent data={plank} />
        </Grid>
      ))}
    </Grid>
  );
};

export default DynamicView;
