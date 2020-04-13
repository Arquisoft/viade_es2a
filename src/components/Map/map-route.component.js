import React, { useState } from 'react';

import {
  Marker, Polyline
} from 'react-google-maps';

import { RouteMapContext } from '@containers/MyRoutes/my-routes.component';

import { mapUtils } from '@utils';

export const MapRoute = ({ route }) => {

  const center = route.points ? route.points[0] : { lat: 0, lng: 0 };
  const iconMarker = mapUtils.getMarkerIcon(route.color.markerId);

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
  );
};
