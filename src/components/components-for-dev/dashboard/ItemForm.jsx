import React from 'react';
import {
  TextField,
  Grid,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';

const ItemForm = ({ type, mode, data, onChange }) => {
  // Determine if fields should be editable based on mode
  const isEditable = mode === 'edit' || mode === 'add';

  // Define labels and fields based on the item type
  const fields = {
    tree: [
      { label: 'Species', key: 'speciesName', type: 'text' },
      { label: 'Age', key: 'age', type: 'number' },
      { label: 'Location', key: 'location', type: 'text' },
    ],
    log: [
      { label: 'Length', key: 'length', type: 'number' },
      { label: 'Diameter', key: 'diameter', type: 'number' },
      { label: 'Associated Tree', key: 'treeId', type: 'text' },
    ],
    plank: [
      { label: 'Width', key: 'width', type: 'number' },
      { label: 'Thickness', key: 'thickness', type: 'number' },
      { label: 'Material', key: 'material', type: 'text' },
    ],
  };

  // Choose fields based on the current item type
  const itemFields = fields[type] || [];

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h6" gutterBottom>
          {mode === 'view' ? `View ${type}` : `${mode === 'edit' ? 'Edit' : 'Add'} ${type}`}
        </Typography>
      </Grid>

      {itemFields.map((field) => (
        <Grid item xs={6} key={field.key}>
          <TextField
            label={field.label}
            value={data[field.key]}
            type={field.type}
            fullWidth
            variant="outlined"
            InputProps={{
              readOnly: !isEditable,
            }}
            onChange={(e) =>
              onChange({ ...data, [field.key]: e.target.value })
            }
          />
        </Grid>
      ))}
      
      {/* Example of using Select field */}
      {type === 'tree' && (
        <Grid item xs={6}>
          <FormControl fullWidth variant="outlined">
            <InputLabel id="status-label">Status</InputLabel>
            <Select
              labelId="status-label"
              value={data.status}
              disabled={!isEditable}
              onChange={(e) => onChange({ ...data, status: e.target.value })}
              label="Status"
            >
              <MenuItem value="available">Available</MenuItem>
              <MenuItem value="reserved">Reserved</MenuItem>
              <MenuItem value="sold">Sold</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      )}
    </Grid>
  );
};

export default ItemForm;
