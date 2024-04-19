import React from "react";
import { Grid, FormControl, InputLabel, Select, MenuItem } from "@mui/material";

const GradeFilter = ({ allFilters, setAllFilters, setOpenModal }) => {

    const handleChange = (event) => {
        const value = event.target.value === "" ? null : event.target.value; 
        setAllFilters(prevFilters => ({
            ...prevFilters,
            grade: value
        }));
        setOpenModal(false);
    };
    return (
        <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel id="grade-label">Grade</InputLabel>
              <Select
                labelId="grade-label"
                id="grade"
                name="grade"
                value={allFilters.grade || ''}  
                label="Grade"
                onChange={handleChange}
              >
                <MenuItem value="1">1</MenuItem>
                <MenuItem value="2">2</MenuItem>
                <MenuItem value="3">3</MenuItem>
              </Select>
            </FormControl>
        </Grid>
    );
};

export default GradeFilter;
