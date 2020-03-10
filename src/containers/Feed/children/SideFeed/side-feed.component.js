import React, { Component } from 'react';
import { CenterContainer } from '@util-components';

import { SideFeedHolder, RouteContainer, SideFeedHeader, FeedRoute } from './side-feed.style';
import { Trans, useTranslation } from 'react-i18next';

type Props = {
  history: Object
};

const SideFeed = props => {
  const { routes } = props;

  const { t } = useTranslation();

  return <SideFeedHolder >
    <SideFeedHeader>
      {t("feed.sideFeed.recentRoutes")}
    </SideFeedHeader>

    <RouteContainer>
      {routes.map(route => {
        return (
          <FeedRoute>
            <span className="title">{route.name}</span>
            <span className="author">{route.author}</span>
          </FeedRoute>
        );
      })}
    </RouteContainer>
  </SideFeedHolder>
}

export default SideFeed;
