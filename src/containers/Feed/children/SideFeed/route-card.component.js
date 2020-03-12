import React, { Component, useState } from 'react';
import moment from 'moment';
import { RouteCardWrapper } from './side-feed.style';
import { Trans, useTranslation } from 'react-i18next';

import { useWebId } from '@inrupt/solid-react-components';

import { FeedContext } from '../../feed.component'

const RouteCard = props => {
    const { route } = props;

    const { t } = useTranslation();

    const webId = useWebId();
    var regex1 = /^https:\/\//gi;
    var regex2 = /\..*/gi;
    if (webId === (route.author + "me"))
        regex1 = /.*/gi;
    var m = (moment(route.date).fromNow())

    return (
        <FeedContext.Consumer>
            {props => (
                <RouteCardWrapper
                    color={route.color.hexCode}
                    selected={props.state.selectedRoute == route.id}
                    onClick={() => props.setState({ selectedRoute: route.id })}>

                    <span className="title">{route.name}</span>
                    <span className="author">{route.author.replace(regex1, "").replace(regex2, "")}</span>
                    <span className="date">{m}</span>
                </RouteCardWrapper>
            )}
        </FeedContext.Consumer>
    )
}

export default RouteCard;