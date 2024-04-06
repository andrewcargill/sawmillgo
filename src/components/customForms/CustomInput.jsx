import React from 'react';
import { TextField } from '@mui/material';

const CustomInput = (props) => {
  return (
    <TextField
      variant="outlined"
      fullWidth
      margin="normal"
      {...props}
      sx={{ backgroundColor: 'transparent' }}
    />
  );
};

export default CustomInput;
