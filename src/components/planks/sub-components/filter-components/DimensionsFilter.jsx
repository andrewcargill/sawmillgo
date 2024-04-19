import React from "react";
import { Grid, Typography, Slider, Box, Button } from "@mui/material";

const DimensionsFilter = ({ allFilters, setAllFilters, setOpenModal, fetchPlanks }) => {
  const [localFilters, setLocalFilters] = React.useState({
    length: allFilters.length,
    width: allFilters.width,
    depth: allFilters.depth
  });

  const handleSliderChange = (dimension) => (event, newValue) => {
    setLocalFilters(prev => ({
      ...prev,
      [dimension]: newValue
    }));
  };

  const handleSubmit = () => {
    setAllFilters(localFilters);
    setOpenModal(false);
  };

  return (
    <Box padding={2}>
      {['length', 'width', 'depth'].map((dimension) => (
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
                marks
                
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

export default DimensionsFilter;
