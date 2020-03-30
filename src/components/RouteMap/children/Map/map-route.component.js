import React, { useState } from 'react';

import {
  Marker, Polyline
} from 'react-google-maps';

import { RouteMapContext } from '../../route-map.component';

export const MapRoute = ({ route }) => {

  const center = route.points ? route.points[0] : { lat: 0, lng: 0 };
  const iconMarker = getMarkerIcon(route.color.markerId);

  const [visible, setVisible] = useState(false);

  return (
    <RouteMapContext.Consumer>
      {props => (
        <div>
          <Polyline
            options={{
              strokeColor: route.color.hexCode,
              strokeOpacity: props.selectedRoute === route.id ? 1 : .3,
              strokeWeight: 2
            }}
            visible={visible || props.selectedRoute === route.id}
            path={route.points}
          />

          <Marker
            label={route.name}
            icon={iconMarker}
            position={center}
            onMouseOver={() => setVisible(!visible)}
            onMouseOut={() => setVisible(!visible)}
            onClick={() => props.onRouteSelect(route)}
          />
        </div>
      )}
    </RouteMapContext.Consumer>
  )
}

function getMarkerIcon(id) {
  return new window.google.maps.MarkerImage(
    `/img/icon/marker/${id}.svg`,
    null,
    null, /* origin */
    null,
    new window.google.maps.Size(32, 32)
  );
}
