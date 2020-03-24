import React from 'react';
import moment from 'moment';
import { useTranslation } from 'react-i18next';

import {
    RouteCardWrapper,
    DetailsButton,
    RouteCardHeader
} from './side-routes-menu.style';

import { useWebId } from '@inrupt/solid-react-components';

import { RouteMapContext } from '../../route-map.component'

const RouteCard = ({ route }) => {
    const { t } = useTranslation();

    const webId = useWebId();
    var regex1 = /^https:\/\//gi;
    var regex2 = /\..*/gi;

    if (webId === (route.author + "me"))
        regex1 = /.*/gi;

    var m = (moment(route.date).fromNow());

    const processedAuthor = route.author ? route.author.replace(regex1, "").replace(regex2, "") : '';

    return (
        <RouteMapContext.Consumer>
            {props => (
                <RouteCardWrapper
                    color={route.color.hexCode}
                    selected={props.state.selectedRoute === route.id}>

                    <RouteCardHeader onClick={() => props.onRouteSelect(route)}>
                        <span className="title">{route.name}</span>
                        <span className="author">{processedAuthor}</span>
                        <span className="date" style={{ 'alignSelf': 'self-end' }}>{m}</span>
                    </RouteCardHeader>

                    {props.state.selectedRoute === route.id && <DetailsButton onClick={props.onRouteView} color={route.color.hexCode}>
                        {t('route.details')}
                    </DetailsButton>}
                </RouteCardWrapper>
            )}
        </RouteMapContext.Consumer>
    )
}

export default RouteCard;