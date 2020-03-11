import React, { Component } from 'react';
import { CenterContainer } from '@util-components';
import { useWebId } from '@inrupt/solid-react-components';
import { SideFeedHolder, RouteContainer, SideFeedHeader, FeedRoute } from './side-feed.style';
import { Trans, useTranslation } from 'react-i18next';

type Props = {
  history: Object
};

const SideFeed = props => {
  const { routes } = props;
  const webId = useWebId();
  const { t } = useTranslation();
  var regex1 = /^https:\/\//gi;
  var regex2 = /\..*/gi;

  return <SideFeedHolder >
    <SideFeedHeader>
      {t("feed.sideFeed.recentRoutes")}
    </SideFeedHeader>

    <RouteContainer>
      {routes.map(route => {
        if(webId === (route.author + "me"))
          regex1 = /.*/gi;

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
