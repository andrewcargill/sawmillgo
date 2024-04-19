import React, { useEffect, useState } from "react";
import { Grid, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { getFirestore } from "firebase/firestore";
import { app } from "../../../../firebase-config"
import { getAuth } from "firebase/auth";
import { fetchSpeciesForSawmill } from "../../../../utils/filestoreOperations";



const SpeciesFilter = ({ allFilters, setAllFilters, setOpenModal }) => {

  const [species, setSpecies] = useState([]);

  const db = getFirestore(app);
  const auth = getAuth(app);
  const currentUserUID = auth.currentUser ? auth.currentUser.uid : null;
  const sawmillId = JSON.parse(localStorage.getItem("user"))?.sawmillId;
  const userName = JSON.parse(localStorage.getItem("user"))?.displayName;

  useEffect(() => {
    if (sawmillId) {
      fetchSpeciesForSawmill(db, sawmillId)
        .then(setSpecies)
        .catch(console.error);
    }
  }, [db, sawmillId]);

  const handleChange = (event) => {
    const selectedId = event.target.value;
    if (selectedId === "") {
        setAllFilters(prevFilters => ({
            ...prevFilters,
            speciesId: null,
            speciesName: null
        }));
        setOpenModal(false);
        return;
    }

    // Find the selected species object from the species array
    const selectedSpecies = species.find(specie => specie.id === selectedId);
    if (selectedSpecies) {
        setAllFilters(prevFilters => ({
            ...prevFilters,
            speciesId: selectedSpecies.id,
            speciesName: selectedSpecies.name
        }));
    }
    setOpenModal(false);
};


    return (
      <Grid item xs={12}>
      <FormControl fullWidth>
        <InputLabel id="species-label">Species</InputLabel>
        <Select
    labelId="species-label"
    id="speciesId"
    name="speciesId"
    value={allFilters.speciesId || ''}  // Ensure the select is controlled by handling undefined values
    label="Species"
    onChange={handleChange}
>
    <MenuItem value="">
        Reset
    </MenuItem>
    {species.map((specie) => (
        <MenuItem key={specie.id} value={specie.id}>
            {specie.name}
        </MenuItem>
    ))}
</Select>

      </FormControl>
    </Grid>
    );
};

export default SpeciesFilter;
