import React, { Component,useContext,useState,useEffect } from 'react';
import { RouteMapPageContent } from '../Feed/feed.component';


import {UserContext} from '../../layouts/PublicLayout/public.layout';

/**
 * Container component for the My Routes Page, fetches routes from a POD
 */


export const MyRoutesContainer = props => {

  //const  webId  = useContext(UserContext);
  const {webId} = props;
  const [isLoading,setIsLoading] = useState(false)
  const [routes,setRoutes] = useState([])

  
  useEffect(()=>{
    console.log("useEffect") //TODO
    console.log(webId)
    if (webId) fetchRoutes();
  },[])


  const fetchRoutes = async () => {
    setIsLoading(true)


    const root = webId.replace("/profile/card#me", "");
    const FileClient = require("solid-file-client");
    const solidAuth = require("solid-auth-cli");
    const fileClient = new FileClient(solidAuth);
    const routesPath = `${root}/private/routes`;

    var folder = await fileClient.readFolder(routesPath);

    Promise.all(folder.files.map(e => fileClient.readFile(e.url))).then(values => {
      var routes = values.map(v => { try { return JSON.parse(v) } catch (err) { return undefined } }).filter(x => x)
      setRoutes(routes);
      setIsLoading(false)
    })
  }

 

    return (
      <RouteMapPageContent isLoading={isLoading} routes={ routes } />
    )

}
