import React, { useState, useEffect } from "react";
import {
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Button,
  styled,
  CircularProgress,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CustomFormHeading from "../../customForms/CustomFormHeading";
import CustomViewItem from "../../customForms/CustomViewItem";
import CustomViewLongText from "../../customForms/CustomViewLongText";

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

const PlankForm = ({
  plank,
  species,
  locations,
  projects,
  onChange,
  onFileChange,
  onSubmit,
  mode,
}) => {
  const [imageFiles, setImageFiles] = useState({
    image1: null,
    image2: null,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (
      species.length > 0 &&
      locations.length > 0 &&
      projects.length > 0 &&
      plank
    ) {
      setLoading(false);
    }
  }, [species, locations, projects, plank]);

  const handleSelectChange = (event, data) => {
    const { name, value } = event.target;
    const selectedItem = data.find((item) => item.id === value);

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

  const handleFileChange = (event) => {
    const { name, files } = event.target;
    setImageFiles((prev) => ({ ...prev, [name]: files[0] }));
    onFileChange(name, files[0]);
  };

  if (loading) {
    return (
      <Grid container justifyContent="center" alignItems="center">
        <CircularProgress />
      </Grid>
    );
  }

  const renderViewLayout = () => (
    <Grid container spacing={2} padding={2}>
      <Grid item xs={12}>
      <CustomFormHeading title={`Plank - ${plank?.refId}`} />
      </Grid>
      <Grid item xs={12} sm={6}>
      <CustomViewItem title="Date Milled" data={plank?.date || "N/A"} />
      <CustomViewItem
        title="Location"
        data={getLocationName(plank?.locationId)}
      />
      <CustomViewItem title="Species" data={getSpeciesName(plank?.speciesId)} />
      <CustomViewItem title="Project" data={getProjectName(plank?.projectId)} />
      <CustomViewItem title="Grade" data={plank?.grade || "N/A"} />
      <CustomViewItem title="Length" data={plank?.length || "N/A"} />
      <CustomViewItem title="Depth" data={plank?.depth || "N/A"} />
      <CustomViewItem title="Width" data={plank?.width || "N/A"} />
      <CustomViewLongText title="notes" data={plank?.notes || "N/A"} />
</Grid>
<Grid item container xs={12} sm={6}>
      {plank?.image1 && (
        <Grid item xs={6} sm={10}>
          <img
            src={plank.image1}
            alt="Plank Image 1"
            style={{ width: "100%", maxHeight: '200px', objectFit: "contain" }}
          />
        </Grid>
      )}
      {plank?.image2 && (
        <Grid item xs={6} sm={10}>
          <img
            src={plank.image2}
            alt="Plank Image 2"
            style={{ width: "100%", maxHeight: '200px', objectFit: "contain" }}
          />
        </Grid>
      )}
    </Grid>
    </Grid>
  );

  const renderEditAddLayout = () => (
    <Grid container spacing={2}>
      <Grid item xs={12}>
      <CustomFormHeading title= {mode === "edit" ? `Edit Plank - ${plank?.refId}` : "Add Plank"} />
        <Typography variant="h6">
          {mode === "edit" ? `Edit Plank: ${plank?.refId}` : "Add Plank"}
        </Typography>
      </Grid>
      <TextFieldGrid
        name="date"
        label="Date"
        type="date"
        value={plank.date}
        onChange={onChange}
      />
      {renderSelect(
        "locationId",
        "Location",
        locations,
        (event) => handleSelectChange(event, locations),
        plank.locationId
      )}
      {renderSelect(
        "projectId",
        "Project",
        projects,
        (event) => handleSelectChange(event, projects),
        plank.projectId
      )}
      {renderSelect(
        "speciesId",
        "Species",
        species,
        (event) => handleSelectChange(event, species),
        plank.speciesId
      )}
      <TextFieldGrid
        name="grade"
        label="Grade"
        value={plank.grade}
        onChange={onChange}
      />
      <TextFieldGrid
        name="length"
        label="Length (cm)"
        type="number"
        value={plank.length}
        onChange={onChange}
      />
      <TextFieldGrid
        name="width"
        label="Width (cm)"
        type="number"
        value={plank.width}
        onChange={onChange}
      />
      <TextFieldGrid
        name="depth"
        label="Depth (cm)"
        type="number"
        value={plank.depth}
        onChange={onChange}
      />
      <TextFieldGridFull
        name="notes"
        label="Notes"
        value={plank.notes}
        onChange={onChange}
        multiline
      />
      <Grid container spacing={2}>
        <ImageUpload
          name="image1"
          file={imageFiles.image1}
          handleFileChange={handleFileChange}
        />
        <ImageUpload
          name="image2"
          file={imageFiles.image2}
          handleFileChange={handleFileChange}
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

// Sub-components
function renderSelect(name, label, options, onChange, value) {
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

function TextFieldGrid({ name, label, type, value, onChange }) {
  return (
    <Grid item xs={12} sm={6}>
      <TextField
        fullWidth
        label={label}
        type={type}
        name={name}
        value={value || ""}
        onChange={onChange}
      />
    </Grid>
  );
}

function TextFieldGridFull({ name, label, value, onChange, multiline }) {
  return (
    <Grid item xs={12}>
      <TextField
        fullWidth
        label={label}
        name={name}
        value={value || ""}
        onChange={onChange}
        multiline={multiline}
        rows={multiline ? 4 : 1}
      />
    </Grid>
  );
}

function ImageUpload({ name, file, handleFileChange }) {
  return (
    <Grid item xs={6}>
      <Button
        component="label"
        variant="contained"
        startIcon={<CloudUploadIcon />}
      >
        Upload {name}
        <VisuallyHiddenInput
          name={name}
          type="file"
          onChange={handleFileChange}
        />
      </Button>
      {file && <Typography>{file.name}</Typography>}
    </Grid>
  );
}

export default PlankForm;
