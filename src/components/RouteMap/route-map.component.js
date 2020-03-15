import React from 'react';
import {
  RouteMapHolder, MapHolder
} from './route-map.style';
import { Map, SideRoutesMenu } from './children';
import colors from './route-color';
import isLoading from '@hocs/isLoading';

import RouteView from '../RouteView';

import { storageHelper, modal } from '@utils';

export const RouteMapContext = React.createContext();

const initialState = { selectedRoute: null };
const googleMapURL = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&v=3.exp&libraries=geometry,drawing,places`;

/**
 * Feed Page UI component, containing a Map which displays some routes and a side legend.
 * @param props
 */
export const RouteMapPageContent = isLoading(({ routes, webId, myRoutes, fetchRoutes }) => {
  const [state, setState] = React.useState(initialState);

  const [Modal, open, close] = modal('root', {
    preventScroll: true
  });

  const map = React.useRef();

  routes.forEach((route, index) => {
    route.color = colors[index % colors.length]
  });

  const onRouteView = () => {
    if (state.selectedRoute)
      open();
  }

  const onRouteSelect = route => {
    const newRoute = state.selectedRoute === route.id ? null : route.id;
    setState({ selectedRoute: newRoute });
    if (newRoute && route.points[0])
      map.current.panTo(route.points[0]);
  }

  const onDeleteClick = async routeId => {
    close();
    await storageHelper.deleteRoute(webId, routeId);
    await fetchRoutes();
  }

  const onPublishClick = async routeId => {
    close();
    await storageHelper.publishRoute(webId, routeId);
  }

  return (
    <RouteMapContext.Provider value={{ state, setState, myRoutes, onDeleteClick, onRouteView, onRouteSelect, onPublishClick }}>

      <RouteMapHolder data-testid="map-holder">
        <Map {... { routes }}
          mapRef={map}
          data-testid="feed-map"
          googleMapURL={googleMapURL}
          loadingElement={<MapHolder />}
          containerElement={<MapHolder />}
          mapElement={<MapHolder />}
        />
        <SideRoutesMenu data-testid="side-menu" {... { routes }} />
      </RouteMapHolder>

      <RouteMapContext.Consumer>
        {props => (
          <Modal>
            <RouteView {... { route: routes.filter(r => r.id === props.state.selectedRoute)[0] }} />
          </Modal>
        )}
      </RouteMapContext.Consumer>

    </RouteMapContext.Provider >
  );
});
