import React from 'react';

import {
  WaypointMenuHolder,
  WaypointContainer,
  WaypointMenuHeader
} from './waypoint-menu.style';

import { useTranslation } from 'react-i18next';

import Waypoint from './waypoint.component';

const WaypointMenu = ({ waypoints, onWaypointDelete, onWaypointCreation }) => {
  const { t } = useTranslation();

  return <WaypointMenuHolder >
    <WaypointMenuHeader>
      {t("route.waypoints")}
    </WaypointMenuHeader>

    <WaypointContainer>
      {waypoints.map((waypoint, index) => {
        return (
          <Waypoint key={index} {... { index, waypoint, onWaypointDelete }} />
        );
      })}
    </WaypointContainer>

    <button onClick={onWaypointCreation}>+</button>
  </WaypointMenuHolder>
}

export default WaypointMenu;
