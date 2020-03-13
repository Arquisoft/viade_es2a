import React, { useState } from 'react';
import { render } from 'react-dom';
import { RouteViewWrapper } from './route-view.style';

const RouteView = props => {
    const { route } = props;

    return (
        <RouteViewWrapper className="card">
            <h1>{route.name}</h1>
        </RouteViewWrapper>
    );
}

export default RouteView;