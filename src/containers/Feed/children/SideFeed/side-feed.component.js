import React, { Component } from 'react';
import { CenterContainer } from '@util-components';

import { SideFeedHolder, RouteContainer, SideFeedHeader } from './side-feed.style';
import RouteCard from './route-card.component'

import { Trans, useTranslation } from 'react-i18next';

const SideFeed = props => {
  const { routes, onRouteClick } = props;

  const { t } = useTranslation();

  return <SideFeedHolder >
    <SideFeedHeader>
      {t("feed.sideFeed.recentRoutes")}
    </SideFeedHeader>

    <RouteContainer>
      {routes.map(route => {
        return (
          <RouteCard {... { route, onRouteClick }} />
        );
      })}
    </RouteContainer>
  </SideFeedHolder>
}

export default SideFeed;
