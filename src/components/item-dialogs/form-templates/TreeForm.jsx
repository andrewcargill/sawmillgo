// TreeForm.js
import React from 'react';
import { Grid, TextField, Checkbox, FormControlLabel, Button } from '@mui/material';

const TreeForm = ({
  tree,
  species,
  locations,
  onChange,
  onSelectChange,
  onFileChange,
  onSubmit,
  mode
}) => {
  return (
    <form onSubmit={onSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Reference ID"
            name="refId"
            value={tree.refId}
            onChange={onChange}
            required
            disabled={mode === 'view'}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Species Name"
            name="speciesName"
            value={tree.speciesName}
            onChange={onChange}
            required
            disabled={mode === 'view'}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Age"
            name="age"
            value={tree.age || ''}
            onChange={onChange}
            required
            disabled={mode === 'view'}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Height"
            name="height"
            value={tree.height || ''}
            onChange={onChange}
            required
            disabled={mode === 'view'}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Location"
            name="location"
            value={tree.location || ''}
            onChange={onChange}
            required
            disabled={mode === 'view'}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Checkbox
                name="protected"
                checked={tree.protected}
                onChange={onChange}
                disabled={mode === 'view'}
              />
            }
            label="Protected"
          />
        </Grid>
        {mode !== 'view' && (
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              Save
            </Button>
          </Grid>
        )}
      </Grid>
    </form>
  );
};

export default TreeForm;
