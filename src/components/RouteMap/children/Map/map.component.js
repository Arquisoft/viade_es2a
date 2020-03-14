import React from 'react';

import { MapRoute } from './map-route.component';

import {
  withScriptjs, withGoogleMap, GoogleMap
} from 'react-google-maps'

const Map = withScriptjs(withGoogleMap(props => {
  const { routes } = props;

  let center = { lat: 0, lng: 0 };
  if (routes && routes[0] && routes[0].points)
    center = routes[0].points[0];

  return (
    <GoogleMap
      defaultZoom={6}
      defaultCenter={center}
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