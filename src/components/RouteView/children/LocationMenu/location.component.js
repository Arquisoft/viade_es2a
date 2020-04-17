import React from 'react';
import { useTranslation } from 'react-i18next';

import { LocationInfoHolder } from './location-menu.style';

import { RouteViewContext } from '../../route-view.component';

import { mapUtils } from '@utils';

const LocationInfo = ({ point, index }) => {
    const { t } = useTranslation();

    const isEdge = typeof index === 'string';

    const color = isEdge ? undefined : point.color.hexCode;
    const name = isEdge ? t(`route.${index}`) : point.name;
    const marker = mapUtils.getMarkerIcon(index);

    return (
        <RouteViewContext.Consumer>
            {props => (
                <LocationInfoHolder
                    color={color}
                    selected={props.selectedPoint === index}
                    name={name}
                    description={point.description}
                    onClick={() => props.onPointSelect(point, index)}>

                    {isEdge ?
                        <img src={marker ? marker.url : undefined} alt={index} />
                        :
                        <svg className="marker" height="20" width="20">
                            <circle cx="10" cy="10" r="8" stroke={point.color.hexCode} strokeWidth="2" fill="none" />
                            {props.selectedPoint === index &&
                                <circle cx="10" cy="10" r="8" stroke={point.color.hexCode} strokeWidth="2" fill={point.color.hexCode} />
                            }
                        </svg>
                    }

                    <div className="content">
                        <div className="header">
                            <p className="name">{name ? name : t("route.no_name")}</p>
                        </div>

                        {!isEdge && props.selectedPoint === index && <div>
                            <p className="description" name={point.description ? point.description : t("route.no_description")}>{point.description ? point.description : t("route.no_description")}</p>
                        </div>}
                    </div>

                </LocationInfoHolder>
            )}
        </RouteViewContext.Consumer>
    );
};

export default LocationInfo;