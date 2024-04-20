import React from 'react';
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import { List, ListItem, ListItemAvatar, ListItemText, Paper } from '@mui/material';
import ParkIcon from '@mui/icons-material/Park';
import QrCodeIcon from '@mui/icons-material/QrCode';
import HandymanIcon from '@mui/icons-material/Handyman';
import VerifiedIcon from '@mui/icons-material/Verified';
import BarChartIcon from '@mui/icons-material/BarChart';

const HomePage = () => {
 

  return (
    <>
    <Grid container pb={4}>
     <Typography variant="h2" color="initial">A cloud based forestry management system that delivers complete transparency and the story behind your wood products.</Typography>
    </Grid>

    <Grid container p={3} bgcolor={'primary.main'} color={'primary.contrastText'}  justifyContent={'center'}>
      <Paper>
      <List>
        <ListItem>
          <ListItemAvatar>
            <ParkIcon />
            </ListItemAvatar>
            <ListItemText 
            primary="Source Transparency" 
            secondary=" Each tree is logged with details like the lumberjack's name, removal reason, exact GPS location, and a photo." />
          </ListItem>
  
        <ListItem>
          <ListItemAvatar>
            <BarChartIcon />
            </ListItemAvatar>
            <ListItemText 
            primary="Processing Insight" 
            secondary=" From logging to milling, every step is timestamped with operator details and visuals from the sawmill." />
          </ListItem>
        <ListItem>
          <ListItemAvatar>
            <VerifiedIcon />
            </ListItemAvatar>
            <ListItemText 
            primary="Quality Assurance" 
            secondary=" Follow the wood's drying process through comprehensive data and drying history graphs." />
          </ListItem>
        <ListItem>
          <ListItemAvatar>
            <HandymanIcon />
            </ListItemAvatar>
            <ListItemText 
            primary="Craftsmanship Tracking" 
            secondary=" Artisans document their creative process, turning planks into unique products." />
          </ListItem>
        <ListItem>
          <ListItemAvatar>
            <QrCodeIcon />
            </ListItemAvatar>
            <ListItemText 
            primary="Final Product Traceability" 
            secondary="Every product comes with a QR code that links to a detailed report about the wood’s journey and origins." />
          </ListItem>
        </List>
        </Paper>
      
    </Grid>

    {/* <Grid container justifyContent={'center'}>
     <Typography variant="h2" color="initial">Maximize the Value of Your Wood.</Typography>
    </Grid> */}

    </>
  );
};

export default HomePage;
