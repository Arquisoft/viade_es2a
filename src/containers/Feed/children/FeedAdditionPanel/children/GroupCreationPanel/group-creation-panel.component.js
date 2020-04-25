import React, { useState } from 'react';

import { GroupFields } from './children';

import {
    AddGroupPanel,
} from './group-creation-panel.style';

import { errorToaster, successToaster } from '@utils';

const GroupCreationPanel = ({ webId, onGroupCreation }) => {

    const [members, setMembers] = useState([]);

    const onSave = async ({ name }) => {
        const group = {
            name,
            members,
            date: Date.now(),
            owner: webId
        };

        successToaster('Please wait while the group is created', 'Creating');
        await onGroupCreation(group);
    };

    const onAddMember = async ({ newMember }) => {
        setMembers(members.concat(newMember));
    }

    const onError = error => {
        errorToaster(error, 'Error');
    };

    const onSuccess = name => {
        successToaster(name + ' added succesfully to group', 'Friend added');
    }

    return <AddGroupPanel>
        <GroupFields {...{ onSave, onAddMember, onError, onSuccess }} />
    </AddGroupPanel>;
};

export default GroupCreationPanel;