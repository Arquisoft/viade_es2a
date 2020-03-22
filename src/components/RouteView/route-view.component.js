import React from 'react';
import {
    RouteViewWrapper,
    RouteViewHeader,
    MapHolder,
    RouteInfoContainer,
    LeftPanel,
    RightPanel,
    DownPanel,
    TabPanel,
    Header,
    TabButton,
    ContenedorComentario,
    AñadirComentarioTexto,
    AñadirComentarioBoton
} from './route-view.style';

import { RouteColor as colors } from '@constants';
import { Map, LocationMenu } from './children';
import { useTranslation } from 'react-i18next';

import { RouteMapContext } from '@components/RouteMap/route-map.component';

export const RouteViewContext = React.createContext();

const initialState = { selectedPoint: null };

const RouteView = ({ route }) => {

    const points = route.points;

    const { t } = useTranslation();

    const googleMapURL = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&v=3.exp&libraries=geometry,drawing,places`;

    const [state, setState] = React.useState(initialState);

    const [selectedTab, setSelectedTab] = React.useState(0);

    const tabs = ['route.comments', 'route.multimedia'];

    const map = React.useRef();

    points.forEach((point, index) => point.color = colors[index % colors.length]);

    const onPointSelect = (point, index) => {
        const newPoint = state.selectedPoint === index ? null : index;
        setState({ selectedPoint: newPoint });
        if (newPoint !== null)
            map.current.panTo(point);
    };

    const onTabSelect = index => {
        setSelectedTab(index);
    };

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
                        <DownPanel>
                            <Header>
                                {tabs.map((name, i) => {
                                    return <TabButton
                                        selected={selectedTab === i}
                                        key={i}
                                        onClick={() => onTabSelect(i)}>
                                        {t(name)}
                                    </TabButton>
                                })}
                            </Header>

                            {selectedTab ?
                                <TabPanel>
                                    {route.files &&
                                        route.files.map(f => {
                                            return (
                                                <p className="element">{f.name}</p>
                                            );
                                        })
                                    }

                                    {!route.files && <p className="no-data">{t('route.no_multimedia')}</p>}
                                </TabPanel>
                                :
                                <TabPanel>
                                    {route.comments &&
                                        route.comments.map(c => {
                                            return (
                                                <p className="element">{c.content}</p>
                                            );
                                        })
                                    }

                                    {!route.comments && <p className="no-data">{t('route.no_comments')}</p>}
                                    <ContenedorComentario>
                                        <AñadirComentarioTexto placeholder="¿Qué opinas?"/>
                                        <AñadirComentarioBoton>
                                            Comentar
                                        </AñadirComentarioBoton>
                                    </ContenedorComentario>
                                </TabPanel>
                            }
                        </DownPanel>

                    </LeftPanel>

                    <RightPanel>
                        <RouteViewHeader>
                            <h1>{route.name}</h1>
                            <RouteMapContext.Consumer>
                                {props => (
                                    props.myRoutes && <div><button onClick={() => props.onDeleteClick(route.id)}>{t('route.delete')}</button>
                                        <button onClick={() => props.onPublishClick(route.id)}>{t('route.publish')}</button>
                                    </div>
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