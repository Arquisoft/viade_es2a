import React, { useState } from 'react';

import { useTranslation } from 'react-i18next';

import {
    EditGroupPanel,
    EditGroupWrapper
} from './group-edition-panel.style';

import EditFields from './children'

import { errorToaster, successToaster, ModalCloseButton } from '@utils';

const GroupEditionPanel = ({ webId, closeGroupEdition, onGroupCreation, selectedGroup }) => {
    const { t } = useTranslation();

    const [members, setMembers] = useState(selectedGroup.members);
    const date = selectedGroup.date;

    const onEdit = async (name) => {
        const group = {
            name,
            members,
            date,
            owner: webId
        };

        successToaster(t('groupeditor.edition_content'), t('groupeditor.edition_title'));
        await onGroupCreation(group);
        closeGroupEdition();
    };

    const onAddMembers = async newMembers => {
        setMembers([...members, ...newMembers]);
    }

    const onError = error => {
        errorToaster(error, 'Error');
    };

    const onSuccess = () => {
        successToaster(t('groupcreator.friend_content'), t('groupcreator.friend_title'));
    }

    return <EditGroupWrapper>
        <ModalCloseButton onClick={closeGroupEdition} />
        <EditGroupPanel>
            <EditFields {...{ onEdit, onAddMembers, onError, onSuccess, webId, selectedGroup }} />
        </EditGroupPanel>
    </EditGroupWrapper>;
};

export default GroupEditionPanel;