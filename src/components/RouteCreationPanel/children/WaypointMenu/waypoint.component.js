import React from 'react';

import { useTranslation } from 'react-i18next';

const Waypoint = ({ index, waypoint, onWaypointDelete }) => {
    const { t } = useTranslation();

    return (
        <div>
            <div>{waypoint.name ? waypoint.name : t("route.no_name")}</div>
            <div>{waypoint.description ? waypoint.description : t("route.no_description")}</div>
            <button onClick={() => onWaypointDelete(index)}>Delete</button>
        </div>
    )
}

export default Waypoint;