import { createTheme } from '@mui/material/styles';

const customTheme = createTheme({
    palette: {
        primary: {
            main: '#79c001', // Light green
            contrastText: '#ffffff',
        },
        secondary: {
            main: '#ffb500', // Orange
            contrastText: '#286140',

        },
        white: {
            main: '#ffffff', // white
            dark: '#efefef', // black
            contrastText: '#000000',
        },
        dark: {
            main: '#286140', // Dark Green
            contrastText: '#ffffff',
        },

        black: {
            main: '#efefef', 
            contrastText: '#efefef',
        }

    },

    typography: {
        fontFamily: 'roboto, sans-serif',
        // fontSize: 12, // Adjust the font size as needed
       
       
    },
    components: {
        MuiDrawer: {
            styleOverrides: {
                paper: {
                    width: 250,
                    transitionDuration: '1000ms',
                },
            },
        },
    },
    iconSizes: {
        small: '12px',
        medium: '25px',
    },
    
});

export default customTheme;
