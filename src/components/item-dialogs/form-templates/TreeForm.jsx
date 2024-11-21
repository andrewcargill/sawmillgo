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
  Container,
} from "@mui/material";

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
    <Grid Container display={'flex'} justifyContent={'space-between'}  >
    <Grid
    item
    xs={6}
    sx={{
      
      padding: 2,
      display: "flex",
      flexDirection: "column",
      gap: 1,
    }}
  >      <Typography variant="h6">Tree: {tree?.refId}</Typography>
      <Typography>Date Felled: {tree.date}</Typography>
      <Typography>Species: {getSpeciesName(tree.speciesId)}</Typography>
      <Typography>Location: {getLocationName(tree.locationId)}</Typography>
      <Typography>Age: {tree.age}</Typography>
      <Typography>Lumberjack: {tree.lumberjackName}</Typography>
      <Typography>Reason: {tree.reason}</Typography>
      {hasLogs ? renderLogs() :'Tree is not logged'}
    
      </Grid>
      <Grid
    item
    xs={6}
    sx={{
      padding: 2,
      display: "flex",
      justifyContent: "center", // Centers the image
      alignItems: "center",
    }}
  >
    {hasImage && (
      <img
        src={tree.image}
        alt="Tree"
        style={{
          maxHeight: "100%",
          maxWidth: "100%",
          objectFit: "contain", // Ensures the entire image is visible
        }}
      />
    )}
  </Grid>
     

    </Grid>
     
    </>
  );

  const renderEditAddLayout = () => (
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
      {hasImage && (
        <Grid container spacing={2} p={2}>
          <Grid item xs={6}>
            <img src={tree.image} alt="Tree Image" style={{ width: "50%" }} />
          </Grid>
        </Grid>
      )}
      <Grid item xs={12}>
        <Button type="submit" variant="contained" color="primary">
          Save
        </Button>
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

  return <form onSubmit={onSubmit}>{mode === "view" ? renderViewLayout() : renderEditAddLayout()}</form>;
};


// function renderSelect(name, label, options, onChange, value, disabled = false) {
//   return (
//     <Grid item xs={12} sm={6}>
//       <FormControl fullWidth>
//         <InputLabel id={`${name}-label`}>{label}</InputLabel>
//         <Select
//           labelId={`${name}-label`}
//           id={name}
//           name={name} // Properly set the name attribute
//           value={value || ""}
//           label={label}
//           onChange={(event) => onChange(event, options)} // Pass event and options correctly
//           disabled={disabled}
//         >
//           {label === "Project" && <MenuItem value="">No Project</MenuItem>}
//           {options.map((option) => (
//             <MenuItem key={option.id} value={option.id}>
//               {option.name}
//             </MenuItem>
//           ))}
//         </Select>
//       </FormControl>
//     </Grid>
//   );
// }
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
