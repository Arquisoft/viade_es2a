import React from 'react';
import moment from 'moment';
import { RouteCardWrapper } from './side-routes-menu.style';
import { useTranslation } from 'react-i18next';

import { useWebId } from '@inrupt/solid-react-components';

import { RouteMapContext } from '../../feed.component'

const RouteCard = props => {
    const { route, onRouteView } = props;

    const { t } = useTranslation();

    const webId = useWebId();
    var regex1 = /^https:\/\//gi;
    var regex2 = /\..*/gi;
    if (webId === (route.author + "me"))
        regex1 = /.*/gi;
    var m = (moment(route.date).fromNow())

    return (
        <RouteMapContext.Consumer>
            {props => (
                <RouteCardWrapper
                    color={route.color.hexCode}
                    selected={props.state.selectedRoute === route.id}
                    onClick={() => {
                        props.setState({ selectedRoute: props.state.selectedRoute === route.id ? null : route.id });
                        onRouteView();
                    }}>

                    <span className="title">{route.name}</span>
                    <span className="author">{route.author.replace(regex1, "").replace(regex2, "")}</span>
                    <span className="date">{m}</span>
                </RouteCardWrapper>
            )}
        </RouteMapContext.Consumer>
    )
}

export default RouteCard;