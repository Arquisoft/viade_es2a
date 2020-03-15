import React, { useEffect, useState } from 'react';
import { foaf } from 'rdf-namespaces';
import { fetchDocument } from 'tripledoc';
import { storageHelper } from '@utils';
import { RouteMapPageContent } from '@components';

/**
 * Container component for the Feed Page, fetches routes from a POD
 */
export const FeedContainer = ({ webId }) => {
  const [routes, setRoutes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const FileClient = require("solid-file-client");
  const solidAuth = require("solid-auth-cli");
  const fileClient = new FileClient(solidAuth)

  useEffect(() => {
    getAmigos();
    getRoutes();
  }, [])

  const getAmigos = async () => {

    setIsLoading(true)

    await storageHelper.createInitialFiles(webId);

    const doc = await fetchDocument(webId);
    const me = doc.getSubject(webId);
    const myFriends = me.getAllRefs(foaf.knows);

    myFriends.map(async friend => {
      const path = friend.replace('/profile/card#me', '/public/routes');

      var folder = await fileClient.readFolder(path);

      Promise.all(folder.files.map(e => fileClient.readFile(e.url))).then(values => {
        var routes = values.map(v => { try { return JSON.parse(v) } catch (err) { return undefined } }).filter(x => x)
        setRoutes(routes);
      }).finally(() => setIsLoading(false))
    })
  }

  const getRoutes = () => {

  }

  return <RouteMapPageContent data-testid="route-map" isLoading={isLoading} routes={routes} />
}