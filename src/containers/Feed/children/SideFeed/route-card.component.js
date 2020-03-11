import React, { Component, useState } from 'react';

import { RouteCardWrapper } from './side-feed.style';
import { Trans, useTranslation } from 'react-i18next';

const RouteCard = props => {
    const { route, onRouteClick } = props;

    const { t } = useTranslation();

    return (
        <RouteCardWrapper
            color={route.color.hexCode}
            onClick={() => onRouteClick(route.id)}>
                
            <span className="title">{route.name}</span>
            <span className="author">{route.author}</span>
        </RouteCardWrapper>
    )
}

export default RouteCard;