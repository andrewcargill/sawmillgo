import React, { useState, useEffect } from 'react';

function CountryNameFromCode({ countryCode }) {
  const [countryName, setCountryName] = useState('');

  useEffect(() => {
    // Fetch the country data based on the country code
    fetch(`https://restcountries.com/v3.1/alpha/${countryCode}`)
      .then(response => response.json())
      .then(data => {
        // Set the common name of the country
        setCountryName(data[0].name.common);
      })
      .catch(error => console.error('Error fetching country data:', error));
  }, [countryCode]);

  return countryName;
}

export default CountryNameFromCode;
