import React, { Component } from 'react';
import { CenterContainer } from '@util-components';
import { SideMenuHolder, RouteContainer,  SideMenuHeader } from './side-routes-menu.style';
import { Trans, useTranslation } from 'react-i18next';
import RouteCard from './route-card.component'


const SideRoutesMenu = props => {
  const { routes } = props;

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
