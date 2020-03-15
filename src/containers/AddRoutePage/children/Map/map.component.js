import React, { useState } from 'react';

import {
  withScriptjs, withGoogleMap, GoogleMap, Marker
} from 'react-google-maps';

const Map = withScriptjs(withGoogleMap(({ onPointAdded }) => {

  const [points, setPoints] = useState([]);

  const onMapClicked = e => {
    const point = { lat: e.latLng.lat(), lng: e.latLng.lng() };
    onPointAdded(point);
    setPoints(points.concat(point));
  }

  return (
    <GoogleMap
      onClick={onMapClicked}
      defaultZoom={3}
      defaultCenter={{ lat: 46.1262, lng: 10.2097 }}
      options={{ streetViewControl: false }}
      mapTypeId={'terrain'}>

      {points.map((point, index) => <Marker key={index} position={point} />)}

    </GoogleMap>
  );
}))

export default Map;