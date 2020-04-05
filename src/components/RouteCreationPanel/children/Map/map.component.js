import React from 'react';

import {
  withScriptjs, withGoogleMap, GoogleMap, Marker, Polyline
} from 'react-google-maps';

const Map = withScriptjs(withGoogleMap(({ waypoints, trackpoints, onPointAdd, onPointDragged, onTrackpointDelete }) => {

  const trackpointIcon = new window.google.maps.MarkerImage(
    `img/icon/marker/0.svg`, null, null, null,
    new window.google.maps.Size(32, 32));

  const waypointIcon = new window.google.maps.MarkerImage(
    `img/icon/marker/1.svg`, null, null, null,
    new window.google.maps.Size(32, 32));

  const readPoint = e => {
    return { lat: e.latLng.lat(), lng: e.latLng.lng() };
  };

  const onMapClicked = e => {
    onPointAdd(readPoint(e));
  };

  const onDrag = (index, e, waypoint) => {
    onPointDragged(index, readPoint(e), waypoint);
  };

  return (
    <GoogleMap
      onClick={onMapClicked}
      defaultZoom={3}
      defaultCenter={{ lat: 46.1262, lng: 10.2097 }}
      options={{ streetViewControl: false }}
      mapTypeId={'terrain'}>

      <Polyline
        options={{
          strokeOpacity: .7,
          strokeWeight: 2
        }}
        path={trackpoints}
      />

      {waypoints.map((point, index) => <Marker
        key={index}
        draggable={true}
        onDragEnd={e => onDrag(index, e, true)}
        icon={waypointIcon}
        position={point}
      />)}

      {trackpoints.map((point, index) => <Marker
        key={index}
        draggable={true}
        onDragEnd={e => onDrag(index, e, false)}
        position={point}
        icon={trackpointIcon}
        onClick={() => onTrackpointDelete(index)}
      />)}

    </GoogleMap>
  );
}))

export default Map;