import React from 'react';

// import { NavBar } from "@components";
import {
  withScriptjs, withGoogleMap, GoogleMap, Marker
} from 'react-google-maps'


const Mapa = (props) => {

  function handleClick(event) {
    var lat1 = event.latLng.lat(), lng1 = event.latLng.lng()
    console.log(lat1+" "+lng1);
    
    
  }
    return (
      <GoogleMap
        defaultZoom={7}
        defaultCenter={{ lat: -34.397, lng: 150.644 }}
        options={{ streetViewControl: false }}
        mapTypeId={'terrain'}
        onClick={(e) => handleClick(e)}>
         
      </GoogleMap>
    )
  };
  
  export default withScriptjs(withGoogleMap(Mapa));
  