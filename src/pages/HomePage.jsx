import React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
} from "@mui/material";
import ParkIcon from "@mui/icons-material/Park";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import QrCodeIcon from "@mui/icons-material/QrCode";
import HandymanIcon from "@mui/icons-material/Handyman";
import VerifiedIcon from "@mui/icons-material/Verified";
import BarChartIcon from "@mui/icons-material/BarChart";
import image1  from "../media/images/trees.png";

const HomePage = () => {


  return (
    <>

<Grid Container 
      style={{ 
        backgroundImage: `url(${image1})`,
        backgroundSize: 'cover', 
        backgroundPosition: 'center',
        height: '30vh',
        borderRadius: '10px',
      }}
      >
      </Grid>
      <Grid container p={10} 

      >

        <Grid item container xs={12} p={3}
        style={{
          backgroundColor: '',
          backdropFilter: 'blur(5px)',
          borderRadius: '10px',
        
        }}
        >

        <Typography variant="h4" color="initial">
          The innovative forestry management system that brings together forest owners, sawmills and craftsmen to deliver the unique story
          behind every wood product.
        </Typography>
        </Grid>
      </Grid>


      <Grid
        container
        p={3}
        bgcolor={"primary.main"}
        color={"primary.contrastText"}
        justifyContent={"center"}
        borderRadius={5}
      >
        <Paper>
   
          <List>
          <ListItem>
              <ListItemAvatar>
                <QrCodeIcon />
              </ListItemAvatar>
              <ListItemText
                primary="Final Product Traceability"
                secondary="Every product comes with a QR code that links to a detailed report about the wood’s journey and origins."
              />
            </ListItem>

            <ListItem>
              <ListItemAvatar>
                <HandymanIcon />
              </ListItemAvatar>
              <ListItemText
                primary="Craftsmanship Diary"
                secondary=" Artisans document their creative process of turning planks into unique products."
              />
            </ListItem>

            <ListItem>
              <ListItemAvatar>
                <VerifiedIcon />
              </ListItemAvatar>
              <ListItemText
                primary="Quality Assurance"
                secondary=" Follow the wood's drying process through comprehensive data and drying history graphs."
              />
            </ListItem>

            <ListItem>
              <ListItemAvatar>
                <BarChartIcon />
              </ListItemAvatar>
              <ListItemText
                primary="Processing Insight"
                secondary=" From logging to milling, every step is timestamped with operator details and visuals from the sawmill."
              />
            </ListItem>

            <ListItem>
              <ListItemAvatar>
                <ParkIcon />
              </ListItemAvatar>
              <ListItemText
                primary="Source Transparency"
                secondary=" Each tree is logged with details such as the lumberjack's name, removal reason, exact GPS location and a photo."
              />
            </ListItem>

            <ListItem>
              <ListItemAvatar>
                <LocationOnIcon />
              </ListItemAvatar>
              <ListItemText
                primary="Stock Location Tracking"
                secondary=" Create custom locations and track the stock's movement between them."
              />
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
