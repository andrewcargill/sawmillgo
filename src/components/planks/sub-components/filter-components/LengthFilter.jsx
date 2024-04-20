import React from "react";
import { Grid, Typography, Slider, Box, Button } from "@mui/material";

const LengthFilter = ({ allFilters, setAllFilters, setOpenModal, fetchPlanks }) => {
  const [localFilters, setLocalFilters] = React.useState({
    length: allFilters.length,

  });

  const handleSliderChange = (dimension) => (event, newValue) => {
    setLocalFilters(prev => ({
      ...prev,
      [dimension]: newValue
    }));
  };

  const handleSubmit = () => {
    setAllFilters(prev => ({
      ...prev, 
      ...localFilters
  }));

    setOpenModal(false);
  };

  return (
    <Box padding={2}>
      {['length'].map((dimension) => (
        <div key={dimension}>
          <Typography gutterBottom>{dimension.toUpperCase()} (cm)</Typography>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs>
              <Slider
                value={localFilters[dimension] || [50, 150]} 
                onChange={handleSliderChange(dimension)}
                valueLabelDisplay="auto"
                min={1}
                max={dimension === 'length' ? 700 : dimension === 'width' ? 50 : 40}
                marks={[
                  {
                    value: 1,
                    label: '1 cm',
                  },
                  {
                    value: dimension === 'length' ? 400 : dimension === 'width' ? 25 : 10,
                    label: `${dimension === 'length' ? 400 : dimension === 'width' ? 25 : 10} cm`,
                  },
                  {
                    value: dimension === 'length' ? 700 : dimension === 'width' ? 50 : 40,
                    label: `${dimension === 'length' ? 700 : dimension === 'width' ? 50 : 40} cm`,
                  }
                ]}
                
              />
            </Grid>
          </Grid>
        </div>
      ))}
      <Grid pt={2}>
      <Button fullWidth variant="contained" color="primary" onClick={handleSubmit}>
        Apply Filters
      </Button>
      </Grid>
      
    </Box>
  );
};

export default LengthFilter;
