import React, { Component } from 'react';
import { CenterContainer } from '@util-components';

import { SideFeedHolder, RouteContainer, SideFeedHeader } from './side-feed.style';
import { Trans, useTranslation } from 'react-i18next';

type Props = {
  history: Object
};

const SideFeed = props => {
  const { t } = useTranslation();

  return <SideFeedHolder >
    <SideFeedHeader>
      {t("feed.sideFeed.recentRoutes")}
    </SideFeedHeader>

    <RouteContainer>

    </RouteContainer>
  </SideFeedHolder>
}

export default SideFeed;
