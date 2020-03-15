import React from 'react';
import RouteFields from './children/RouteFields/route-fields.component';
import { AddRouteHolder, MapHolder } from './add-route-page.style';
import { Map } from './children'
import { Redirect } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { v4 as uuid } from 'uuid';

import { storageHelper, errorToaster } from '@utils';

const AddRoutePage = ({ history, webId }) => {

  const { t } = useTranslation();

  const googleMapURL = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&v=3.exp&libraries=geometry,drawing,places`

  const points = [];

  const onPointAdded = point => {
    points.push(point);
  }

  const onError = error => {
    errorToaster(error, 'Error');
  }

  const onSave = ({ name, description }) => {
    if (!points.length) {
      onError(t('route.edit.noPoints'));
      return;
    }

    const route = {
      id: uuid(),
      name: name,
      description: description,
      date: Date.now(),
      author: webId,
      points: points
    }

    storageHelper.saveRoute(webId, route);

    history.push('/my-routes/');
  }

  return (
    <AddRouteHolder>
      <RouteFields {...{ onSave, onError }} />

      <Map {...{ onPointAdded }}
        googleMapURL={googleMapURL}
        loadingElement={<MapHolder />}
        containerElement={<MapHolder />}
        mapElement={<MapHolder />}
      />
    </AddRouteHolder>
  );
};

export default AddRoutePage;