import React, { useState } from 'react';

import {
  Marker, Polyline
} from 'react-google-maps'

import { RouteMapContext } from '../../route-map.component'

import styled from 'styled-components';

export const CollapseButton = styled.button`
  background: none rgb(255, 255, 255);
  border: 0px;
  margin: 0 10px;
  padding: 0px;
  position: absolute;
  cursor: pointer;
  user-select: none;
  border-radius: 2px;
  height: 40px;
  width: 40px;
  box-shadow: rgba(0, 0, 0, 0.3) 0px 1px 4px -1px;
  overflow: hidden;
  top: 60px;
  right: 0px;
  font-size: 1.75em;
  z-index: 10000;
`

export const MapRoute = ({ route }) => {

  const center = route.points ? route.points[0] : { lat: 0, lng: 0 };
  const iconMarker = getMarkerIcon(route.color.markerId);

  const [visible, setVisible] = useState(false);

  return (
    <RouteMapContext.Consumer>
      {props => (
        <div>
          {props.collapsed &&
            <CollapseButton onClick={() => props.setCollapsed(false)}>
              ⇠
            </CollapseButton>
          }

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
