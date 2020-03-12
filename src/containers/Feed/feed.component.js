import React, { useState, useRef } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import moment from 'moment';
import {
  FeedHolder, MapHolder
} from './feed.style';
import { errorToaster } from '@utils';
import { FeedMap, SideFeed } from './children';
import colors from './route-color';

export const FeedContext = React.createContext();

const initialState = { selectedRoute: null }

/**
 * Feed Page UI component, containing a Map which displays some routes and a side legend.
 * @param props
 */
export const FeedPageContent = props => {
  const { routes } = props;

  const { t } = useTranslation();
  const googleMapURL = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&v=3.exp&libraries=geometry,drawing,places`

  const [state, setState] = React.useState(initialState);

  const map = useRef(), sideFeed = useRef();

  routes.forEach((route, index) => {
    route.color = colors[index]
  });

  return (
    <FeedContext.Provider value={{ state, setState }}>
      <FeedHolder data-testid="feed-holder">
        <FeedMap ref={map} {... { routes }}
          data-testid="feed-map"
          googleMapURL={googleMapURL}
          loadingElement={<MapHolder />}
          containerElement={<MapHolder />}
          mapElement={<MapHolder />}
        />
        <SideFeed ref={sideFeed} data-testid="side-menu" {... { routes }} />
      </FeedHolder>
    </FeedContext.Provider>
  );
};
