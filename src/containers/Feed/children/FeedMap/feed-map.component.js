import React, { Component } from 'react';
import { CenterContainer } from '@util-components';
import { useTranslation } from 'react-i18next';
// import { NavBar } from "@components";
import { } from './feed-map.style';
import {
  withScriptjs, withGoogleMap, GoogleMap, Marker
} from 'react-google-maps'

const FeedMap = withScriptjs(withGoogleMap(props => {
  const { t } = useTranslation();

  return (
    <GoogleMap
      defaultZoom={8}
      defaultCenter={{ lat: -34.397, lng: 150.644 }}
    >
      <Marker
        position={{ lat: -34.397, lng: 150.644 }}
      />
    </GoogleMap>
  )
}));

export default FeedMap;
