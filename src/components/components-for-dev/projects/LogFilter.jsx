import React, { useState, useEffect } from 'react';
import { Box, TextField, Typography } from '@mui/material';

const LogFilter = ({ onFilterChange }) => {
  const [diameter, setDiameter] = useState('');

  useEffect(() => {
    onFilterChange({ diameter });
  }, [diameter, onFilterChange]);

  return (
    <Box>
      <Typography variant="subtitle1">Log Filters</Typography>
      <TextField
        variant="outlined"
        size="small"
        label="Diameter"
        value={diameter}
        onChange={(e) => setDiameter(e.target.value)}
        fullWidth
        margin="dense"
      />
    </Box>
  );
};

export default LogFilter;
