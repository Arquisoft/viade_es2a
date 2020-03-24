import React from 'react';

import { RouteFields, Map } from './children';
import {
  CreationPanelHolder,
  MapHolder
} from './route-creation-panel.style';

import { useTranslation } from 'react-i18next';

import { errorToaster } from '@utils';

const RouteCreationPanel = ({ webId, onRouteCreation }) => {

  const { t } = useTranslation();
  
  const googleMapURL = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&v=3.exp&libraries=geometry,drawing,places`;

  const points = [];

  const onPointAdded = point => {
    points.push(point);
  }

  const onError = error => {
    errorToaster(error, 'Error');
  }

  const onSave = async ({ name, description }) => {
    if (!points.length) {
      onError(t('route.edit.noPoints'));
      return;
    }

    const route = {
      name: name,
      description: description,
      date: Date.now(),
      author: webId,
      points: points
    }

    await onRouteCreation(route);
  }

  return (
    <CreationPanelHolder>
      <RouteFields {...{ onSave, onError }} />

      <Map {...{ onPointAdded }}
        googleMapURL={googleMapURL}
        loadingElement={<MapHolder />}
        containerElement={<MapHolder />}
        mapElement={<MapHolder />}
      />
    </CreationPanelHolder>
  );
};

export default RouteCreationPanel;