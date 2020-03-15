import React, { useState, useEffect } from "react";
import { FriendsPageContent } from "./friends.component";
import { foaf } from "rdf-namespaces";
import { fetchDocument } from "tripledoc";

const FriendsContainer = ({ webId }) => {

  const [friends, setFriends] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getAmigos();
  }, []);

  const getAmigos = async () => {
    setIsLoading(true);

    const doc = await fetchDocument(webId);
    const me = doc.getSubject(webId);

    const myFriends = me.getAllRefs(foaf.knows);
    setFriends(myFriends);

    setIsLoading(false);
  };

  return <FriendsPageContent isLoading={isLoading} webId={webId} friends={friends} />
};

export default FriendsContainer;
