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
import CustomFormHeading from "../../customForms/CustomFormHeading";
import CustomViewItem from "../../customForms/CustomViewItem";

const LogForm = ({
  log,
  onChange,
  projects,
  species,
  locations,
  mode,
  onSubmit,
  disabled,
}) => {
  const handleSelectChange = (event, data) => {
    const { name, value } = event.target;
    const selectedItem = data.find((item) => item.id === value);

    // Update the corresponding log field directly
    onChange({
      target: {
        name,
        value,
      },
    });

    if (selectedItem) {
      onChange({
        target: {
          name: `${name.slice(0, -2)}Name`,
          value: selectedItem.name,
        },
      });
    }
  };

  const renderViewLayout = () => (
    <Grid container padding={2}>
      <Grid item xs={12}>
      <CustomFormHeading title={`Log - ${log?.refId}`} />
      </Grid>
      <CustomViewItem title="Date Logged" data={log?.date || "N/A"} />
      <CustomViewItem title="Species" data={getSpeciesName(log.speciesId)} />
      <CustomViewItem title="Location" data={getLocationName(log.locationId)} />
      <CustomViewItem title="Project" data={getProjectName(log.speciesId)} />
      <CustomViewItem title="Diameter" data={log?.diameter || "N/A"} />
      <CustomViewItem title="Length" data={log?.length || "N/A"} />
    </Grid>
  );

  const renderEditAddLayout = () => (
    <Grid container spacing={2}>
      <Grid item xs={12} pb={3}>
 
      <CustomFormHeading title= {mode === "edit" ? `Edit Log - ${log?.refId}` : "Add Log"} />
     
     
      </Grid>
      <Grid item xs={6}>
        <TextField
          fullWidth
          label="Date Logged"
          type="date"
          name="date"
          value={log.date || ""}
          onChange={onChange}
          required
          disabled={disabled}
        />
      </Grid>
      {renderSelect(
        "projectId",
        "Project",
        projects,
        (event) => handleSelectChange(event, projects),
        log.projectId,
        disabled
      )}
      {renderSelect(
        "speciesId",
        "Species",
        species,
        (event) => handleSelectChange(event, species),
        log.speciesId,
        disabled
      )}
      {renderSelect(
        "locationId",
        "Location",
        locations,
        (event) => handleSelectChange(event, locations),
        log.locationId,
        disabled
      )}
      <Grid item xs={6}>
        <TextField
          fullWidth
          label="Diameter"
          name="diameter"
          value={log.diameter || ""}
          onChange={onChange}
          disabled={disabled}
        />
      </Grid>
      <Grid item xs={6}>
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
  );

  const getProjectName = (id) =>
    projects.find((item) => item.id === id)?.name || "Unknown";
  const getSpeciesName = (id) =>
    species.find((item) => item.id === id)?.name || "Unknown";
  const getLocationName = (id) =>
    locations.find((item) => item.id === id)?.name || "Unknown";

  return (
    <form onSubmit={onSubmit}>
      {mode === "view" ? renderViewLayout() : renderEditAddLayout()}
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
          onChange={onChange}
          disabled={disabled}
        >
          <MenuItem value="">None</MenuItem>
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
