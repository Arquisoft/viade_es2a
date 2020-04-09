import React from 'react';
import { Marker } from 'react-google-maps';

import { RouteViewContext } from '../../route-view.component';

function getMarkerIcon(id) {
  return new window.google.maps.MarkerImage(
    `img/icon/marker/${id}.svg`,
    null,
    null, /* origin */
    null,
    new window.google.maps.Size(32, 32)
  );
}

export const MapLocation = ({ point, index }) => {
  const iconMarker = getMarkerIcon(index);

  return (
    <RouteViewContext.Consumer>
      {props => (
        <Marker
          label={point.name}
          icon={iconMarker}
          position={point}
          onClick={() => props.onPointSelect(point, index)}
        />
      )}
    </RouteViewContext.Consumer>
  );
};