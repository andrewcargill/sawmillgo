import { Box as MuiBox } from '@mui/material';
import { styled } from '@mui/material/styles';

const CustomBox = styled(MuiBox)(({ theme, variant }) => ({
  backgroundColor: variant === 'primary' ? theme.palette.primary.main : variant === 'secondary' ? theme.palette.secondary.main : variant === 'dark' ? theme.palette.dark.main : variant === 'white' ? theme.palette.white.main : 'inherit',

  color: variant === 'primary' ? theme.palette.primary.contrastText : variant === 'secondary' ? theme.palette.secondary.contrastText : variant === 'dark' ? theme.palette.dark.contrastText : 'inherit',

  padding: theme.spacing(2),
  boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
}));



export default CustomBox ;