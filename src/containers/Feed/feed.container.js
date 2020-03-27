import React, { useEffect, useState } from 'react';

import { RouteMapPageContent } from '@components';

import { routeService, friendService } from '@services';

/**
 * Container component for the Feed Page, fetches routes from a friend's PODs
 */
export const FeedContainer = ({ webId }) => {
  const [routes, setRoutes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchRoutes();
  }, [])

  const fetchRoutes = async () => {

    setIsLoading(true);

    await routeService.createInitialFiles(webId);

    const myFriends = await friendService.findValidFriends(webId);
    const routes = await routeService.getTimelineRoutes(myFriends, webId);

    setRoutes(routes);

    setIsLoading(false);
  }

  return <RouteMapPageContent
    data-testid="route-map"
    isLoading={isLoading}
    {... { routes, webId, myRoutes: false, fetchRoutes }}
  />
}