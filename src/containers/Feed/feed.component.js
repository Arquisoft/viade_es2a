import React from 'react';
import { Trans, useTranslation } from 'react-i18next';
import {

} from './feed.style';
import { errorToaster } from '@utils';
import { FeedMap, SideFeed } from './children';

/**
 * Feed Page UI component, containing a Map which displays some routes and a side legend.
 * @param props
 */
export const FeedPageContent = props => {
  const { t } = useTranslation();
  const googleMapURL = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&v=3.exp&libraries=geometry,drawing,places`
  
  return (
    <section>
      <FeedMap
        googleMapURL={googleMapURL}
        loadingElement={<div style={{ height: `400px`, width: `100vh` }} />}
        containerElement={<div style={{ height: `400px`, width: `100vh` }} />}
        mapElement={<div style={{ height: `400px`, width: `100vh` }} />}
      />
      <SideFeed></SideFeed>
    </section>
  );
};
