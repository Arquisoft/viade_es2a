import React, { Component, useState } from 'react';
import { CenterContainer } from '@util-components';
import { useTranslation } from 'react-i18next';
// import { NavBar } from "@components";
import { } from './feed-map.style';
import {
  withScriptjs, withGoogleMap, GoogleMap, Marker, Polyline
} from 'react-google-maps'

const FeedMap = withScriptjs(withGoogleMap(props => {
  const { routes } = props;

  const { t } = useTranslation();
  const iconMarker = getMarkerIcon(Math.floor((Math.random() * 3)));

  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(false);

  return (
    <GoogleMap
      defaultZoom={7}
      defaultCenter={{ lat: -34.397, lng: 150.644 }}
      options={{ streetViewControl: false }}
      mapTypeId={'terrain'}
    >

      {routes.map(route => {
        return (
          <div>
            <Polyline
              options={{
                strokeColor: '#0083ff',
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
              onClick={() => setSelected(!selected)}
            />
          </div>
        )
      })

      }
    </GoogleMap>
  )
}));

function getMarkerIcon(id) {
  return new window.google.maps.MarkerImage(
    `/img/icon/marker/${id}.svg`,
    null,
    null, /* origin */
    null,
    new window.google.maps.Size(32, 32)
  );
}

export default FeedMap;
