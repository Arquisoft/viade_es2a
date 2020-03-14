import React from 'react';

import {
  SideMenuHolder,
  RouteContainer,
  SideMenuHeader
} from './side-routes-menu.style';

import { useTranslation } from 'react-i18next';
import RouteCard from './route-card.component'




const SideRoutesMenu = props => {
  const { routes, onRouteView } = props;


  const { t } = useTranslation();


  function sortByDate(){
    routes.sort(((a,b)=>{
      if(a.date > b.date)
        return -1;
      if(a.date < b.date)
        return 1;
      return 0;
    }));
  };
  
sortByDate();

  return <SideMenuHolder >
    <SideMenuHeader>
      {t("feed.sideFeed.recentRoutes")}
    </SideMenuHeader>

    <RouteContainer>
      {routes.map(route => {
        return (
          <RouteCard key={route.id} {... { route, onRouteView }} />
        );
      })}
    </RouteContainer>
  </SideMenuHolder>
}

export default SideRoutesMenu;
