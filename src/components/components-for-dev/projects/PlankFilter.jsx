import React, { useState, useEffect } from 'react';
import { Box, TextField, Typography } from '@mui/material';

const PlankFilter = ({ onFilterChange }) => {
  const [length, setLength] = useState('');

  useEffect(() => {
    onFilterChange({ length });
  }, [length, onFilterChange]);

  return (
    <Box>
      <Typography variant="subtitle1">Plank Filters</Typography>
      <TextField
        variant="outlined"
        size="small"
        label="Length"
        value={length}
        onChange={(e) => setLength(e.target.value)}
        fullWidth
        margin="dense"
      />
    </Box>
  );
};

export default PlankFilter;
