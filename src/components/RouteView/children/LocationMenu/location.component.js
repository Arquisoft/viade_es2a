import React from 'react';
import { useTranslation } from 'react-i18next';

import { LocationInfoHolder } from './location-menu.style';

import { RouteViewContext } from '../../route-view.component'

const LocationInfo = ({ point, index }) => {
    const { t } = useTranslation();

    return (
        <RouteViewContext.Consumer>
            {props => (
                <LocationInfoHolder
                    color={point.color.hexCode}
                    selected={props.state.selectedPoint === index}
                    onClick={() => {
                        props.setState({ selectedPoint: props.state.selectedPoint === index ? null : index })
                    }}>

                    <svg class="marker" height="20" width="20">
                        <circle cx="10" cy="10" r="8" stroke={point.color.hexCode} stroke-width="2" fill="none" />
                    </svg>

                    <div class="content">
                        <div class="header">
                            <p class="name">{point.name}</p>
                        </div>

                        {props.state.selectedPoint === index && <div>
                            {point.description}
                        </div>}
                    </div>

                </LocationInfoHolder>
            )}
        </RouteViewContext.Consumer>
    )
}

export default LocationInfo;