import React, { Component, useState } from 'react';
import { CenterContainer } from '@util-components';
import { useTranslation } from 'react-i18next';
// import { NavBar } from "@components";
import {
  withScriptjs, withGoogleMap, GoogleMap, Marker, Polyline
} from 'react-google-maps'

const Mapa = (props) => {
    
    return (
      <GoogleMap
        defaultZoom={7}
        defaultCenter={{ lat: -34.397, lng: 150.644 }}
        options={{ streetViewControl: false }}
        mapTypeId={'terrain'}>
      </GoogleMap>
    )
  };
  
  export default withScriptjs(withGoogleMap(Mapa));
  