import React from 'react';

import {
  SideMenuHolder,
  RouteContainer,
  SideMenuHeader
} from './side-routes-menu.style';

import { useTranslation } from 'react-i18next';
import RouteCard from './route-card.component';

const SideRoutesMenu = ({ routes }) => {
  const { t } = useTranslation();

  return <SideMenuHolder >
    <SideMenuHeader>
      {t("feed.sideFeed.recentRoutes")}
    </SideMenuHeader>

    <RouteContainer>
      {routes.map(route => {
        return (
          <RouteCard key={route.id} {... { route }} />
        );
      })}
    </RouteContainer>
  </SideMenuHolder>
}

export default SideRoutesMenu;
