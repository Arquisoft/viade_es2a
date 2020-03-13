import React, { Component, useContext, useState, useEffect } from 'react';
import { RouteMapPageContent } from '../../components/RouteMap/route-map.component';

import { UserContext } from '../../layouts/PublicLayout/public.layout';

import { storageHelper } from '@utils';

import auth from 'solid-auth-client';

/**
 * Container component for the My Routes Page, fetches routes from a POD
 */
export const MyRoutesContainer = props => {

  //const  webId  = useContext(UserContext);
  const { webId } = props;
  const [isLoading, setIsLoading] = useState(false)
  const [routes, setRoutes] = useState([])

  useEffect(() => {
    /*console.log("useEffect") //TODO
    console.log(webId)*/
    if (webId) fetchRoutes();
  }, [])

  const fetchRoutes = async () => {
    setIsLoading(true);

    /*await storageHelper.createInitialFiles(webId);

    await storageHelper.saveRoute(webId, {
      id: "16c67714-f386-4832-93da-5fb7b8ffce13",
      name: "Ruta 1",
      author: "patata",
      date: Date.now(),
      points: [
        { lat: -34.397, lng: 150.644 },
        { lat: -35.297, lng: 149.644 },
        { lat: -34.297, lng: 148.644 },
        { lat: -33.397, lng: 147.644 },
        { lat: -34.197, lng: 146.644 }
      ]
    });

    console.log(await storageHelper.readRoute(webId, '16c67714-f386-4832-93da-5fb7b8ffce13'))*/

    const routesPath = await storageHelper.getAppStorage(webId);
    const FileClient = require("solid-file-client");
    const fileClient = new FileClient(auth);

    let session = await auth.currentSession()
    if (!session) { session = await auth.login() }

    var folder = await fileClient.readFolder(routesPath);

    Promise.all(folder.files.map(e => fileClient.readFile(e.url))).then(values => {
      var routes = values.map(v => { try { return JSON.parse(v) } catch (err) { return undefined } }).filter(x => x)
      setRoutes(routes);
    }).finally(() => setIsLoading(false))
    setIsLoading(false);
  }

  return (
    <RouteMapPageContent isLoading={isLoading} routes={routes} />
  )
}
