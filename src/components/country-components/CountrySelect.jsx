import React, { useState, useEffect } from 'react';
import { TextField, MenuItem } from '@mui/material';

function CountrySelect({ country, setCountry }) {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    fetch('https://restcountries.com/v3.1/all')
      .then(response => response.json())
      .then(data => {
        const sortedData = data.map((country) => ({
          code: country.cca2,
          name: country.name.common,
          flag: country.flags.svg // Using SVG flags
        })).sort((a, b) => a.name.localeCompare(b.name));  // Sorting alphabetically by name
        setCountries(sortedData);
      });
  }, []);

  useEffect(() => {
    console.log('Selected country:', country);
  } , [country]);

  return (
    <TextField
      select
      label="Select Country"
      value={country}
      onChange={(e) => setCountry(e.target.value)}
      fullWidth
    >
      {countries.map((country) => (
        <MenuItem key={country.code} value={country.code}>
          <img src={country.flag} alt={`${country.name} flag`} style={{ width: '20px', marginRight: '10px' }} />
          {country.name}
        </MenuItem>
      ))}
    </TextField>
  );
}

export default CountrySelect;
