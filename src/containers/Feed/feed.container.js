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

    const myFriends = await friendService.findFriendsFor(webId);

    // We check for valid friends, by creating a boolean array matching the fetched friends before
    const validFriends = await Promise.all(myFriends.map(async f => await friendService.exists(f)));
    // Them we filter those which are false, we do this because async functions cannot be applied in filters
    const filteredFriends = myFriends.filter((f, i) => validFriends[i]);

    const friendRoutes = await Promise.all(filteredFriends.map(async f => await routeService.findAllPublicRoutes(f)));

    setRoutes(friendRoutes.flat());

    setIsLoading(false);
  }

  return <RouteMapPageContent
    data-testid="route-map"
    isLoading={isLoading}
    {... { routes, webId, myRoutes: false, fetchRoutes }}
  />
}