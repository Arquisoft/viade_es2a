import React, { useState } from "react";

import { RouteFields, Map, WaypointMenu } from "./children";

import {
  MapHolder
} from "./route-creation-panel.style";

import {
  DownPanel,
  TabContainer,
  TabButton,
  PanelContainer,
} from "@components/RouteView/children/RouteElements/route-elements.style";

import {
  RouteViewWrapper,
  RightPanel,
  LeftPanel,
  CollapseButton,
  ExpandButton
} from "@components/RouteView/route-view.style";

import { routeService, multimediaService } from "@services";

import { successToaster, MobileCompatWrapper, errorToaster, ModalCloseButton } from "@utils";

import { useTranslation } from "react-i18next";

import { Multimedia } from "@components";

const RouteCreationPanel = ({
  webId,
  onRouteCreation,
  onImport,
  closeRouteCreation,
  routeBase,
}) => {
  const { t } = useTranslation();

  const googleMapURL = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&v=3.exp&libraries=geometry,drawing,places`;

  const [collapsed, setCollapsed] = React.useState(false);

  const [showAddHelp, setShowAddHelp] = useState(true);

  const [files, setFiles] = useState([]);
  const [displayedFiles, setDisplayedFiles] = useState(
    routeBase ? routeBase.media : []
  );
  const [trackpoints, setTrackpoints] = useState(
    routeBase ? routeBase.points : []
  );
  const [waypoints, setWaypoints] = useState(
    routeBase ? routeBase.waypoints : []
  );
  const [addingWaypoint, setAddingWaypoint] = useState(false);

  const [selectedTab, setSelectedTab] = React.useState(0);
  const tabs = ["route.data", "route.multimedia"];

  const onWaypointCreation = () => {
    setAddingWaypoint(true);
    successToaster(t("route.edit.waypoint"), t("route.edit.waypointTitle"));
  };

  const onPointAdd = (point) => {
    if (addingWaypoint) {
      setAddingWaypoint(false);
      setWaypoints(waypoints.concat(point));
    } else {
      if (showAddHelp) {
        setShowAddHelp(false);
        successToaster(
          t("route.edit.pointAdded"),
          t("route.edit.pointAddedTitle")
        );
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

  const onWaypointDelete = (index) => {
    waypoints.splice(index, 1);
    setWaypoints([...waypoints]);
  };

  const onTrackpointDelete = (index) => {
    trackpoints.splice(index, 1);
    setTrackpoints([...trackpoints]);
  };

  const onError = (error) => {
    errorToaster(error, "Error");
  };

  const onUpload = (filelist) => {
    const selectedFile = filelist[0];

    setFiles([...files, selectedFile]);

    var reader = new FileReader();
    reader.onload = () => {
      setDisplayedFiles([
        ...displayedFiles,
        { "@id": reader.result, name: selectedFile.name },
      ]);
    };

    reader.readAsDataURL(selectedFile);
  };

  const onMediaDelete = (index) => {
    const newDisplayed = [];
    const newFiles = [];
    const newRouteMedia = [];

    files.forEach((file, i) => {
      if (i !== index)
        newFiles.push(file);
    });

    files.forEach((file, i) => {
      if (i !== index)
        newFiles.push(file);
    });
    if (routeBase) {
      routeBase.media.forEach((file, i) => {
        if (index !== i) {
          newRouteMedia.push(file)
        }
      })
      routeBase.media = newRouteMedia;
    }

    displayedFiles.forEach((file, i) => {
      if (i !== index) {
        newDisplayed.push(file);
      } else {
        if (!file.name)
          multimediaService.deleteMultimedia(file);
      }
    });

    setFiles(newFiles);
    setDisplayedFiles(newDisplayed);
  };

  const onSave = async ({ name, description }) => {
    if (!trackpoints.length) {
      onError(t("route.edit.noPoints"));
      return;
    }

    let outWaypoints = waypoints.map(({ lat, lng, name, description }) => {
      return { latitude: lat, longitude: lng, name, description };
    });

    let points = trackpoints.map(({ lat, lng }) => {
      return { latitude: lat, longitude: lng };
    });

    let route = {
      name,
      description,
      date: routeBase ? routeBase.date : Date.now(),
      author: webId,
      waypoints: outWaypoints,
      points,
      media: routeBase ? routeBase.media : [],
    };

    route = await routeService.addMultimedia(route, files, webId);

    await onRouteCreation(route, routeBase);
  };

  const setWaypointName = (index, name) => {
    waypoints[index].name = name;
    setWaypoints([...waypoints]);
  };

  const setWaypointDesc = (index, description) => {
    waypoints[index].description = description;
    setWaypoints([...waypoints]);
  };

  return (
    <MobileCompatWrapper>
      <RouteViewWrapper style={{ display: 'flex', flexDirection: 'row' }}>
        <ModalCloseButton onClick={closeRouteCreation} />

        <LeftPanel {...{ collapsed }}>

          {collapsed &&
            <ExpandButton onClick={() => setCollapsed(false)}>
              ⇠
            </ExpandButton>
          }

          <MapHolder>
            <Map
              {...{
                waypoints,
                trackpoints,
                onPointAdd,
                onPointDragged,
                onTrackpointDelete,
              }}
              googleMapURL={googleMapURL}
              loadingElement={<MapHolder />}
              containerElement={<MapHolder />}
              mapElement={<MapHolder />}
            />
          </MapHolder>

          <DownPanel style={{ flexBasis: '30%' }}>
            <TabContainer>
              {tabs.map((name, i) => {
                return (
                  <TabButton
                    selected={selectedTab === i}
                    key={i}
                    onClick={() => setSelectedTab(i)}
                  >
                    {t(name)}
                  </TabButton>
                );
              })}
            </TabContainer>

            <PanelContainer>
              <Multimedia
                {...{ files: displayedFiles, onUpload, onMediaDelete, editable: true, selectedTab }}
              />
              <RouteFields className="route-fields"
                {...{ onSave, onError, onImport, onUpload, routeBase, selectedTab }}
              />
            </PanelContainer>
          </DownPanel>
        </LeftPanel>

        <RightPanel {...{ collapsed }}>
          {!collapsed && <CollapseButton onClick={() => setCollapsed(true)}>⇢</CollapseButton>}
          <WaypointMenu
            {...{ waypoints, onWaypointDelete, onWaypointCreation, setWaypointName, setWaypointDesc }}
          />
        </RightPanel>
      </RouteViewWrapper>
    </MobileCompatWrapper>
  );
};

export default RouteCreationPanel;
