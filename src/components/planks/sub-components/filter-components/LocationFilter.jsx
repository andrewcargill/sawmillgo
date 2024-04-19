import React, { useEffect, useState } from "react";
import { Grid, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { getFirestore } from "firebase/firestore";
import { app } from "../../../../firebase-config"
import { getAuth } from "firebase/auth";
import { fetchLocationsForSawmill } from "../../../../utils/filestoreOperations";



const LocationFilter = ({ allFilters, setAllFilters, setOpenModal }) => {
 
    const [locations, setLocations] = useState([]);

  const db = getFirestore(app);
  const auth = getAuth(app);
  const currentUserUID = auth.currentUser ? auth.currentUser.uid : null;
  const sawmillId = JSON.parse(localStorage.getItem("user"))?.sawmillId;
  const userName = JSON.parse(localStorage.getItem("user"))?.displayName;

  useEffect(() => {
    if (sawmillId) {
        fetchLocationsForSawmill(db, sawmillId)
        .then(setLocations)
        .catch(console.error);
    }
  }, [db, sawmillId]);

  const handleChange = (event) => {
    const selectedId = event.target.value;
    if (selectedId === "") {
        setAllFilters(prevFilters => ({
            ...prevFilters,
            locationId: null,
            locationName: null
        }));
        setOpenModal(false);
        return;
    }

    const selectedLocation = locations.find(location => location.id === selectedId);
    if (selectedLocation) {
        setAllFilters(prevFilters => ({
            ...prevFilters,
            locationId: selectedLocation.id,
            locationName: selectedLocation.name
        }));
    }
    setOpenModal(false);
};


    return (
        <Grid item xs={12} sm={6}>
        <FormControl fullWidth>
          <InputLabel id="location-label">Location</InputLabel>
          <Select
            labelId="location-label"
            id="locationId"
            name="locationId"
            value={allFilters?.locationId}
            label="location"
            onChange={handleChange}
            required
          >
            {locations.map((location) => (
              <MenuItem key={location.id} value={location.id}>
                {location.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
    );
};

export default LocationFilter;
