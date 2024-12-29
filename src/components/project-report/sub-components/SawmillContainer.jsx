import React, { useState } from "react";
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import SawmillDetails from "../../sawmill/SawmillDetails";




const SawmillContainer = ({ sawmillId }) => {
  const [open, setOpen] = useState(false);


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="creator-container">
      <Chip
        label="Sawmill Profile"
        onClick={handleClickOpen}
        variant="outlined"
      />
      <Dialog open={open} onClose={handleClose} maxWidth="lg">
        <DialogContent>
      <SawmillDetails sawmillId={sawmillId} />
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

export default SawmillContainer;
