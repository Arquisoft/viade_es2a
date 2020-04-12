import React from 'react';

import {
    RemoveButton
} from './waypoint.style';

import { useTranslation } from 'react-i18next';

const Waypoint = ({ index, waypoint, setWaypointName, setWaypointDesc, onWaypointDelete }) => {

    const { t } = useTranslation();

    return <div style={{ display: 'flex', flexDirection: 'row' }}>
        <RemoveButton className="button" onClick={() => onWaypointDelete(index)}>×</RemoveButton>

        <div style={{ display: 'flex', flexDirection: 'column', width: '100%', padding: '.5em' }}>
            <input
                className="waypoint_name"
                style={{ marginBottom: '.2em' }}
                type='text'
                value={waypoint.name}
                onChange={e => setWaypointName(index, e.target.value)}
                placeholder={t("route.no_name")} />

            <input
                className="waypoint_description"
                type='text'
                value={waypoint.description}
                onChange={e => setWaypointDesc(index, e.target.value)}
                placeholder={t("route.no_description")} />

        </div>
    </div>;
};

export default Waypoint;