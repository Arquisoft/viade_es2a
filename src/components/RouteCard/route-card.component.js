import React from 'react';

import moment from 'moment';

import { useTranslation } from 'react-i18next';

import {
    RouteCardWrapper,
    OptionButton,
    OptionButtonContainer,
    RouteCardHeader
} from './route-card.style';

import { RouteMapContext } from '@containers/MyRoutes/my-routes.component';

const RouteCard = ({ route }) => {
    const { t } = useTranslation();

    var m = (moment(route.date).fromNow());
    const title = "title_"+route.name;
    const date = "date_"+route.name;
    
    return <RouteMapContext.Consumer>
        {props => (
            <RouteCardWrapper
                className="rwrapper"
                color={route.color.hexCode}
                selected={props.selectedRoute === route.id}>

                <RouteCardHeader onClick={() => props.onRouteSelect(route)}>
                    <span className={title} name={route.name}>{route.name}</span>
                    <span className={date} style={{ alignSelf: 'self-end' }}>{m}</span>
                </RouteCardHeader>

                {props.selectedRoute === route.id &&
                    <OptionButtonContainer>
                        {props.myRoutes &&
                            <OptionButton onClick={props.shareRoute} color={route.color.hexCode} name="route-share">
                                {t('route.share')}
                            </OptionButton>
                        }
                        <OptionButton onClick={props.onRouteView} color={route.color.hexCode} name="route-details">
                            {t('route.details')}
                        </OptionButton>
                    </OptionButtonContainer>
                }
            </RouteCardWrapper>
        )}
    </RouteMapContext.Consumer>;
};

export default RouteCard;