import React from 'react';

import {
  RouteMapHolder,
  MapHolder,
  ExpandButton
} from './feed.style';

import { SideRoutesMenu } from './children';
import { RouteColor as colors } from '@constants';
import isLoading from '@hocs/isLoading';

import { RouteView, Map } from '@components';
import { RouteMapContext } from '@components/RouteMap/route-map.component';

import { modal } from '@utils';

const googleMapURL = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&v=3.exp&libraries=geometry,drawing,places`;

/**
 * Feed Page UI component, containing a Map which displays some routes and a side legend.
 * @param props
 */

export const FeedComponent = isLoading(({ routes, webId, fetchRoutes }) => {
  const [selectedRoute, setSelectedRoute] = React.useState(null);
  const [collapsed, setCollapsed] = React.useState(false);

  const [RouteViewModal, openRouteView, closeRouteView] = modal('route-map');

  const map = React.useRef();

  routes.sort((a, b) => b.date - a.date);

  routes.forEach((route, index) => route.color = colors[index % colors.length]);

  const onRouteView = () => {
    if (selectedRoute)
      openRouteView();
  };

  const onRouteSelect = route => {
    const newRoute = selectedRoute === route.id ? null : route.id;
    setSelectedRoute(newRoute);
    if (newRoute && route.points[0])
      map.current.panTo(route.points[0]);
  };

  return (
    <RouteMapHolder data-testid="map-holder" id='route-map'>
      <RouteMapContext.Provider
        value={{
          selectedRoute,
          setSelectedRoute,
          onRouteView,
          onRouteSelect,
          collapsed,
          setCollapsed,
        }}>

        {collapsed &&
          <ExpandButton onClick={() => setCollapsed(false)}>
            ⇠
          </ExpandButton>
        }

        <Map {... { routes }}
          mapRef={map}
          data-testid="map"
          googleMapURL={googleMapURL}
          loadingElement={<MapHolder />}
          containerElement={<MapHolder />}
          mapElement={<MapHolder />}
        />
        <SideRoutesMenu data-testid="side-menu" {... { routes, collapsed, setCollapsed }} />

        <RouteMapContext.Consumer>
          {props => (
            <RouteViewModal>
              <RouteView {... { route: routes.filter(r => r.id === props.selectedRoute)[0], closeRouteView }} />
            </RouteViewModal>
          )}
        </RouteMapContext.Consumer>
      </RouteMapContext.Provider >
    </RouteMapHolder>
  );
});
