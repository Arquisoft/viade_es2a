import React, { Component, useState } from 'react';

import { RouteCardWrapper } from './side-feed.style';
import { Trans, useTranslation } from 'react-i18next';

import { useWebId } from '@inrupt/solid-react-components';

const RouteCard = props => {
    const { route, onRouteClick } = props;

    const { t } = useTranslation();

    const webId = useWebId();
    var regex1 = /^https:\/\//gi;
    var regex2 = /\..*/gi;
    if (webId === (route.author + "me"))
        regex1 = /.*/gi;

    return (
        <RouteCardWrapper
            color={route.color.hexCode}
            onClick={() => onRouteClick(route.id)}>

            <span className="title">{route.name}</span>
            <span className="author">{route.author.replace(regex1, "").replace(regex2, "")}</span>
        </RouteCardWrapper>
    )
}

export default RouteCard;