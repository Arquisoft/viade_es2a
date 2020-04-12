import React from 'react';

import {
  WaypointMenuHolder,
  WaypointContainer,
  WaypointMenuHeader,
  AddWaypointButton
} from './waypoint-menu.style';

import { useTranslation } from 'react-i18next';

import Waypoint from './waypoint.component';

const WaypointMenu = ({ waypoints, onWaypointDelete, onWaypointCreation, setWaypointName, setWaypointDesc }) => {
  const { t } = useTranslation();

  return <WaypointMenuHolder>
    <WaypointMenuHeader className='menuHeader'>
      {t("route.waypoints")}
    </WaypointMenuHeader>

    <WaypointContainer className='waypointContainer'>
      {waypoints.map((waypoint, index) => {
        return <Waypoint
          className={waypoint.name}
          key={index} {... { index, waypoint, setWaypointName, setWaypointDesc, onWaypointDelete }}
        />;
      })}
    </WaypointContainer>

    <AddWaypointButton className='button' onClick={onWaypointCreation}>+</AddWaypointButton>
  </WaypointMenuHolder>
};

export default WaypointMenu;
