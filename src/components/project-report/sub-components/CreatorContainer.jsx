import React, { useState } from "react";
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import FlagIcon from "../../country-components/FlagIcon";
import CountryNameFromCode from "../../country-components/CountryNameFromCode";





const CreatorContainer = ({ creator }) => {
  const [open, setOpen] = useState(false);


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Chip
        label="Creator Profile"
        onClick={handleClickOpen}
        variant="outlined"
        
   
      />
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{creator.companyName}<FlagIcon countryCode={creator.country} /></DialogTitle>
        <DialogContent>
        <Typography><img src={creator.imageUrl} alt="woodworker" style={{maxWidth: '100%'}} /></Typography>

          <Typography>Country: <CountryNameFromCode countryCode={creator.country} /></Typography>
          <Typography>About: {creator.about}</Typography>
          <Typography>Portfolio URL: <a href={creator.portfolioUrl} target="_blank" rel="noopener noreferrer">{creator.portfolioUrl}</a></Typography>
          <Typography>Link 1: <a href={creator.socialMediaUrl1} target="_blank" rel="noopener noreferrer">{creator.socialMediaUrl1}</a></Typography>
          <Typography>Link 2: <a href={creator.socialMediaUrl2} target="_blank" rel="noopener noreferrer">{creator.socialMediaUrl2}</a></Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CreatorContainer;
