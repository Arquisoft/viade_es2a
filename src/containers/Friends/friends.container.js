import React, { useState, useEffect } from "react";
import { FriendsPageContent } from "./friends.component";

import { friendService } from '@services';

const FriendsContainer = ({ webId }) => {

  const [friends, setFriends] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchFriends();
  }, []);

  const fetchFriends = async () => {
    setIsLoading(true);

    const myFriends = await friendService.findFriendsFor(webId);
    setFriends(myFriends);

    setIsLoading(false);
  };

  return <FriendsPageContent isLoading={isLoading} {... { webId, friends, fetchFriends }} />;
};

export default FriendsContainer;
