import React from 'react';
import { Typography } from '@mui/material';

const CustomTypography = {
  heading: ({ color, ...rest }) => (
    <Typography sx={{ textAlign: 'left', lineHeight: 1, fontWeight: 800, textTransform: 'uppercase', fontSize: '2.125rem', color}} {...rest} />
  ),
  navHeading: ({ color, ...rest }) => (
    <Typography sx={{ textAlign: 'left', lineHeight: 1, fontWeight: 800, textTransform: 'uppercase', fontSize: '2.125rem', color: 'dark.contrastText'}} {...rest} />
  ),
  listHeading: ({ color, ...rest }) => (
    <Typography sx={{ textAlign: 'left', lineHeight: 1, fontWeight: 800, textTransform: 'uppercase', fontSize: '1.125rem', color}} {...rest} />
  ),
  subheading: ({ color, ...rest }) => (
    <Typography sx={{ textAlign: 'left', lineHeight: 1.3, fontSize: '0.9rem', fontWeight: 'bold', color }} {...rest} />
  ),
  paragraph: ({ color, ...rest }) => (
    <Typography sx={{ textAlign: 'left', lineHeight: 1.3, fontSize: '0.9rem', color }} {...rest} />
  ),
  subReportHeading: ({ color, ...rest }) => (
    <Typography sx={{ textAlign: 'left', lineHeight: 1.3, fontSize: '0.9rem', fontWeight: 800  }} {...rest} />
  ),
  subReportContent: ({ color, ...rest }) => (
    <Typography sx={{ textAlign: 'left', lineHeight: 1.3, fontSize: '0.9rem' }} {...rest} />
  ),
  // Add more custom typography variants as needed
};

export default CustomTypography;
