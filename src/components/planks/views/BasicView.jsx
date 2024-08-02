import React from 'react';
import { Grid, Typography } from '@mui/material';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import { Tooltip } from '@mui/material';

const BasicView = ({ planks, onPlankClick }) => {
  return (
    <Grid
      container
      sx={{ justifyContent: { xs: 'center', sm: 'flex-start' } }}
      alignContent={'center'}
    >
      {planks.map((plank) => (
        <Grid
          className="item-select"
          item
          container
          xs={3}
          sm={2}
          lg={2}
          key={plank.id}
          m={1}
          bgcolor={'white.main'}
          style={{
            position: 'relative', // Ensure this container is the positioning context
            border: '2px solid lightgrey',
            borderRadius: '5px',
            padding: '12px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            cursor: 'pointer',
          }}
          onClick={() => onPlankClick(plank)}
        >
          <Grid item pt={4} pb={4}>
            <Typography variant="h6">{plank.refId}</Typography>
            <Typography variant="body2">{plank.speciesName}</Typography>
          </Grid>

          {/* Labels */}
          <div style={{ position: 'absolute', top: '8px', right: '8px' }}>
            {plank.projectId && (
              <Tooltip title={`Project: ${plank.projectName}`} arrow>
                <LocalOfferIcon color="dark" fontSize="small" />
              </Tooltip>
            )}
            {plank.verified && (
              <Tooltip title="Verified" arrow>
                <WorkspacePremiumIcon color="primary" fontSize="small" />
              </Tooltip>
            )}
          </div>
        </Grid>
      ))}
    </Grid>
  );
};

export default BasicView;
