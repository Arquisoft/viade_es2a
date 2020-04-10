import React from "react";
import {
    Points,
    RouteViewHeader,
    RouteOptionButton
} from "./route-points.style";

import { LocationMenu } from "./..";
import { useTranslation } from "react-i18next";
import { RouteMapContext } from '@containers/MyRoutes/my-routes.component';

const RoutePoints = ({ collapsed, route }) => {
    const { t } = useTranslation();

    return (
        <Points>

            <RouteViewHeader>
                <h1>{route.name}</h1>

                <RouteMapContext.Consumer>
                    {props =>
                        props.myRoutes && (
                            <div style={{ display: 'flex', placeContent: 'center' }}>
                                <RouteOptionButton onClick={() => props.onDeleteClick(route.id)}>
                                    <img src='img/icon/bin.svg' alt={t("route.delete")}></img>
                                </RouteOptionButton>
                                <RouteOptionButton onClick={() => props.onPublishClick(route.id)}>
                                    <img src='img/icon/share.svg' alt={t("route.share")}></img>
                                </RouteOptionButton>
                                <RouteOptionButton onClick={() => props.onEditClick(route.id)}>
                                    <img src='img/icon/edit.svg' alt={t("route.edit.action")}></img>
                                </RouteOptionButton>
                            </div>
                        )
                    }
                </RouteMapContext.Consumer>
            </RouteViewHeader>

            <LocationMenu {...{ waypoints: route.waypoints }} />

        </Points>
    );
};

export default RoutePoints;