import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore";
import {
  Button,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Checkbox,
  FormControlLabel,
  styled,
} from "@mui/material";
import { app } from "../../firebase-config";
import {
  fetchLocationsForSawmill,
  fetchProjectsForSawmill,
  fetchSpeciesForSawmill,
} from "../../utils/filestoreOperations";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
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

const EditPlank = () => {
  const [plank, setPlank] = useState(null);
  const [imageFiles, setImageFiles] = useState({
    image1: null,
    image2: null,
  });
  const [species, setSpecies] = useState([]);
  const [locations, setLocations] = useState([]);
  const [projects, setProjects] = useState([]);
  const { plankId } = useParams();
  const navigate = useNavigate();
  const db = getFirestore(app);
  const sawmillId = JSON.parse(localStorage.getItem("user"))?.sawmillId;

  useEffect(() => {
    const fetchPlankAndData = async () => {
      const plankRef = doc(db, `sawmill/${sawmillId}/planks`, plankId);
      const plankSnap = await getDoc(plankRef);
      if (plankSnap.exists()) {
        setPlank({ id: plankSnap.id, ...plankSnap.data() });
      } else {
        alert("Plank not found!");
        navigate("/planks");
      }
    };

    fetchPlankAndData();
    fetchLocationsForSawmill(db, sawmillId)
      .then(setLocations)
      .catch((error) => alert(error.message));
    fetchProjectsForSawmill(db, sawmillId)
      .then((fetchedProjects) => {
        const normalizedProjects = fetchedProjects.map((project) => ({
          id: project.id,
          name: project.projectName,
        }));
        setProjects(normalizedProjects);
      })
      .catch(console.error);
    fetchSpeciesForSawmill(db, sawmillId)
      .then(setSpecies)
      .catch((error) => alert(error.message));
  }, [plankId, db, sawmillId, navigate]);

  const handleFileChange = (event) => {
    const { name, files } = event.target;
    setImageFiles((prev) => ({ ...prev, [name]: files[0] }));
  };

  const uploadImage = async (file) => {
    if (!file) return null;
    const storage = getStorage(app);
    const storageRef = ref(
      storage,
      `planks/${sawmillId}/${file.name}_${new Date().getTime()}`
    );
    await uploadBytes(storageRef, file);
    return getDownloadURL(storageRef);
  };

  const handleInputChange = (e) => {
    const { name, value, checked, type } = e.target;
    let actualValue;

    switch (type) {
      case "checkbox":
        actualValue = checked;
        break;
      case "number":
        actualValue = value === "" ? "" : parseFloat(value);
        if (isNaN(actualValue)) {
          actualValue = value;
        }
        break;
      default:
        actualValue = value;
        break;
    }

    setPlank((prev) => ({
      ...prev,
      [name]: actualValue,
    }));
  };

  const handleSelectChange = (event, data) => {
    const { name, value } = event.target;
    // Remove the last 2 characters "Id" from the name before appending "Name"
    const baseName = name.slice(0, -2);
    const selectedItem = data.find((item) => item.id === value);
    setPlank((prev) => ({
      ...prev,
      [name]: value,
      [`${baseName}Name`]: selectedItem ? selectedItem.name : "",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Start by uploading the new images if any are selected
    const newImage1Url = imageFiles.image1 ? await uploadImage(imageFiles.image1) : null;
    const newImage2Url = imageFiles.image2 ? await uploadImage(imageFiles.image2) : null;

    // Prepare the update object, only adding image URLs if they've been updated
    const updateData = {
      ...plank,
      ...(newImage1Url ? { image1: newImage1Url } : {}),
      ...(newImage2Url ? { image2: newImage2Url } : {}),
    };

    const plankRef = doc(db, `sawmill/${sawmillId}/planks`, plankId);
    try {
      await updateDoc(plankRef, updateData);
      alert("Plank updated successfully!");
      navigate("/planks");
    } catch (error) {
      console.error("Failed to update plank:", error);
      alert("Error updating plank.");
    }
};


  return (
    <Grid container>
      <Typography variant="h4" gutterBottom>
        Edit Plank: {plank?.refId}
      </Typography>
      {plank ? (
        <Grid container spacing={2}>
          <TextFieldGrid
            name="date"
            label="Date"
            type="date"
            value={plank.date}
            onChange={handleInputChange}
          />
          <TextFieldGrid
            name="length"
            label="Length (cm)"
            value={plank.length}
            onChange={handleInputChange}
          />
          <TextFieldGrid
            name="width"
            label="Width (cm)"
            value={plank.width}
            onChange={handleInputChange}
          />
          <TextFieldGrid
            name="depth"
            label="Depth (cm)"
            value={plank.depth}
            onChange={handleInputChange}
          />

          <TextFieldGrid
            name="grade"
            label="Grade"
            value={plank.grade}
            onChange={handleInputChange}
          />
          <TextFieldGrid
            name="notes"
            label="Notes"
            value={plank.notes}
            onChange={handleInputChange}
            multiline
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
          <Grid
            container
            item
            p={1}
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
          <CheckboxGrid
            name="furniture"
            label="Furniture"
            checked={plank.furniture}
            onChange={handleInputChange}
          />
          <CheckboxGrid
            name="construction"
            label="Construction"
            checked={plank.construction}
            onChange={handleInputChange}
          />
          <CheckboxGrid
            name="liveEdge"
            label="Live Edge"
            checked={plank.liveEdge}
            onChange={handleInputChange}
          />
          <CheckboxGrid
            name="general"
            label="General"
            checked={plank.general}
            onChange={handleInputChange}
          />

          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              fullWidth
            >
              Update Plank
            </Button>
          </Grid>
        </Grid>
      ) : (
        <p>Loading plank details...</p>
      )}
    </Grid>
  );
};

function TextFieldGrid({
  name,
  label,
  type = "text",
  value,
  onChange,
  multiline = false,
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
      />
    </Grid>
  );
}

function CheckboxGrid({ name, label, checked, onChange }) {
  return (
    <Grid item xs={12} sm={6}>
      <FormControlLabel
        control={
          <Checkbox name={name} checked={!!checked} onChange={onChange} />
        }
        label={label}
      />
    </Grid>
  );
}

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
          label={label}
          onChange={onChange}
        >
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

export default EditPlank;
