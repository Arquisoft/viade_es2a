import React from 'react';
import { useTranslation } from 'react-i18next';

import { LocationInfoHolder } from './location-menu-comment.style';

import { RouteViewContext } from '../../../../../../../route-view.component';

const LocationInfo = ({ point, index }) => {
    const { t } = useTranslation();

    return (
        <RouteViewContext.Consumer>
            {props => (
                <LocationInfoHolder
                    color={point.color.hexCode}
                    selected={props.selectedPoint === index}
                    name={point.name}
                    description={point.description}
                    onClick={() => props.onPointSelectComment(index)}>

                    <svg className="marker" height="20" width="20">
                        <circle cx="10" cy="10" r="8" stroke={point.color.hexCode} strokeWidth="2" fill="none" />
                        {props.selectedPointComment === index &&
                            <circle cx="10" cy="10" r="8" stroke={point.color.hexCode} strokeWidth="2" fill={point.color.hexCode} />
                        }
                    </svg>

                    <div className="content">
                        <div className="header">
                            <p className="name">{point.name ? point.name : t("route.no_name")}</p>
                        </div>
                    </div>

                </LocationInfoHolder>
            )}
        </RouteViewContext.Consumer>
    );
};

export default LocationInfo;