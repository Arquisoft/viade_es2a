import React, { useState } from 'react';
import {
    RouteViewWrapper,
    RouteViewHeader,
    MapHolder,
    RouteInfoContainer,
    LeftPanel,
    RightPanel,
    CommentsPanel
} from './route-view.style';

import colors from '@components/RouteMap/route-color';
import { Map, LocationMenu } from './children'

export const RouteViewContext = React.createContext();

const initialState = { selectedPoint: null }

const RouteView = ({ route }) => {

    const points = route.points;

    const googleMapURL = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&v=3.exp&libraries=geometry,drawing,places`

    const [state, setState] = React.useState(initialState);

    points.forEach((point, index) => {
        point.color = colors[index % colors.length]
    });

    return (
        <RouteViewWrapper>
            <RouteInfoContainer>
                <RouteViewContext.Provider value={{ state, setState }}>
                    <LeftPanel>
                        <Map {... { route }}
                            data-testid="route-map"
                            googleMapURL={googleMapURL}
                            loadingElement={<MapHolder />}
                            containerElement={<MapHolder />}
                            mapElement={<MapHolder />}
                        />
                        <CommentsPanel />
                    </LeftPanel>

                    <RightPanel>
                        <RouteViewHeader>
                            <h1>{route.name}</h1>
                        </RouteViewHeader>

                        <LocationMenu {...{ points }} />
                    </RightPanel>
                </RouteViewContext.Provider>
            </RouteInfoContainer>
        </RouteViewWrapper>
    );
}

export default RouteView;