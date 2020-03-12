import React from 'react';
import {
  RouteMapHolder, MapHolder
} from './feed.style';
import { Map, SideRoutesMenu } from './children';
import colors from './route-color';

export const RouteMapContext = React.createContext();

const initialState = { selectedRoute: null }

/**
 * Feed Page UI component, containing a Map which displays some routes and a side legend.
 * @param props
 */
export const RouteMapPageContent = props => {
  const { routes, myRoutes } = props;

  const googleMapURL = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&v=3.exp&libraries=geometry,drawing,places`

  const [state, setState] = React.useState(initialState);

  routes.forEach((route, index) => {
    route.color = colors[index]
  });

  return (
    <RouteMapContext.Provider value={{ state, setState }}>
      <RouteMapHolder data-testid="feed-holder">
        <Map {... { routes }}
          data-testid="feed-map"
          googleMapURL={googleMapURL}
          loadingElement={<MapHolder />}
          containerElement={<MapHolder />}
          mapElement={<MapHolder />}
        />
        <SideRoutesMenu data-testid="side-menu" {... { routes }} />
      </RouteMapHolder>
    </RouteMapContext.Provider>
  );
};
