import React from 'react';

import moment from 'moment';

import { useTranslation } from 'react-i18next';

import {
    RouteCardWrapper,
    DetailsButton,
    RouteCardHeader
} from './side-routes-menu.style';

import { RouteMapContext } from '../../route-map.component';

const RouteCard = ({ route }) => {
    const { t } = useTranslation();

    var m = (moment(route.date).fromNow());

    return (
        <RouteMapContext.Consumer>
            {props => (
                <RouteCardWrapper
                    color={route.color.hexCode}
                    selected={props.selectedRoute === route.id}>

                    <RouteCardHeader onClick={() => props.onRouteSelect(route)}>
                        <span className="title">{route.name}</span>
                        <span className="date" style={{ 'alignSelf': 'self-end' }}>{m}</span>
                    </RouteCardHeader>

                    {props.selectedRoute === route.id && <DetailsButton onClick={props.onRouteView} color={route.color.hexCode}>
                        {t('route.details')}
                    </DetailsButton>}
                </RouteCardWrapper>
            )}
        </RouteMapContext.Consumer>
    );
};

export default RouteCard;