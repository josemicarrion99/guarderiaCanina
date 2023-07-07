import './location.scss';
import {
  useJsApiLoader,
  Autocomplete,
} from '@react-google-maps/api'
import { useRef } from 'react'

import { useContext } from "react";
import { AuthContext } from "../../context/authContext";

import { makeRequest } from "../../axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

function Location({ setOpenLocation, user }) {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: ['places'],
  })


  const locationRef = useRef()

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


  if (!isLoaded) {
    return <div>Ha occurrido algun error...</div> 
  }


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