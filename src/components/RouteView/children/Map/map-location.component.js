import React, { useState } from 'react';
import { Marker } from 'react-google-maps'

import { RouteViewContext } from '../../route-view.component'

export const MapLocation = ({ point, index }) => {
  const iconMarker = getMarkerIcon(index);

  return (
    <RouteViewContext.Consumer>
      {props => (
        <Marker
          label={point.name}
          icon={iconMarker}
          position={point}
          onClick={() => props.setState({ selectedPoint: props.state.selectedPoint === index ? null : index })}
        />
      )}
    </RouteViewContext.Consumer>
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
