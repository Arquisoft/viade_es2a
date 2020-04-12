import React from 'react';

import { MapRoute } from './map-route.component';

import {
  withScriptjs, withGoogleMap, GoogleMap
} from 'react-google-maps'

const Map = withScriptjs(withGoogleMap(({ routes, mapRef }) => {

  let center = { lat: 0, lng: 0 };
  if (routes && routes.length && routes[0].points && routes[0].points[0])
    center = routes[0].points[0];

  return <GoogleMap
    ref={mapRef}
    defaultZoom={5}
    defaultCenter={center}
    options={{ streetViewControl: false }}
    mapTypeId={'terrain'}
  >

    {
      routes.map(route => <MapRoute key={route.id} {... { route }} />)
    }
  </GoogleMap>;
}));

export default Map;