import React, { useEffect, useState } from 'react';

import { FeedComponent } from './feed.component';

import { friendService } from '@services';

/**
 * Container component for the Feed Page, fetches routes from a friend's PODs
 */
export const FeedContainer = ({ webId }) => {
  const [friends, setFriends] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchFriends();
  }, []);

  const fetchFriends = async () => {

    setIsLoading(true);

    await friendService.createInitialFiles(webId);

    setFriends(await friendService.findValidFriends(webId));

    setIsLoading(false);
  };

  return <FeedComponent
    data-testid="route-map"
    isLoading={isLoading}
    {... { friends, webId, fetchFriends }}
  />;
};