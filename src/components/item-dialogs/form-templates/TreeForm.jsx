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
  Chip,
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
  const hasLogs = tree && Array.isArray(tree.logIds) && tree.logIds.length > 0;
  const hasImage = tree && Array.isArray(tree.image);

  return (
    <form onSubmit={onSubmit}>
      <Grid item xs={12} pb={3}>
        <Typography variant="h6">
          {mode === "view"
            ? `Tree: ${tree?.refId}`
            : `${mode === "edit" ? "Edit" : "Add"} Tree: ${tree?.refId || ""}`}
        </Typography>
        <Typography>Status: {tree?.status}</Typography>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField
            fullWidth
            label="Date Felled"
            type="date"
            name="date"
            value={tree.date || ""}
            onChange={onChange}
            required
            disabled={mode === "view"}
          />
        </Grid>

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
        <Grid item xs={6}>
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
            multiline={true}
            rows={3}
            fullWidth
            label="Reason"
            name="reason"
            value={tree.reason || ""}
            onChange={onChange}
            required
            disabled={mode === "view"}
          />
        </Grid>
        {hasImage && (
          <Grid container spacing={2} p={2}>
            <Grid item xs={6}>
              <img
                src={tree.image}
                alt="Tree Image"
                style={{ width: "50%" }}
              />
            </Grid>
          </Grid>
        )}

        {mode !== "view" && (
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              Save
            </Button>
          </Grid>
        )}
      </Grid>
      <Grid container spacing={2}>
        {hasLogs && (
          <>
            <Grid item xs={12} mt={3}>
              <Typography variant="body1" gutterBottom>
                Logs
              </Typography>
            </Grid>
            {tree.logIds.map((logId) => (
              <Grid item xs={12} key={logId}>
                <Chip
                  label={logId}
                  variant="outlined"
                  color="primary"
                  clickable
                />
              </Grid>
            ))}
          </>
        )}
        {!hasLogs && (
          <Grid item xs={12}>
            <Typography variant="body1">Tree is not logged</Typography>
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
