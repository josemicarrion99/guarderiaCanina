import React, { useState } from 'react';
import { Autocomplete } from '@react-google-maps/api';

const AddressSearch = ({ onPlaceSelect }) => {
  const [autocomplete, setAutocomplete] = useState(null);

  const handlePlaceSelect = () => {
    if (autocomplete !== null) {
      const addressObject = autocomplete.getPlace();
      onPlaceSelect(addressObject);
    } else {
      console.log('Autocomplete is not loaded yet!');
    }
  };

  return (
    <Autocomplete
      onLoad={setAutocomplete}
      onPlaceChanged={handlePlaceSelect}
    >
      <input type="text" placeholder="Search for an address" />
    </Autocomplete>
  );
};

export default AddressSearch;
