import React, { useState } from 'react';

import { MobileCompatWrapper } from '@utils';

import { GroupFields } from './children';

import { 
    AddGroupPanel,
    AddGroupHeader,
} from './group-creation-panel.style';

import { useTranslation } from 'react-i18next';

import { errorToaster, ModalCloseButton } from '@utils';

const GroupCreationPanel = ({ webId, onGroupCreation, closeGroupCreation, fetchGroups }) => {
    const { t } = useTranslation();

    const [members, setMembers] = useState([]);

    const onSave = async ({ name }) => {
        const group = {
            name,
            members,
            date: Date.now(),
            owner: webId
        };

        await onGroupCreation(group);
        await fetchGroups(); 
    };

    const onAddMember = async ({ newMember }) => {
        setMembers(members.concat(newMember));
    }

    const onError = error => {
        errorToaster(error, 'Error');
    };

    return (
        <MobileCompatWrapper>
            <ModalCloseButton onClick={closeGroupCreation} />
            <AddGroupPanel>
                <AddGroupHeader>{'Add group'}</AddGroupHeader>
                <GroupFields {...{ onSave, onAddMember, onError }} /> 
            </AddGroupPanel>
        </MobileCompatWrapper>
      );
};

export default GroupCreationPanel;