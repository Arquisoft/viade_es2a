import React, { useState } from 'react';

import { RouteFields, Map } from './children';
import {
  LeftPanel,
  CreationPanelHolder,
  MapHolder
} from './route-creation-panel.style';

import { successToaster, MobileCompatWrapper } from '@utils';

import { WaypointMenu } from './children';

import { useTranslation } from 'react-i18next';

import { errorToaster, ModalCloseButton } from '@utils';

const RouteCreationPanel = ({ webId, onRouteCreation, onImport, closeRouteCreation, routeBase }) => {
  const { t } = useTranslation();

  const googleMapURL = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&v=3.exp&libraries=geometry,drawing,places`;

  const [showAddHelp, setShowAddHelp] = useState(true);

  const [trackpoints, setTrackpoints] = useState(routeBase ? routeBase.points : []);
  const [waypoints, setWaypoints] = useState(routeBase ? routeBase.waypoints : []);
  const [addingWaypoint, setAddingWaypoint] = useState(false);

  const onWaypointCreation = () => {
    setAddingWaypoint(true);
    successToaster(t('route.edit.waypoint'), t('route.edit.waypointTitle'));
  };

  const onPointAdd = point => {
    if (addingWaypoint) {
      setAddingWaypoint(false);
      setWaypoints(waypoints.concat(point));
    } else {
      if (showAddHelp) {
        setShowAddHelp(false);
        successToaster(t('route.edit.pointAdded'), t('route.edit.pointAddedTitle'));
      }
      setTrackpoints(trackpoints.concat(point));
    }
  };

  const onPointDragged = (index, { lat, lng }, waypoint) => {
    if (waypoint) {
      waypoints[index].lat = lat;
      waypoints[index].lng = lng;
      setWaypoints([...waypoints]);
    } else {
      trackpoints[index].lat = lat;
      trackpoints[index].lng = lng;
      setTrackpoints([...trackpoints]);
    }
  };

  const onWaypointDelete = index => {
    waypoints.splice(index, 1);
    setWaypoints([...waypoints]);
  };

  const onTrackpointDelete = index => {
    trackpoints.splice(index, 1);
    setTrackpoints([...trackpoints]);
  };

  const onError = error => {
    errorToaster(error, 'Error');
  };

  const onSave = async ({ name, description }) => {
    if (!trackpoints.length) {
      onError(t('route.edit.noPoints'));
      return;
    }

    let outWaypoints = waypoints.map(({ lat, lng, name, desc }) => {
      return { latitude: lat, longitude: lng, name, desc };
    });

    let points = trackpoints.map(({ lat, lng }) => {
      return { latitude: lat, longitude: lng };
    });

    const route = {
      name,
      description,
      date: routeBase ? routeBase.date : Date.now(),
      author: webId,
      waypoints: outWaypoints,
      points
    };

    await onRouteCreation(route, routeBase);
  };

  return (
    <MobileCompatWrapper>
      <CreationPanelHolder>
        <ModalCloseButton onClick={closeRouteCreation} />

        <LeftPanel>
          <Map {...{ waypoints, trackpoints, onPointAdd, onPointDragged, onTrackpointDelete }}
            googleMapURL={googleMapURL}
            loadingElement={<MapHolder />}
            containerElement={<MapHolder />}
            mapElement={<MapHolder />}
          />
          <RouteFields className="route-fields" {...{ onSave, onError, onImport, routeBase }} />
        </LeftPanel>

        <WaypointMenu {...{ waypoints, onWaypointDelete, onWaypointCreation }} />
      </CreationPanelHolder>
    </MobileCompatWrapper>
  );
};

export default RouteCreationPanel;