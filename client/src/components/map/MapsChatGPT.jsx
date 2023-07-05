import React, { useState } from 'react';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
import DistanceCalculator from './DistanceCalculator';

const LocationForm = () => {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');

  const handleOriginChange = (address) => {
    setOrigin(address);
  };

  const handleOriginSelect = (address) => {
    setOrigin(address);
  };

  const handleDestinationChange = (address) => {
    setDestination(address);
  };

  const handleDestinationSelect = (address) => {
    setDestination(address);
  };

  const handleCalculateDistance = () => {
    geocodeByAddress(origin)
      .then((originResults) => getLatLng(originResults[0]))
      .then((originLatLng) =>
        geocodeByAddress(destination).then((destinationResults) =>
          getLatLng(destinationResults[0]).then((destinationLatLng) => {
            // Calculate and display the distance
            console.log('Origin:', originLatLng);
            console.log('Destination:', destinationLatLng);
          })
        )
      )
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <div>
      <h2>Location Form</h2>
      <div>
        <label>Origin:</label>
        <PlacesAutocomplete
          value={origin}
          onChange={handleOriginChange}
          onSelect={handleOriginSelect}
        >
          {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
            <div>
              <input {...getInputProps({ placeholder: 'Origin' })} />
              <div>
                {loading && <div>Loading...</div>}
                {suggestions.map((suggestion, index) => {
                  const { placeId, description } = suggestion;
                  return (
                    <div
                      key={placeId}
                      {...getSuggestionItemProps({ suggestion })}
                    >
                      {description}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </PlacesAutocomplete>
      </div>
      <div>
        <label>Destination:</label>
        <PlacesAutocomplete
          value={destination}
          onChange={handleDestinationChange}
          onSelect={handleDestinationSelect}
        >
          {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
            <div>
              <input {...getInputProps({ placeholder: 'Destination' })} />
              <div>
                {loading && <div>Loading...</div>}
                {suggestions.map((suggestion, index) => {
                  const { placeId, description } = suggestion;
                  return (
                    <div
                      key={placeId}
                      {...getSuggestionItemProps({ suggestion })}
                    >
                      {description}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </PlacesAutocomplete>
      </div>
      <button onClick={handleCalculateDistance}>Calculate Distance</button>
      {origin && destination && (
        <DistanceCalculator origin={origin} destination={destination} />
      )}
    </div>
  );
};

export default LocationForm;
