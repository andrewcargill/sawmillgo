import React from "react";
import {
  Grid,
  TextField,
  Checkbox,
  FormControlLabel,
  Button,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
  Typography,
} from "@mui/material";

const TreeForm = ({
  tree,
  species,
  locations,
  projects,
  onChange,
  onSelectChange,
  onFileChange,
  onSubmit,
  mode,
}) => {
  return (
    <form onSubmit={onSubmit}>
       <Grid item xs={12} pb={3}>
        <Typography variant="h6" p={1}>
          {mode === "view"
            ? `Tree: ${tree?.refId}`
            : `${mode === "edit" ? "Edit" : "Add"} Tree: ${tree?.refId}`}
        </Typography>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Reference ID"
            name="refId"
            value={tree.refId}
            onChange={onChange}
            required
            disabled={mode === "view"}
          />
        </Grid>
        {/* <Grid item xs={12}>
          <TextField
            fullWidth
            label="Species Name"
            name="speciesName"
            value={tree.speciesName}
            onChange={onChange}
            required
            disabled={mode === "view"}
          />
        </Grid> */}

{renderSelect(
            "projectId",
            "Project",
            projects,
            (event) => onSelectChange(event, projects),
            tree.projectId,
            mode === "view"
          )}
          {renderSelect(
            "speciesId",
            "Species",
            species,
            (event) => onSelectChange(event, species),
            tree.speciesId,
            mode === "view"
          )}
           {renderSelect(
            "locationId",
            "Location",
            locations,
            (event) => onSelectChange(event, locations),
            tree.locationId,
            mode === "view"
          )}
        <Grid item xs={6}>
          <TextField
            fullWidth
            label="Age"
            name="age"
            value={tree.age || ""}
            onChange={onChange}
            required
            disabled={mode === "view"}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Lumberjack"
            name="lumberjackName"
            value={tree.lumberjackName || ""}
            onChange={onChange}
            required
            disabled={mode === "view"}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Reason"
            name="reason"
            value={tree.reason || ""}
            onChange={onChange}
            required
            disabled={mode === "view"}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Checkbox
                name="protected"
                checked={tree.protected}
                onChange={onChange}
                disabled={mode === "view"}
              />
            }
            label="Protected"
          />
        </Grid>
        {mode !== "view" && (
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

function renderSelect(name, label, options, onChange, value, disabled = false) {
  return (
    <Grid item xs={12} sm={6}>
      <FormControl fullWidth>
        <InputLabel id={`${name}-label`}>{label}</InputLabel>
        <Select
          labelId={`${name}-label`}
          id={name}
          name={name}
          value={value || ""}
          label={label}
          onChange={onChange}
          disabled={disabled}
        >
          {label === "Project" && <MenuItem value="">No Project</MenuItem>}
          {options.map((option) => (
            <MenuItem key={option.id} value={option.id}>
              {option.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Grid>
  );
}


export default TreeForm;
