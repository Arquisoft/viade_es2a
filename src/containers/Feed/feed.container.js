import React, { useEffect, useState } from 'react';

import { FeedComponent } from './feed.component';

import { friendService, groupService } from '@services';

/**
 * Container component for the Feed Page, fetches routes from a friend's PODs
 */
export const FeedContainer = ({ webId }) => {
  const [friends, setFriends] = useState([]);
  const [groups, setGroups] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (webId)
      fetchFeed();
  }, []);

  const fetchFeed = async () => {
    setIsLoading(true);

    await groupService.createInitialFiles(webId);

    const fRes = await friendService.findValidFriends(webId);
    if (fRes)
      setFriends(fRes);

    const gRes = await groupService.findAllGroups(webId);
    if (gRes)
      setGroups(gRes);

    setIsLoading(false);
  };

  return <FeedComponent
    data-testid="route-map"
    isLoading={isLoading}
    {... { friends, groups, webId, fetchFeed }}
  />;
};