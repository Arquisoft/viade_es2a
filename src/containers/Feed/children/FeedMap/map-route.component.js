import React, { Component, useState } from 'react';
import {
  Marker, Polyline
} from 'react-google-maps'

import { FeedContext } from '../../feed.component'

export const MapRoute = props => {
  const { route } = props;

  const iconMarker = getMarkerIcon(route.color.markerId);

  const [visible, setVisible] = useState(false);

  return (
    <FeedContext.Consumer>
      {props => (
        <div>
          <Polyline
            options={{
              strokeColor: route.color.hexCode,
              strokeOpacity: props.state.selectedRoute == route.id ? 1 : .3,
              strokeWeight: 2
            }}
            visible={visible || props.state.selectedRoute == route.id}
            path={route.points}
          />

          <Marker
            label={route.name}
            icon={iconMarker}
            position={route.points[0]}
            onMouseOver={() => setVisible(!visible)}
            onMouseOut={() => setVisible(!visible)}
            onClick={() => props.setState({ selectedRoute: route.id })}
          />
        </div>
      )}
    </FeedContext.Consumer>
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
