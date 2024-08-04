import React, { useState, useEffect } from "react";
import {
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Checkbox,
  FormControlLabel,
  Button,
  styled,
  CircularProgress,
} from "@mui/material";
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

const PlankForm = ({
  plank,
  species,
  locations,
  projects,
  onChange,
  onSelectChange,
  onFileChange,
  onSubmit,
  mode,
}) => {
  const [imageFiles, setImageFiles] = useState({
    image1: null,
    image2: null,
  });

  const [loading, setLoading] = useState(true);

  // Ensure all necessary data is loaded before rendering the form
  useEffect(() => {
    // Check if species, locations, projects, and plank data are loaded
    if (
      species.length > 0 &&
      locations.length > 0 &&
      projects.length > 0 &&
      plank
    ) {
      setLoading(false);
    }
  }, [species, locations, projects, plank]);

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

  return (
    <Grid container>
      <Grid item xs={12} pb={3}>
        <Typography variant="h6" p={1}>
          {mode === "view"
            ? `Plank: ${plank?.refId}`
            : `${mode === "edit" ? "Edit" : "Add"} Plank: ${plank?.refId}`}
        </Typography>
      </Grid>
      <Grid container>
        <Grid
          item
          container
          xs={12}
          p={2}
          spacing={1}
          // border={"solid 1px lightgray"}
          // borderRadius={3}

        >
          <TextFieldGridThird
            name="date"
            label="Date"
            type="date"
            value={plank.date}
            onChange={onChange}
            disabled={mode === "view"}
          />
          {renderSelect(
            "locationId",
            "Location",
            locations,
            (event) => onSelectChange(event, locations),
            plank.locationId,
            mode === "view"
          )}
          {renderSelect(
            "projectId",
            "Project",
            projects,
            (event) => onSelectChange(event, projects),
            plank.projectId,
            mode === "view"
          )}
          {renderSelect(
            "speciesId",
            "Species",
            species,
            (event) => onSelectChange(event, species),
            plank.speciesId,
            mode === "view"
          )}
          <TextFieldGridThird
            name="grade"
            label="Grade"
            value={plank.grade}
            onChange={onChange}
            disabled={mode === "view"}
          />
          <TextFieldGridThird
            name="length"
            label="Length (cm)"
            type="number"
            value={plank.length}
            onChange={onChange}
            disabled={mode === "view"}
          />
          <TextFieldGridThird
            name="width"
            label="Width (cm)"
            type="number"
            value={plank.width}
            onChange={onChange}
            disabled={mode === "view"}
          />
          <TextFieldGridThird
            name="depth"
            label="Depth (cm)"
            type="number"
            value={plank.depth}
            onChange={onChange}
            disabled={mode === "view"}
          />
        </Grid>

        <Grid
          item
          container
          xs={12}
          spacing={2}
          p={2}
          pb={5}
        
          // border={"solid 1px lightgray"}
          // borderRadius={3}
         
        >
          <TextFieldGridFull
            name="notes"
            label="Notes"
            value={plank.notes}
            onChange={onChange}
            multiline
            disabled={mode === "view"}
          
          />

          {mode === "view" ? (
            <Grid container spacing={2} p={2} >
              {plank.image1 && (
                <Grid item xs={6} >
                  <img
                    src={plank.image1}
                    alt="Plank Image 1"
                    style={{ width: "50%" }}
                  />
                </Grid>
              )}
              {plank.image2 && (
                <Grid item xs={6} >
                  <img
                    src={plank.image2}
                    alt="Plank Image 2"
                    style={{ width: "50%" }}
                  />
                </Grid>
              )}
            </Grid>
          ) : (
            <Grid
              item
              container
              xs={12}
              spacing={2}
              p={2}
           
              // border={"solid 1px lightgray"}
              // borderRadius={3}
            >
              <Grid
                container
                item
                xs={12}
                sm={12}
            
                alignContent={"center"}
                justifyContent={"space-around"}
              >
                <Grid p={1}>
                  <Button
                    component="label"
                    role={undefined}
                    variant="contained"
                    tabIndex={-1}
                    startIcon={<CloudUploadIcon />}
                  >
                    Upload Image1
                    <VisuallyHiddenInput
                      name="image1"
                      onChange={handleFileChange}
                      type="file"
                    />
                  </Button>
                  <Grid>
                    {imageFiles.image1 && <Grid>{imageFiles.image1.name}</Grid>}
                  </Grid>
                </Grid>
                <Grid p={1}>
                  <Button
                    component="label"
                    role={undefined}
                    variant="contained"
                    tabIndex={-1}
                    startIcon={<CloudUploadIcon />}
                  >
                    Upload Image2
                    <VisuallyHiddenInput
                      name="image2"
                      onChange={handleFileChange}
                      type="file"
                    />
                  </Button>
                  <Grid>
                    {imageFiles.image2 && <Grid>{imageFiles.image2.name}</Grid>}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          )}

          <Grid
            item
            container
            xs={12}
            spacing={2}
            p={2}
            // border={"solid 1px lightgray"}
            // borderRadius={3}
          >
            <CheckboxGrid
              name="furniture"
              label="Furniture"
              checked={plank.furniture}
              onChange={onChange}
              disabled={mode === "view"}
            />
            <CheckboxGrid
              name="construction"
              label="Construction"
              checked={plank.construction}
              onChange={onChange}
              disabled={mode === "view"}
            />
            <CheckboxGrid
              name="liveEdge"
              label="Live Edge"
              checked={plank.liveEdge}
              onChange={onChange}
              disabled={mode === "view"}
            />
            <CheckboxGrid
              name="general"
              label="General"
              checked={plank.general}
              onChange={onChange}
              disabled={mode === "view"}
            />
          </Grid>
        </Grid>

        {mode !== "view" && (
          <Grid item xs={12} p={2}>
            <Button
              variant="contained"
              color="primary"
              onClick={onSubmit}
              fullWidth
            >
              {mode === "add" ? "Add Plank" : "Update Plank"}
            </Button>
          </Grid>
        )}
      </Grid>
    </Grid>
  );
};

// Sub-components for specific input layouts

function TextFieldGrid({
  name,
  label,
  type = "text",
  value,
  onChange,
  multiline = false,
  disabled = false,
}) {
  return (
    <Grid item xs={12} sm={6}>
      <TextField
        fullWidth
        label={label}
        type={type}
        name={name}
        value={value || ""}
        onChange={onChange}
        required={!multiline}
        multiline={multiline}
        rows={multiline ? 4 : 1}
        disabled={disabled}
      />
    </Grid>
  );
}

function TextFieldGridThird({
  name,
  label,
  type = "text",
  value,
  onChange,
  multiline = false,
  disabled = false,
}) {
  return (
    <Grid item xs={12} sm={4}>
      <TextField
        fullWidth
        label={label}
        type={type}
        name={name}
        value={value || ""}
        onChange={onChange}
        required={!multiline}
        multiline={multiline}
        rows={multiline ? 4 : 1}
        disabled={disabled}
      />
    </Grid>
  );
}

function TextFieldGridFull({
  name,
  label,
  type = "text",
  value,
  onChange,
  multiline = false,
  disabled = false,
}) {
  return (
    <Grid item xs={12} sm={12}>
      <TextField
        fullWidth
        label={label}
        type={type}
        name={name}
        value={value || ""}
        onChange={onChange}
        required={!multiline}
        multiline={multiline}
        rows={multiline ? 4 : 1}
        disabled={disabled}
      />
    </Grid>
  );
}

function CheckboxGrid({ name, label, checked, onChange, disabled = false }) {
  return (
    <Grid item xs={12} sm={6}>
      <FormControlLabel
        control={
          <Checkbox
            name={name}
            checked={!!checked}
            onChange={onChange}
            disabled={disabled}
          />
        }
        label={label}
      />
    </Grid>
  );
}

function renderSelect(name, label, options, onChange, value, disabled = false) {
  return (
    <Grid item xs={12} sm={4}>
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

export default PlankForm;
