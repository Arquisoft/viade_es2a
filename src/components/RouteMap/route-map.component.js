import React from 'react';

import {
  RouteMapHolder,
  MapHolder,
  CollapseButton
} from './route-map.style';

import { FloatingButton } from '@components/Utils';
import { Map, SideRoutesMenu } from './children';
import { RouteColor as colors } from '@constants';
import isLoading from '@hocs/isLoading';

import { RouteView, RouteCreationPanel } from '@components';

import { modal } from '@utils';
import { routeService } from '@services';

export const RouteMapContext = React.createContext();

const googleMapURL = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&v=3.exp&libraries=geometry,drawing,places`;

/**
 * Feed Page UI component, containing a Map which displays some routes and a side legend.
 * @param props
 */

export const RouteMapPageContent = isLoading(({ routes, webId, myRoutes, fetchRoutes }) => {
  const [selectedRoute, setSlectedRoute] = React.useState(null);
  const [collapsed, setCollapsed] = React.useState(false);

  const [RouteViewModal, openRouteView, closeRouteView, viewing] = modal('route-map');
  const [RouteCreationModal, openRouteCreation, closeRouteCreation, creating] = modal('route-map');

  const map = React.useRef();

  routes.sort((a, b) => b.date - a.date);

  routes.forEach((route, index) => route.color = colors[index % colors.length]);

  const onRouteView = () => {
    if (selectedRoute)
      openRouteView();
  };

  const onRouteSelect = route => {
    const newRoute = selectedRoute === route.id ? null : route.id;
    setSlectedRoute(newRoute);
    if (newRoute && route.points[0])
      map.current.panTo(route.points[0]);
  };

  const onDeleteClick = async routeId => {
    closeRouteView();
    await routeService.deleteRoute(webId, routeId);
    await fetchRoutes();
  };

  const onPublishClick = async routeId => {
    closeRouteView();
    await routeService.publishRoute(webId, routeId);
  };

  const onRouteCreation = async route => {
    closeRouteView();
    await routeService.saveRoute(webId, route);
    await fetchRoutes();
  };

  return (
    <RouteMapHolder data-testid="map-holder" id='route-map'>
      <RouteMapContext.Provider
        value={{
          selectedRoute,
          setSlectedRoute,
          myRoutes,
          onDeleteClick,
          onRouteView,
          onRouteSelect,
          onPublishClick,
          collapsed,
          setCollapsed,
        }}>

        {collapsed &&
          <CollapseButton onClick={() => setCollapsed(false)}>
            ⇠
          </CollapseButton>
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

      <RouteCreationModal>
        <RouteCreationPanel {...{ webId, onRouteCreation, closeRouteCreation }} />
      </RouteCreationModal>

      {myRoutes && !viewing && !creating && <FloatingButton
        onClick={openRouteCreation}
        background={'#8a25fc'}
        hoverBackground={'#9841fc'}
        activeBackground={'#ad66ff'}
        foreground={'white'}
        text={'🞤'} />}
    </RouteMapHolder>
  );
});
