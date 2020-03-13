import React from 'react';

import { MapRoute } from './map-route.component';

import {
  withScriptjs, withGoogleMap, GoogleMap
} from 'react-google-maps'

const Map = withScriptjs(withGoogleMap(props => {
  const { routes } = props;

  return (
    <GoogleMap
      defaultZoom={7}
      defaultCenter={{ lat: -34.397, lng: 150.644 }}
      options={{ streetViewControl: false }}
      mapTypeId={'terrain'}
    >

      {
        routes.map(route => {
          return (
            <MapRoute key={route.id} {... { route }} />
          )
        })
      }
    </GoogleMap>
  )
}));

export default Map;
