import React, { useState } from 'react';

import {
  withScriptjs, withGoogleMap, GoogleMap, Marker
} from 'react-google-maps';

const Map = withScriptjs(withGoogleMap(({ onPointAdded }) => {

  const [points, setPoints] =  useState([]);

  const onMapClicked = e => {
    const point = { lat: e.latLng.lat(), lng: e.latLng.lng() };
    onPointAdded(point);
    setPoints(points.concat(point));
  }

  return (
    <GoogleMap
      onClick={onMapClicked}
      defaultZoom={5}
      defaultCenter={{ lat: -34.397, lng: 150.644 }}
      options={{ streetViewControl: false }}
      mapTypeId={'terrain'}>

      {points.map(point => <Marker position={point} />)}

    </GoogleMap>
  );
}))

export default Map;