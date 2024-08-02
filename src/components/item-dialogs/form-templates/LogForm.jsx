// LogForm.js
import React from 'react';
import { Grid, TextField } from '@mui/material';

const LogForm = ({ log, onChange, disabled }) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Reference ID"
          name="refId"
          value={log.refId || ''}
          onChange={onChange}
          disabled={disabled}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Species Name"
          name="speciesName"
          value={log.speciesName}
          onChange={onChange}
          disabled={disabled}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Diameter"
          name="diameter"
          value={log.diameter || ''}
          onChange={onChange}
          disabled={disabled}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Length"
          name="length"
          value={log.length || ''}
          onChange={onChange}
          disabled={disabled}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Location"
          name="location"
          value={log.location || ''}
          onChange={onChange}
          disabled={disabled}
        />
      </Grid>
    </Grid>
  );
};

export default LogForm;
