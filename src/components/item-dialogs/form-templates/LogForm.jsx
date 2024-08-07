import React from "react";
import {
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
} from "@mui/material";

const LogForm = ({
  log,
  onChange,
  onSelectChange,
  projects,
  species,
  locations,
  mode,
  onSubmit,
  disabled,
}) => {
  return (
    <>
       <Grid item xs={12} pb={3}>
        <Typography variant="h6">
          {mode === "view"
            ? `Log: ${log?.refId}`
            : `${mode === "edit" ? "Edit" : "Add"} Log: ${log?.refId}`}
        </Typography>
        <Typography>Status: {log?.status}</Typography>
      </Grid>

    <Grid container spacing={2}>
      <Grid item xs={6}>
        <TextField
          fullWidth
          label="Date Logged"
          type="date"
          name="date"
          value={log.date}
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
        log.projectId,
        mode === "view"
      )}
      {renderSelect(
        "speciesId",
        "Species",
        species,
        (event) => onSelectChange(event, species),
        log.speciesId,
        mode === "view"
      )}
      {renderSelect(
        "locationId",
        "Location",
        locations,
        (event) => onSelectChange(event, locations),
        log.locationId,
        mode === "view"
      )}

      <Grid item xs={3}>
        <TextField
          fullWidth
          label="Diameter"
          name="diameter"
          value={log.diameter || ""}
          onChange={onChange}
          disabled={disabled}
        />
      </Grid>
      <Grid item xs={3}>
        <TextField
          fullWidth
          label="Length"
          name="length"
          value={log.length || ""}
          onChange={onChange}
          disabled={disabled}
        />
      </Grid>
    
    </Grid>
    </>
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
export default LogForm;
