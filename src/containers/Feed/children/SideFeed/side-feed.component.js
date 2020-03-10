import React, { Component } from 'react';
import { CenterContainer } from '@util-components';

import { SideFeedHolder, RouteContainer, SideFeedHeader, FeedRoute } from './side-feed.style';
import { Trans, useTranslation } from 'react-i18next';

type Props = {
  history: Object
};


const SideFeed = props => {
  const { routes } = props;

  const { t } = useTranslation();

  var rutaActual;

  //Se le llama a la funcion clickEnRuta en el evento onClick() de <FeedRoute>
  const clickEnRuta = ()=>alert("Has hecho click en la ruta: " + rutaActual.name +", cuyo autor es: "+rutaActual.author);

  return <SideFeedHolder >
    <SideFeedHeader>
      {t("feed.sideFeed.recentRoutes")}
    </SideFeedHeader>

    <RouteContainer>
      {routes.map(route => {
        rutaActual=route;
        return (
          <FeedRoute> 
            <span onClick={clickEnRuta} class="title">Nombre: {route.name}</span>
            <span class="author">Autor: {route.author}</span>
            <span class="image">{route.image}</span>
          </FeedRoute>
        );
      })}
    </RouteContainer>
  </SideFeedHolder>


}


export default SideFeed;
