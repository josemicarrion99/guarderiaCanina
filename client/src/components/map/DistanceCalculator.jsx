import React, { useEffect, useState } from 'react';

const DistanceCalculator = ({ origin, destination }) => {
  const [distance, setDistance] = useState(null);

  useEffect(() => {
    // Create a new DistanceMatrixService instance
    const service = new window.google.maps.DistanceMatrixService();

    // Prepare the request object
    const request = {
      origins: [convertToLatLngOrAddress(origin)],
      destinations: [convertToLatLngOrAddress(destination)],
      travelMode: 'DRIVING',
    };

    // Call the Distance Matrix API
    service.getDistanceMatrix(request, (response, status) => {
      if (status === 'OK' && response.rows.length > 0) {
        // Extract the distance value from the response
        const distanceValue = response.rows[0].elements[0].distance.value;
        // Convert the distance from meters to desired unit (e.g., kilometers, miles, etc.)
        const distanceInKilometers = distanceValue / 1000;
        // Update the state with the calculated distance
        setDistance(distanceInKilometers);
      } else {
        // Handle error cases
        console.error('Error calculating distance:', status);
      }
    });
  }, [origin, destination]);

  const convertToLatLngOrAddress = (value) => {
    if (typeof value === 'string') {
      return value; // If it's a string, assume it's an address
    } else if (value.hasOwnProperty('lat') && value.hasOwnProperty('lng')) {
      return new window.google.maps.LatLng(value.lat, value.lng); // If it has lat and lng properties, assume it's a LatLng object
    } else {
      throw new Error(`Invalid origin/destination format: ${JSON.stringify(value)}`);
    }
  };

  return (
    <div>
      {distance !== null ? (
        <p>Distance between {origin} and {destination}: {distance} km</p>
      ) : (
        <p>Calculating distance...</p>
      )}
    </div>
  );
};

export default DistanceCalculator;
