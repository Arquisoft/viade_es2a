import React from 'react';

import {
  withScriptjs, withGoogleMap, GoogleMap, Marker, Polyline
} from 'react-google-maps';

import { mapUtils } from '@utils';

const Map = withScriptjs(withGoogleMap((
  { waypoints,
    trackpoints,
    onPointAdd,
    onPointDragged,
    onTrackpointDelete,
    onDistanceChange
  }) => {

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
    updateDistance();
  };

  const updateDistance = () => {
    onDistanceChange(mapUtils.computeDistance(polyline.current));
  };

  const onDrag = (index, e, waypoint) => {
    onPointDragged(index, readPoint(e), waypoint);
    updateDistance();
  };

  const onTMarkerClick = (index) => {
    onTrackpointDelete(index);
    updateDistance();
  };

  const polyline = React.useRef();

  let center = trackpoints && trackpoints.length &&
    trackpoints[0] ? trackpoints[0] : { lat: 0, lng: 0 };

  return (
    <GoogleMap
      onTilesLoaded={updateDistance}
      onClick={onMapClicked}
      defaultZoom={trackpoints && trackpoints.length ? 12 : 5}
      defaultCenter={center}
      options={{ streetViewControl: false }}
      mapTypeId={'terrain'}>

      <Polyline
        ref={polyline}
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
        onClick={() => onTMarkerClick(index)}
      />)}

    </GoogleMap>
  );
}))

export default Map;