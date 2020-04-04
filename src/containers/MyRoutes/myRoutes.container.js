import React, { useState, useEffect } from 'react';
import { RouteMapPageContent } from '@components';

import { routeService } from '@services';

/**
 * Container component for the My Routes Page, fetches routes from a POD
 */
export const MyRoutesContainer = props => {

  const { webId } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [routes, setRoutes] = useState([]);

  useEffect(() => {
    if (webId) fetchRoutes();
  }, []);

  const fetchRoutes = async () => {
    setIsLoading(true);
    
    const routes = await routeService.findAllRoutes(webId);

    if (routes)
      setRoutes(routes);

    setIsLoading(false);
  };

  return (
    <RouteMapPageContent isLoading={isLoading} {... { routes, webId, fetchRoutes }} />
  );
};
