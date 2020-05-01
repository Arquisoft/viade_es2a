import React from 'react';

import {
    RemoveButton
} from './waypoint.style';

import { useTranslation } from 'react-i18next';

const Waypoint = ({ index, waypoint, setWaypointName, setWaypointDesc, onWaypointDelete }) => {

    const { t } = useTranslation();
    const name="waypoint_name_"+waypoint.name
    const desc="waypoint_description_"+waypoint.name

    return <div style={{ display: 'flex', flexDirection: 'row' }}>
        <RemoveButton className="button" onClick={() => onWaypointDelete(index)}>×</RemoveButton>

        <div style={{ display: 'flex', flexDirection: 'column', width: '100%', padding: '.5em' }}>
            <input
                className={name}
                style={{ marginBottom: '.2em' }}
                type='text'
                value={waypoint.name}
                onChange={e => setWaypointName(index, e.target.value)}
                placeholder={t("route.no_name")} />

            <input
                className={desc}
                type='text'
                value={waypoint.description}
                onChange={e => setWaypointDesc(index, e.target.value)}
                placeholder={t("route.no_description")} />

        </div>
    </div>;
};

export default Waypoint;