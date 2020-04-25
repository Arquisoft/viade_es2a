import React, { useState } from 'react';

import { GroupFields } from './children';

import { useTranslation } from 'react-i18next';

import {
    AddGroupPanel,
} from './group-creation-panel.style';

import { errorToaster, successToaster } from '@utils';

const GroupCreationPanel = ({ webId, onGroupCreation }) => {
    const { t } = useTranslation();

    const [members, setMembers] = useState([]);

    const onSave = async ({ name }) => {
        const group = {
            name,
            members,
            date: Date.now(),
            owner: webId
        };

        successToaster(t('groupcreator.creation_content'), t('groupcreator.creation_title'));
        await onGroupCreation(group);
    };

    const onAddMember = async ({ newMember }) => {
        console.log(newMember);
        setMembers(members.concat(newMember));
        console.log("MIEMBROS:");
        console.log(members);
    }

    const onError = error => {
        errorToaster(error, 'Error');
    };

    const onSuccess = () => {
        successToaster(t('groupcreator.friend_content'), t('groupcreator.friend_title'));
    }

    return <AddGroupPanel>
        <GroupFields {...{ onSave, onAddMember, onError, onSuccess, webId }} />
    </AddGroupPanel>;
};

export default GroupCreationPanel;