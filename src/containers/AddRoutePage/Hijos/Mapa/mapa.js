import React, {useState} from 'react';

// import { NavBar } from "@components";
import {
  withScriptjs, withGoogleMap, GoogleMap, Marker
} from 'react-google-maps'


const Mapa = (props) => {

  
  const points=[{ lat: -34.397, lng: 150.644 },{ lat: -35.397, lng: 150.644 }];
/*    {points.map(point => {
        return(
         < Marker 
          position={point} 
          onMouseOver={() => setVisible(!visible)}
          onMouseOut={() => setVisible(!visible)}
          onClick={() => setSelected(!selected)}
      />
      
      )})}*/
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(false);

  function handleClick(event) {
    var lat1 = event.latLng.lat(), lng1 = event.latLng.lng()

    points.push({lat: lat1,lng: lng1});
    console.log(points[points.length-1].lat+" y "+points[points.length-1].lng);
   
    {points.map(point => {
      return(
        
       < Marker 
        position={point}
        onMouseOver={() => setVisible(!visible)}
        onMouseOut={() => setVisible(!visible)}
        onClick={() => setSelected(!selected)}
    />
    
    )})}
  }

    return (
      <GoogleMap
        defaultZoom={7}
        defaultCenter={{ lat: 43.355157, lng: -5.851254 }}
        options={{ streetViewControl: false }}
        mapTypeId={'terrain'}
        onClick={(e) => handleClick(e)}/>
   
    )
  };
  
  export default withScriptjs(withGoogleMap(Mapa));
  