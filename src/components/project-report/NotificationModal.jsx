import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';

const NotificationModal = ({ open, handleClose, navigateTo }) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Attention Needed</DialogTitle>
      <DialogContent>
        <Typography variant="body1">
          To generate a report, you need to convert trees and logs into planks. Please complete the necessary conversions.
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => navigateTo('/convert-trees')} color="primary">
          Convert Trees
        </Button>
        <Button onClick={() => navigateTo('/convert-logs')} color="primary">
          Convert Logs
        </Button>
        <Button onClick={handleClose} color="secondary">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default NotificationModal;
