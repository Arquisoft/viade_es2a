import React, { useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import {
  FeedHolder, MapHolder
} from './feed.style';
import { errorToaster } from '@utils';
import { FeedMap, SideFeed } from './children';
import colors from './route-color';

/**
 * Feed Page UI component, containing a Map which displays some routes and a side legend.
 * @param props
 */
export const FeedPageContent = props => {
  const { routes } = props;

  const { t } = useTranslation();
  const googleMapURL = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&v=3.exp&libraries=geometry,drawing,places`

  const [selectedRoute, setSelectedRoute] = useState(null);

  const onRouteClick = routeId => {
    setSelectedRoute(routeId)
    console.log(routeId)
  }

  routes.forEach((route, index) => {
    route.color = colors[index]
  });

  return (
    <FeedHolder data-testid="feed-holder">
      <FeedMap {... { routes, onRouteClick }}
        data-testid="feed-map"
        googleMapURL={googleMapURL}
        loadingElement={<MapHolder />}
        containerElement={<MapHolder />}
        mapElement={<MapHolder />}
      />
      <SideFeed data-testid="side-menu" {... { routes, onRouteClick }} />
    </FeedHolder>
  );
};
