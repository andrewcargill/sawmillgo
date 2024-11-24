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
  Box,
  styled,
} from "@mui/material";
import CustomFormHeading from "../../customForms/CustomFormHeading";
import CustomViewItem from "../../customForms/CustomViewItem";
import CustomViewLongText from "../../customForms/CustomViewLongText";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const TreeForm = ({
  tree,
  species,
  locations,
  projects,
  onChange,
  onFileChange,
  onSubmit,
  mode,
}) => {
  const handleSelectChange = (event, data) => {
    const { name, value } = event.target;
    const selectedItem = data.find((item) => item.id === value);

    // Update the corresponding tree field directly
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

  const hasLogs = tree && Array.isArray(tree.logIds) && tree.logIds.length > 0;
  const hasImage = tree && tree.image;

  const renderViewLayout = () => (
    <>
      <Grid container display={"flex"} justifyContent={"space-between"}>
        <Grid item xs={12}>
          <CustomFormHeading title={`Tree - ${tree?.refId}`} />
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            padding: 2,
            display: "flex",
            flexDirection: "column",
            gap: 1,
          }}
        >
          {" "}
          <CustomViewItem title="Date Felled" data={tree.date} />
          <CustomViewItem
            title="Location"
            data={getLocationName(tree.locationId)}
          />
          <CustomViewItem
            title="Species"
            data={getSpeciesName(tree.speciesId)}
          />
          <CustomViewItem
            title="Project"
            data={getProjectName(tree.projectId)}
          />
          <CustomViewItem title="Age" data={tree.age} />
          <CustomViewItem title="Lumberjack" data={tree.lumberjackName} />
          <CustomViewLongText title="Reason" data={tree.reason} />
          <CustomViewLongText title="GPS" data="223.33445 23040506.560" />
          {hasLogs ? renderLogs() : "Tree is not logged"}
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            padding: 2,
            display: "flex",
            justifyContent: "center", 
            alignItems: "center",
          }}
        >
          {hasImage && (
            <Box
              component="img"
              src={tree.image}
              alt="Tree"
              sx={{
                width: {
                  xs: "20vw", 
                  sm: "20vw", 
                  md: "100%", 
                },
                maxHeight: {
                  xs: "100%",
                  sm: "100%",
                  md: "100%",
                },
                objectFit: "contain",
              }}
            />
          )}
        </Grid>
      </Grid>
    </>
  );

  const renderEditAddLayout = () => (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <CustomFormHeading title={`Edit Tree - ${tree?.refId}`} />
      </Grid>

      <Grid item xs={6}>
        <TextField
          fullWidth
          label="Date Felled"
          type="date"
          name="date"
          value={tree.date || ""}
          onChange={onChange}
          required
        />
      </Grid>
      {renderSelect(
        "projectId",
        "Project",
        projects,
        (event) => handleSelectChange(event, projects),
        tree.projectId
      )}
      {renderSelect(
        "speciesId",
        "Species",
        species,
        (event) => handleSelectChange(event, species),
        tree.speciesId
      )}
      {renderSelect(
        "locationId",
        "Location",
        locations,
        (event) => handleSelectChange(event, locations),
        tree.locationId
      )}
      <Grid item xs={6}>
        <TextField
          fullWidth
          label="Age"
          name="age"
          value={tree.age || ""}
          onChange={onChange}
          required
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
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          multiline
          rows={3}
          fullWidth
          label="Reason"
          name="reason"
          value={tree.reason || ""}
          onChange={onChange}
          required
        />
      </Grid>

      <Grid item xs={12}>
        <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
          {tree.image ? (
            <Box textAlign="center">
              <img
                src={tree.image}
                alt="Current Image"
                style={{
                  width: "100px",
                  height: "100px",
                  objectFit: "cover",
                  borderRadius: "8px",
                  border: "1px solid #ddd",
                }}
              />
              <Typography variant="body2">Current Image</Typography>
              <Button
                variant="outlined"
                color="error"
                size="small"
                onClick={() =>
                  onChange({ target: { name: "image", value: "" } })
                }
              >
                Delete Image
              </Button>
            </Box>
          ) : (
            <Typography variant="body2">No Image</Typography>
          )}
          <Button
            component="label"
            variant="contained"
            startIcon={<CloudUploadIcon />}
          >
            Upload Image
            <VisuallyHiddenInput name="image" type="file" onChange={onChange} />
          </Button>
        </Box>
      </Grid>

    </Grid>
  );

  const renderLogs = () => (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="body1">Logs</Typography>
      </Grid>
      {tree.logIds.map((logId) => (
        <Grid item xs={12} key={logId}>
          <Chip label={logId} variant="outlined" color="primary" clickable />
        </Grid>
      ))}
    </Grid>
  );

  const getSpeciesName = (id) =>
    species.find((item) => item.id === id)?.name || "Unknown";
  const getLocationName = (id) =>
    locations.find((item) => item.id === id)?.name || "Unknown";
  const getProjectName = (id) =>
    projects.find((item) => item.id === id)?.name || "Unknown";

  return (
    <form onSubmit={onSubmit}>
      {mode === "view" ? renderViewLayout() : renderEditAddLayout()}
    </form>
  );
};


const renderSelect = (name, label, options, onChange, value) => (
  <Grid item xs={12} sm={6}>
    <FormControl fullWidth>
      <InputLabel id={`${name}-label`}>{label}</InputLabel>
      <Select
        labelId={`${name}-label`}
        id={name}
        name={name}
        value={value || ""}
        onChange={onChange}
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

export default TreeForm;
