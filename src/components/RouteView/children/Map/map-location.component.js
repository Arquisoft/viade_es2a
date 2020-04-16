import React from 'react';
import { Marker } from 'react-google-maps';

import { RouteViewContext } from '../../route-view.component';

import { mapUtils } from '@utils';

export const MapLocation = ({ point, index }) => {
  const iconMarker = mapUtils.getMarkerIcon(index);

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