import React from 'react';

import { MapLocation } from './map-location.component';

import {
  withScriptjs, withGoogleMap, GoogleMap, Polyline
} from 'react-google-maps'

const Map = withScriptjs(withGoogleMap(({ route }) => {

  const points = route.points;
  let center = points ? points[0] : { lat: 0, lng: 0 };

  return (
    <GoogleMap
      defaultZoom={7}
      defaultCenter={center}
      options={{ streetViewControl: false, zoomControl: false, mapTypeControl: false }}
      mapTypeId={'terrain'}
    >

      <Polyline
        options={{
          strokeColor: route.color.hexCode,
          strokeOpacity: .7,
          strokeWeight: 2
        }}
        path={points}
      />

      {
        points.map((point, index) => {
          return (
            <MapLocation key={index} {... { point, index }} />
          )
        })
      }
    </GoogleMap>
  )
}));

export default Map;
