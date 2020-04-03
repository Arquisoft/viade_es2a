import React from "react";
import { 
    Points,
    RouteViewHeader
} from "./../../route-view.style";

import { LocationMenu } from "./..";
import { useTranslation } from "react-i18next";
import { RouteMapContext } from "@components/RouteMap/route-map.component";

const RoutePoints = ({ collapsed, points, route }) => {
    const { t } = useTranslation();

    return (
        <Points>

            <RouteViewHeader>                
                <h1>{route.name}</h1>
            
                <RouteMapContext.Consumer>
                    {props =>
                        props.myRoutes && (
                            <div>
                                <button onClick={() => props.onDeleteClick(route.id)}>
                                    {t("route.delete")}
                                </button>
                                <button onClick={() => props.onPublishClick(route.id)}>
                                    {t("route.publish")}
                                </button>
                            </div>
                        )
                    }
                </RouteMapContext.Consumer>
            </RouteViewHeader>

            <LocationMenu {...{ points }} />

        </Points>
    );
};

export default RoutePoints;