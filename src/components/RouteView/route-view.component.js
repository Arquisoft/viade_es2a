import React, { useState } from 'react';
import {
    RouteViewWrapper,
    RouteViewHeader,
    MapHolder,
    RouteInfoContainer,
    LeftPanel,
    RightPanel,
    CommentsPanel,
    CommentsHeader
} from './route-view.style';

import colors from '@components/RouteMap/route-color';
import { Map, LocationMenu } from './children'
import { useTranslation } from 'react-i18next';

import { RouteMapContext } from '@components/RouteMap/route-map.component'

export const RouteViewContext = React.createContext();

const initialState = { selectedPoint: null }

const RouteView = ({ route }) => {

    const points = route.points;

    const { t } = useTranslation();

    const googleMapURL = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&v=3.exp&libraries=geometry,drawing,places`

    const [state, setState] = React.useState(initialState);

    const map = React.useRef();

    points.forEach((point, index) => {
        point.color = colors[index % colors.length]
    });

    const onPointSelect = (point, index) => {
        const newPoint = state.selectedPoint === index ? null : index;
        setState({ selectedPoint: newPoint });
        if (newPoint !== null)
            map.current.panTo(point);
    }

    return (
        <RouteViewWrapper>
            <RouteInfoContainer>
                <RouteViewContext.Provider value={{ state, setState, onPointSelect }}>
                    <LeftPanel>
                        <Map {... { route }}
                            mapRef={map}
                            data-testid="route-map"
                            googleMapURL={googleMapURL}
                            loadingElement={<MapHolder />}
                            containerElement={<MapHolder />}
                            mapElement={<MapHolder />}
                        />
                        <CommentsPanel>
                            <CommentsHeader>
                                {t('route.comments')}
                            </CommentsHeader>

                            {route.comments &&
                                route.comments.map(c => {
                                    return (
                                        <p className="comment">{c.content}</p>
                                    );
                                })
                            }

                            {!route.comments && <p className="no-comments">{t('route.no_comments')}</p>}
                        </CommentsPanel>
                    </LeftPanel>

                    <RightPanel>
                        <RouteViewHeader>
                            <h1>{route.name}</h1>
                            <RouteMapContext.Consumer>
                                {props => (
                                    props.myRoutes && <button onClick={() => props.onDeleteClick(route.id)}>{t('route.delete')}</button>
                                )}
                            </RouteMapContext.Consumer>
                        </RouteViewHeader>

                        <LocationMenu {...{ points }} />
                    </RightPanel>
                </RouteViewContext.Provider>
            </RouteInfoContainer>
        </RouteViewWrapper >
    );
}

export default RouteView;