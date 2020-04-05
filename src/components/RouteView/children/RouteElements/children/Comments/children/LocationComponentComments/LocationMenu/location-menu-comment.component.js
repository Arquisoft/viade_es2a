import React from 'react';

import {
  LocationContainer
} from './location-menu-comment.style';

import Location from './location-comment.component';

const LocationMenu = ({ points }) => {
  return (<LocationContainer>
    {points.map((point, index) => {
      return (
        <Location key={index} {... { point, index }} />
      );
    })}
  </LocationContainer>);
};

export default LocationMenu;
