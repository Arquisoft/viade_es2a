import React, { Component, useState } from 'react';
import {
  Marker, Polyline
} from 'react-google-maps'

export const MapRoute = props => {
  const { route, handleClick } = props;

  const iconMarker = getMarkerIcon(route.color.markerId);

  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(false);

  const onClick = () => {
    setSelected(!selected);
    handleClick(route.id);
  }

  return (
    <div>
      <Polyline
        options={{
          strokeColor: route.color.hexCode,
          strokeOpacity: selected ? 1 : .3,
          strokeWeight: 2
        }}
        visible={visible || selected}
        path={route.points}
      />

      <Marker
        label={route.name}
        icon={iconMarker}
        position={route.points[0]}
        onMouseOver={() => setVisible(!visible)}
        onMouseOut={() => setVisible(!visible)}
        onClick={onClick}
      />
    </div>
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
