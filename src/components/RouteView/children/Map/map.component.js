import React, { useState } from 'react';

import { MapLocation } from './map-location.component';

import {
  withScriptjs, withGoogleMap, GoogleMap, Polyline, Marker
} from 'react-google-maps';

import { mapUtils } from '@utils';

const Map = withScriptjs(withGoogleMap(({ route, mapRef, onDistanceLoad }) => {

  const [location, setLocation] = useState();
  mapUtils.getLocation(setLocation);

  const points = route.waypoints;
  const trackpoints = route.points;
  let center = trackpoints && trackpoints[0] ? trackpoints[0] : { lat: 0, lng: 0 };

  const polyline = React.useRef();

  return <GoogleMap
    onTilesLoaded={() => onDistanceLoad(mapUtils.computeDistance(polyline.current))}
    ref={mapRef}
    defaultZoom={7}
    defaultCenter={center}
    options={{ streetViewControl: false, zoomControl: false, mapTypeControl: false }}
    mapTypeId={'terrain'}
  >

    <Polyline
      ref={polyline}
      options={{
        strokeColor: route.color.hexCode,
        strokeOpacity: .7,
        strokeWeight: 2
      }}
      path={trackpoints}
    />

    {location && <Marker icon={mapUtils.getMarkerIcon('location')} position={location} />}

    {
      points.map((point, index) => {
        return <MapLocation key={index} {... { point, index }} />;
      })
    }

    {trackpoints && trackpoints.length &&
      <div>
        <MapLocation {... { point: trackpoints[0], index: 'start' }} />
        {trackpoints.length > 1 &&
          <MapLocation {... { point: trackpoints[trackpoints.length - 1], index: 'finish' }} />}
      </div>
    }
  </GoogleMap>;
}));

export default Map;
