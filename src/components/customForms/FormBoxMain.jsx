import React from 'react';
import { Box } from '@mui/material';

const FormBoxMain = ({ children }) => {
  return (
    <Box sx={{ margin: '0 1% 10%' }}>
      {children}
    </Box>
  );
};

export default FormBoxMain;