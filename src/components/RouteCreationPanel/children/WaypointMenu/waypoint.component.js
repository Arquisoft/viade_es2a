import React from 'react';

import { useTranslation } from 'react-i18next';

const Waypoint = ({ index, waypoint, onWaypointDelete }) => {
    const { t } = useTranslation();

    return (
        <div className = "waypoint">
            <div className = "waypoint_name">{waypoint.name ? waypoint.name : t("route.no_name")}</div>
            <div className = "waypoint_description">{waypoint.description ? waypoint.description : t("route.no_description")}</div>
            <p className='pepe'>AAA</p>
            <button onClick={() => onWaypointDelete(index)}>Delete</button>
        </div>
    )
}

export default Waypoint;