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
    CommentContainer,
    AddCommentText,
    AddCommentButton,
    ScrollPanelComments,
    CommentSeparatorLine
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

    const comments = [
        { content: "Comentario 1", author: "Labra", idAuthor: "1" },
        { content: "Comentario 2", author: "Jesus", idAuthor: "2" },
        { content: "Comentario 3", author: "Marcos", idAuthor: "3" },
        { content: "Comentario 4", author: "Marcos", idAuthor: "3" },
        { content: "Comentario 5 muyyyyyyyyyyyyyyyyyy lagroooooooooooooooooooooo sklfhsnkf sdklf shfk shnfksdh fdks fhsdjkfhsdkf shkfds hfkds fhsdkfdskjfh skf shfkds hfskjf hksjd f", author: "Marcos", idAuthor: "3" },
        { content: "Comentario 6", author: "Marcos", idAuthor: "3" },
        { content: "Comentario 6", author: "Marcos", idAuthor: "3" },
        { content: "Comentario 6", author: "Marcos", idAuthor: "3" },
        { content: "Comentario 6", author: "Marcos", idAuthor: "3" },
        { content: "Comentario 6", author: "Marcos", idAuthor: "3" },
        { content: "Comentario 6", author: "Marcos", idAuthor: "3" },
        { content: "Comentario 6", author: "Marcos", idAuthor: "3" },
        { content: "Comentario 6", author: "Marcos", idAuthor: "3" },
        { content: "Comentario 6", author: "Marcos", idAuthor: "3" },
        { content: "Comentario 6", author: "Marcos", idAuthor: "3" },
        { content: "Comentario 6", author: "Marcos", idAuthor: "3" },
        { content: "Comentario 6", author: "Marcos", idAuthor: "3" },
        { content: "Comentario 6", author: "Marcos", idAuthor: "3" },
        { content: "Comentario 6", author: "Marcos", idAuthor: "3" }
    ];

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
                                    <ScrollPanelComments>
                                        {comments &&
                                            comments.map(c => {
                                                return (
                                                    <p>
                                                        <p className="element">{c.content} - {c.author}</p>
                                                        <CommentSeparatorLine />
                                                    </p>
                                                );
                                            })
                                        }
                                    </ScrollPanelComments>

                                    {!comments && <p className="no-data">{t('route.no_comments')}</p>}
                                    <CommentContainer>
                                        <AddCommentText placeholder="¿Qué opinas?" />
                                        <AddCommentButton title="Elejir punto">
                                            <img src="img/icon/choosePoint.png"/>
                                        </AddCommentButton>
                                        <AddCommentButton title="Comentar">
                                            <img src="img/icon/sendMessage.png"/>
                                        </AddCommentButton>
                                    </CommentContainer>
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