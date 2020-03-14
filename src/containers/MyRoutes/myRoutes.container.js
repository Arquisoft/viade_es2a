import React, { useState, useEffect } from 'react';
import { RouteMapPageContent } from '@components';

import { storageHelper } from '@utils';

/**
 * Container component for the My Routes Page, fetches routes from a POD
 */
export const MyRoutesContainer = props => {

  const { webId } = props;
  const [isLoading, setIsLoading] = useState(false)
  const [routes, setRoutes] = useState([])

  useEffect(() => {
    if (webId) fetchRoutes();
  }, [])

  const fetchRoutes = async () => {
    setIsLoading(true);

    setRoutes(await storageHelper.findAllRoutes(webId));

    setIsLoading(false);
  }

  return (
    <RouteMapPageContent isLoading={isLoading} routes={routes} />
  )
}
