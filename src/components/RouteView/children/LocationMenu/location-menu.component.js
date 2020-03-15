import React from 'react';

import {
  LocationContainer
} from './location-menu.style';

import { useTranslation } from 'react-i18next';
import Location from './location.component'

const LocationMenu = ({ points }) => {
  const { t } = useTranslation();

  return <LocationContainer>
    {points.map((point, index) => {
      return (
        <Location key={index} {... { point, index }} />
      );
    })}
  </LocationContainer>
}

export default LocationMenu;
