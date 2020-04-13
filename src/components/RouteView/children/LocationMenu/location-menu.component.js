import React from 'react';

import {
  LocationContainer
} from './location-menu.style';

import Location from './location.component';

const LocationMenu = ({ trackpoints, waypoints }) => {

  return <LocationContainer>
    {trackpoints && trackpoints.length && <Location {... { point: trackpoints[0], index: 'start' }} />}

    {waypoints.map((point, index) => {
      return <Location key={index} {... { point, index }} />;
    })}

    {trackpoints.length > 1 && <Location {... { point: trackpoints[trackpoints.length - 1], index: 'finish' }} />}
  </LocationContainer>;
};

export default LocationMenu;
