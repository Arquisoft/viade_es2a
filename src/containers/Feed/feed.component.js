import React from "react";

import {
  RouteMapHolder,
  MapHolder,
  ExpandButton,
} from "@containers/MyRoutes/map-container.style";

import { FeedSidePanel, FeedAdditionPanel, GroupView, GroupEditionPanel } from './children';
import isLoading from '@hocs/isLoading';

import { RouteView, Map } from "@components";
import { FloatingButton } from "@util-components";
import { RouteMapContext } from "@containers/MyRoutes/my-routes.component";

import { RouteColor as colors } from "@constants";
import { modal } from "@utils";
import { routeService, friendService, groupService } from "@services";

const googleMapURL = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&v=3.exp&libraries=geometry,drawing,places`;

export const FeedContext = React.createContext();

/**
 * Feed Page UI component, containing a Map which displays some routes and a side legend.
 * @param props
 */
export const FeedComponent = isLoading(({ friends, groups, webId, fetchFeed }) => {

  const [loadedRoutesAmount, setLoadedRoutesAmount] = React.useState(0);

  const [deletedFriends, setDeletedFriends] = React.useState([]);
  const [loadedRoutes, setLoadedRoutes] = React.useState([]);
  const [selectedFriends, setSelectedFriends] = React.useState([]);
  const [selectedRoute, setSelectedRoute] = React.useState(null);
  const [collapsed, setCollapsed] = React.useState(false);
  const [selectedGroup, setSelectedGroup] = React.useState(null);

  const [RouteViewModal, openRouteView, closeRouteView] = modal('route-map');
  const [FeedAdditionModal, openFeedAddition, closeFeedAddition] = modal('route-map');
  const [GroupViewModal, openGroupView, closeGroupView] = modal('route-map');
  const [GroupEditionModal, openGroupEdition, closeGroupEdition] = modal('route-map');

  const map = React.useRef();

  const getSelectedRoute = () => loadedRoutes.filter(r => r.id === selectedRoute)[0];

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

  const onFriendSelect = async (friend, currentRoutes) => {
    if (isSelectedFriend(friend)) {
      removeSelectedFriend(friend);
      deloadRoutes(currentRoutes);

      return [];
    } else {
      addSelectedFriend(friend);
      var routes = [];
      const friendRoutes = await routeService.getRoutesByOwner(
        [friend],
        webId
      );
      if (friendRoutes.length > 0) routes = friendRoutes[0].routes;

      loadRoutes(routes);
      return routes;
    }
  };

  const removeSelectedFriend = friend => {
    selectedFriends.splice(selectedFriends.indexOf(friend), 1);
    setSelectedFriends([...selectedFriends]);
  };

  const addSelectedFriend = friend => {
    setSelectedFriends(selectedFriends.concat(friend));
  };

  const loadRoutes = routes => {
    routes.forEach((route, index) => route.color = colors[(index + loadedRoutesAmount) % colors.length]);
    setLoadedRoutesAmount(loadedRoutesAmount + routes.length);
    setLoadedRoutes([...loadedRoutes, ...routes]);
  };

  const deloadRoutes = routes => {
    routes.forEach(r => loadedRoutes.splice(loadedRoutes.indexOf(r), 1));
    setLoadedRoutes([...loadedRoutes]);
  };

  const deleteFriend = async (friend, currentRoutes) => {
    if (isSelectedFriend(friend)) {
      removeSelectedFriend(friend);
      deloadRoutes(currentRoutes);
    }

    setDeletedFriends(deletedFriends.concat(friend));
    await friendService.deleteFriend(webId, friend);
  };

  const isSelectedFriend = friend => selectedFriends.includes(friend);

  const isDeletedFriend = friend => deletedFriends.includes(friend);

  const onGroupCreation = async group => {
    await groupService.saveGroup(webId, group);
    await fetchFeed();
  };

  const onGroupDeletion = async () => {
    closeGroupView();
    await fetchFeed();
  }

  const onGroupSelected = (group) => {
    if (isSelectedGroup(group))
      setSelectedGroup(null)
    else
      setSelectedGroup(group);
  };

  const onGroupView = () => {
    if (selectedGroup)
      openGroupView();
  };

  const onGroupEdition = () => {
    if (selectedGroup) {
      openGroupEdition();
    }
  };

  const isSelectedGroup = g => selectedGroup && selectedGroup.id === g.id;

  return (
    <RouteMapHolder data-testid="map-holder" id='route-map'>
      <RouteMapContext.Provider
        value={{
          selectedRoute,
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

        <Map {... { routes: loadedRoutes }}
          mapRef={map}
          data-testid="map"
          googleMapURL={googleMapURL}
          loadingElement={<MapHolder collapsed={collapsed} />}
          containerElement={<MapHolder collapsed={collapsed} />}
          mapElement={<MapHolder collapsed={collapsed} />}
        />
        <FeedContext.Provider value={{
          isSelectedFriend,
          onFriendSelect,
          deleteFriend,
          isDeletedFriend,
          onGroupSelected,
          onGroupView,
          onGroupEdition,
          isSelectedGroup
        }}>
          <FeedSidePanel data-testid="side-menu" {... { friends, groups, collapsed, setCollapsed, webId }} />
        </FeedContext.Provider>

        <RouteViewModal>
          <RouteView {... { route: getSelectedRoute(), closeRouteView }} />
        </RouteViewModal>

        <FeedAdditionModal>
          <FeedAdditionPanel {...{ webId, closeFeedAddition, onGroupCreation, fetchFeed }} />
        </FeedAdditionModal>

        <GroupViewModal>
          <GroupView {...{ selectedGroup, closeGroupView, onGroupDeletion }} />
        </GroupViewModal>

        <GroupEditionModal>
          <GroupEditionPanel {...{ webId, closeGroupEdition, onGroupCreation, selectedGroup }} />
        </GroupEditionModal>

        <FloatingButton
          onClick={openFeedAddition}
          background={'#8a25fc'}
          hoverBackground={'#9841fc'}
          activeBackground={'#ad66ff'}
          foreground={'white'}
          text={'+'} />
      </RouteMapContext.Provider >
    </RouteMapHolder>
  );
});
