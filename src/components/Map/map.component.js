import React, { useState } from 'react';

import { MapRoute } from './map-route.component';

import {
  withScriptjs, withGoogleMap, GoogleMap, Marker
} from 'react-google-maps';

import { mapUtils } from '@utils';

const Map = withScriptjs(withGoogleMap(({ routes, mapRef }) => {

  const [location, setLocation] = useState();
  mapUtils.getLocation(setLocation);

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

    {location && <Marker icon={mapUtils.getMarkerIcon('location')} position={location} />}

    {routes.map(route => <MapRoute key={route.id} {... { route }} />)}

  </GoogleMap>;
}));

export default Map;