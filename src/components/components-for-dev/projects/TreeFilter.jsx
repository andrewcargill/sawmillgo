import React, { useState, useEffect } from 'react';
import { Box, TextField, Typography } from '@mui/material';

const TreeFilter = ({ onFilterChange }) => {
  const [height, setHeight] = useState('');

  useEffect(() => {
    onFilterChange({ height });
  }, [height, onFilterChange]);

  return (
    <Box>
      <Typography variant="subtitle1">Tree Filters</Typography>
      <TextField
        variant="outlined"
        size="small"
        label="Height"
        value={height}
        onChange={(e) => setHeight(e.target.value)}
        fullWidth
        margin="dense"
      />
    </Box>
  );
};

export default TreeFilter;
