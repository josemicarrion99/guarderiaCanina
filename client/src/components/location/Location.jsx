import {
  Button,
  ButtonGroup,
  HStack,
  Input,
  SkeletonText,
} from '@chakra-ui/react'

import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  Autocomplete,
  DirectionsRenderer,
} from '@react-google-maps/api'
import { useRef, useState } from 'react'

import { makeRequest } from "../../axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";


import './location.scss';

const center = { lat: 48.8584, lng: 2.2945 }

function Location({ setOpenLocation, user }) {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: ['places'],
  })

  const [map, setMap] = useState(/** @type google.maps.Map */(null))
  const [directionsResponse, setDirectionsResponse] = useState(null)

  const locationRef = useRef()

  console.log(locationRef)


  const queryClient = useQueryClient();

  const mutationUpdateUser = useMutation(
    (user) => {
      return makeRequest.put("/users", user);
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(["users"]);
        window.location.reload(false);
      },
    }
  );


  async function saveLocation() {
    if(locationRef.current.value === ''){
      return
    }
    
    user.city = locationRef.current.value;
    mutationUpdateUser.mutate(user);

  }

  return (
    <div className="location">
      <div className="container">
        <div className="wrapper">
              <Autocomplete>
                <input style={{ width: '100%' }} type='text' placeholder='Localización' ref={locationRef} />
              </Autocomplete>
              <div className="button">
                <button className='button-29-purple' type='submit' onClick={saveLocation}>
                  Aceptar
                </button>
              </div>
        </div>
      </div>
      <button className="close" onClick={() => setOpenLocation(false)}>&nbsp; X &nbsp; </button>
    </div>
  )
}

export default Location