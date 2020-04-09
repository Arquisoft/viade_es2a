import React from "react";

import {
    RouteViewWrapper,
    MapHolder,
    ExpandButton,
    RouteInfoContainer,
    LeftPanel,
    RightPanel,
    CollapseButton
} from "./route-view.style";

import {multimediaService} from '@services';
import { RouteColor as colors } from "@constants";
import { Map, RoutePoints, RouteElements } from "./children";
import { useWebId } from "@inrupt/solid-react-components";

import { MobileCompatWrapper } from "@utils";

export const RouteViewContext = React.createContext();


const comments = [
    { content: "Comentario 1", author: "Labra" },
    { content: "Comentario 2", author: "Jesus" },
    { content: "Comentario 3", author: "Marcos" },
    { content: "Comentario 4", author: "Marcos" },
    {
        content:
            "Comentario 5 muyyyyyyyyyyyyyyyyyy lagroooooooooooooooooooooo sklfhsnkf sdklf shfk shnfksdh fdks fhsdjkfhsdkf shkfds hfkds fhsdkfdskjfh skf shfkds hfskjf hksjd f",
        author: "Marcos"
    },
    { content: "Comentario 6", author: "Marcos" },
    { content: "Comentario 6", author: "Marcos" },
    { content: "Comentario 6", author: "Marcos" },
    { content: "Comentario 6", author: "Marcos" }
];



const RouteView = ({ route, closeRouteView }) => {
    const webId = useWebId();

    const points = route.waypoints;

    const googleMapURL = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&v=3.exp&libraries=geometry,drawing,places`;

    const [downPanelCollapsed, setDownPanelCollapsed] = React.useState(true);
    const [collapsed, setCollapsed] = React.useState(false);
    const [selectedPoint, setSelectedPoint] = React.useState(null);

    const map = React.useRef();

    const files = route.media;

    points.forEach((point, index) => (point.color = colors[index % colors.length]));

    const onPointSelect = (point, index) => {
        const newPoint = selectedPoint === index ? null : index;
        setSelectedPoint(newPoint);
        if (newPoint !== null) map.current.panTo(point);
    };

    return (
        <MobileCompatWrapper>
            <RouteViewWrapper>
                <RouteInfoContainer>
                    <RouteViewContext.Provider value={{ selectedPoint, setSelectedPoint, onPointSelect }}>
                        <LeftPanel {...{ collapsed }}>
                            {collapsed && <ExpandButton onClick={() => setCollapsed(false)}>⇠</ExpandButton>}

                            <MapHolder {...{ downPanelCollapsed }}>
                                <Map
                                    {...{ route }}
                                    mapRef={map}
                                    data-testid="route-map"
                                    googleMapURL={googleMapURL}
                                    loadingElement={<MapHolder />}
                                    containerElement={<MapHolder />}
                                    mapElement={<MapHolder />}
                                />
                            </MapHolder>
                            <RouteElements
                                {...{ comments, files, webId, route, closeRouteView, downPanelCollapsed, setDownPanelCollapsed }}
                            />

                        </LeftPanel>
                        <RightPanel {...{ collapsed }}>
                            {!collapsed && <CollapseButton onClick={() => setCollapsed(true)}>⇢</CollapseButton>}
                            <RoutePoints {...{ collapsed, points, route }} />
                        </RightPanel>
                    </RouteViewContext.Provider>
                </RouteInfoContainer>
            </RouteViewWrapper>
        </MobileCompatWrapper>
    );
};

export default RouteView;
