import React from "react";

import {
  RouteViewWrapper,
  MapHolder,
  ExpandButton,
  RouteInfoContainer,
  LeftPanel,
  RightPanel,
  CollapseButton,
} from "./route-view.style";
import { RouteColor as colors } from "@constants";
import { Map, RoutePoints, RouteElements } from "./children";
import { useWebId } from "@inrupt/solid-react-components";

import { MobileCompatWrapper, ModalCloseButton } from "@utils";

export const RouteViewContext = React.createContext();





const RouteView = ({ route, closeRouteView }) => {
  const webId = useWebId();
  const googleMapURL = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&v=3.exp&libraries=geometry,drawing,places`;

  const [downPanelCollapsed, setDownPanelCollapsed] = React.useState(true);
  const [collapsed, setCollapsed] = React.useState(false);
  const [selectedPoint, setSelectedPoint] = React.useState(null);

  const [distance, setDistance] = React.useState('-');

  const map = React.useRef();


  route.waypoints.forEach((point, index) => point.color = colors[index % colors.length]);

  const onPointSelect = (point, index) => {
    const newPoint = selectedPoint === index ? null : index;
    setSelectedPoint(newPoint);
    if (newPoint !== null) map.current.panTo(point);
  };

  const onDistanceLoad = setDistance;

  return (
    <MobileCompatWrapper>
      <ModalCloseButton onClick={closeRouteView} />
      <RouteViewWrapper>
        <RouteInfoContainer>
          <RouteViewContext.Provider
            value={{ selectedPoint, setSelectedPoint, onPointSelect }}
          >
            <LeftPanel {...{ collapsed }}>
              {collapsed &&
                <ExpandButton onClick={() => setCollapsed(false)}>
                  ⇠
                </ExpandButton>
              }

              <MapHolder {...{ downPanelCollapsed }}>
                <Map
                  {...{ route, onDistanceLoad }}
                  mapRef={map}
                  data-testid="route-map"
                  googleMapURL={googleMapURL}
                  loadingElement={<MapHolder />}
                  containerElement={<MapHolder />}
                  mapElement={<MapHolder />}
                />
              </MapHolder>
              <RouteElements className="route-elements"
                {...{ webId, route, downPanelCollapsed, setDownPanelCollapsed }}
              />
            </LeftPanel>
            <RightPanel {...{ collapsed }}>
              {!collapsed && <CollapseButton onClick={() => setCollapsed(true)}>⇢</CollapseButton>}
              <RoutePoints {...{ route, distance }} />
            </RightPanel>
          </RouteViewContext.Provider>
        </RouteInfoContainer>
      </RouteViewWrapper>
    </MobileCompatWrapper>
  );
};

export default RouteView;
