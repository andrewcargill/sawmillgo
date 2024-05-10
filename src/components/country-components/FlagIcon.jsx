import React from 'react';
import flags from 'country-flag-icons/react/3x2';

const FlagIcon = ({ countryCode }) => {
  const Flag = flags[countryCode]; // Access the flag component using the country code
  if (!Flag) return ""; // Return null if no flag is available for the given code

  return <Flag style={{ width: '50px', height: 'auto' }} />;
};

export default FlagIcon;
