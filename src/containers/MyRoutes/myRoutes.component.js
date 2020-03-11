import React, { useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { FeedHolder, MapHolder } from '../Feed/feed.style';
import { errorToaster } from '@utils';
import { FeedMap, SideFeed } from '../Feed/children';
import colors from '../Feed//route-color';

/**
 * My Routes Page UI component, containing a Map which displays some routes and a side legend.
 * @param props
 */
export const MyRoutesPageContent = props => {

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
    <FeedHolder>
      <FeedMap {... { routes }}
        googleMapURL={googleMapURL}
        loadingElement={<MapHolder />}
        containerElement={<MapHolder />}
        mapElement={<MapHolder />}
      />
      <SideFeed {... { routes }} />
    </FeedHolder>
  );
};