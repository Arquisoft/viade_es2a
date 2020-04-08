import React from 'react';

import {
  LocationContainer
} from './location-menu-comment.style';

import LocationInfo from './location-comment.component';

const LocationMenu = ({ points, onPointSelectComment, selectedPointComment }) => {
  return <LocationContainer>
    {points.map((point, index) => {
      return <LocationInfo key={index} {... { point, index, onPointSelectComment, selectedPointComment }} />;
    })}
  </LocationContainer>;
};

export default LocationMenu;
