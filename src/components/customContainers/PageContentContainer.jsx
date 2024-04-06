import React from 'react';
import { Container } from '@mui/material';
import { styled } from '@mui/material/styles';

const PageContentContainer = styled(Container)(({ theme }) => ({
  
  padding: 0,
  paddingTop: theme.spacing(9),

  [theme.breakpoints.up('sm')]: {
    paddingLeft: theme.spacing(0),
    paddingRight: theme.spacing(0),
  },
  [theme.breakpoints.up('md')]: {
    paddingLeft: theme.spacing(0),
    paddingRight: theme.spacing(0),
  },
  [theme.breakpoints.up('lg')]: {
    paddingLeft: theme.spacing(0),
    paddingRight: theme.spacing(0),
  },
  [theme.breakpoints.up('xl')]: {
    paddingLeft: theme.spacing(0),
    paddingRight: theme.spacing(0),
  },
}));

export default PageContentContainer;
