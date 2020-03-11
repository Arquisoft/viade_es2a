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
  const regex1 = /^https:\/\//gi;
  const regex2 = /\..*/gi;

  return <SideFeedHolder >
    <SideFeedHeader>
      {t("feed.sideFeed.recentRoutes")}
    </SideFeedHeader>

    <RouteContainer>
      {routes.map(route => {
        console.log(route.author)
        console.log(route.author.replace(regex1, ""))
        console.log(route.author.replace(regex1, "").replace(regex2,""))
        return (
          <FeedRoute>
            <span className="title">{route.name}</span>
            <span className="author">{route.author.replace(regex1, "").replace(regex2,"")}</span>
          </FeedRoute>
        );
      })}
    </RouteContainer>
  </SideFeedHolder>
}

export default SideFeed;
