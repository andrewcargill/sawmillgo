import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

const CustomBoxDialog = styled(Box)(({ theme, variant }) => ({
    backgroundColor:
        variant === 'primary'
            ? theme.palette.primary.main
            : variant === 'secondary'
            ? theme.palette.secondary.main
            : variant === 'lightgrey'
            ? theme.palette.lightgrey.main
            : variant === 'darkgrey'
            ? theme.palette.darkgrey.main
            : 'inherit',
    color:
        variant === 'primary'
            ? theme.palette.primary.contrastText
            : variant === 'secondary'
            ? theme.palette.secondary.contrastText
            : variant === 'lightgrey'
            ? theme.palette.lightgrey.contrastText
            : variant === 'darkgrey'
            ? theme.palette.darkgrey.contrastText
            : 'inherit',
    borderRadius: '5px',
    padding: theme.spacing(2),
}));

export default CustomBoxDialog;
