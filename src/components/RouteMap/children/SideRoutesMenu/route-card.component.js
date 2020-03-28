import React from 'react';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import {userService} from '@services';
import {
    RouteCardWrapper,
    DetailsButton,
    RouteCardHeader
} from './side-routes-menu.style';

import { useWebId } from '@inrupt/solid-react-components';

import { RouteMapContext } from '../../route-map.component'

const RouteCard = ({ route }) => {
    const { t } = useTranslation();
    const [processedAuthor, setProcessedAutor] = React.useState("");
    const webId = useWebId();

    var m = (moment(route.date).fromNow());

    userService.getUserName(route.author).then((name)=>setProcessedAutor(name));

    return (
        <RouteMapContext.Consumer>
            {props => (
                <RouteCardWrapper
                    color={route.color.hexCode}
                    selected={props.state.selectedRoute === route.id}>

                    <RouteCardHeader onClick={() => props.onRouteSelect(route)}>
                        <span className="title">{route.name}</span>
                        {((route.author !== webId))&& <span className="author">{processedAuthor.toString()}</span>}
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