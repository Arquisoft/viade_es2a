import React from "react";
import { DropdownOptions } from "./../../../../../../route-view.style";
import { useTranslation } from 'react-i18next';

const WaypointsDropdown = ({ route }) => {
    const { t } = useTranslation();

    console.log(route);
    const points = route.waypoints;
    
    return (
        <DropdownOptions>
            {points.map((point, index) => {
                return (
                    <div className="content">
                        <div className="header">
                            <p className="name">{point.name ? point.name : t("route.no_name")}</p>
                        </div>

                        <div>
                            <p className="description">{point.description ? point.description : t("route.no_description")}</p>
                        </div>}
                    </div>
                );
            })}
        </DropdownOptions>
    );
};

export default WaypointsDropdown;