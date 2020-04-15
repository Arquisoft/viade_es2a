import React, { useState } from 'react';

import { GroupFields } from './children';

import {
    AddGroupPanel,
} from './group-creation-panel.style';

import { errorToaster } from '@utils';

const GroupCreationPanel = ({ webId, onGroupCreation }) => {

    const [members, setMembers] = useState([]);

    const onSave = async ({ name }) => {
        const group = {
            name,
            members,
            date: Date.now(),
            owner: webId
        };

        await onGroupCreation(group);
    };

    const onAddMember = async ({ newMember }) => {
        setMembers(members.concat(newMember));
    }

    const onError = error => {
        errorToaster(error, 'Error');
    };

    return <AddGroupPanel>
        <GroupFields {...{ onSave, onAddMember, onError }} />
    </AddGroupPanel>;
};

export default GroupCreationPanel;