import React from 'react';

import {
  LocationContainer
} from './location-menu.style';

import Location from './location.component';

const LocationMenu = ({ waypoints }) => {
  return <LocationContainer>
    {waypoints.map((point, index) => {
      return <Location key={index} {... { point, index }} />;
    })}
  </LocationContainer>;
};

export default LocationMenu;
