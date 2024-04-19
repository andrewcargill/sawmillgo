import React from "react";
import { Grid, FormControl, InputLabel, Select, MenuItem } from "@mui/material";

const StatusFilter = ({ allFilters, setAllFilters }) => {
  const handleChange = (event) => {
    const value = event.target.value === "" ? null : event.target.value;
    setAllFilters(prevFilters => ({
        ...prevFilters,
        status: value
    }));
};


    return (
        <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel id="status-label">Status</InputLabel>
              <Select
                labelId="status-label"  // Corrected from 'grade-label' to 'status-label'
                id="status"
                name="status"
                value={allFilters.status || ''}  // Handles null or empty as "Reset"
                label="Status"  // Corrected from 'Grade' to 'Status'
                onChange={handleChange}
              >
                <MenuItem value="">Reset</MenuItem>
                <MenuItem value="available">Available</MenuItem>
                <MenuItem value="reserved">Reserved</MenuItem>
                <MenuItem value="sold">Sold</MenuItem>
              </Select>
            </FormControl>
        </Grid>
    );
};

export default StatusFilter;
