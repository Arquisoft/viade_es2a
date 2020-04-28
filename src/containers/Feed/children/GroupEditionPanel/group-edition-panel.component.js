import React, { useState } from 'react';

import { useTranslation } from 'react-i18next';

import {
    EditGroupPanel,
    EditGroupWrapper
} from './group-edition-panel.style';

import EditFields from './children'

import { errorToaster, successToaster, ModalCloseButton } from '@utils';

import { groupService } from '@services';

const GroupEditionPanel = ({ webId, closeGroupEdition, onGroupCreation, selectedGroup, onGroupDeletion }) => {
    const { t } = useTranslation();

    const [members, setMembers] = useState(selectedGroup.members);
    const date = selectedGroup.date;

    const onEdit = async (name) => {
        await groupService.deleteGroup(selectedGroup.id);
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

    const onDeleteMembers = async newMembers => {
        console.log(newMembers);
        setMembers(newMembers);
        successToaster("Member succesfully removed", t('groupeditor.edition_title'));
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
            <EditFields {...{ onEdit, onAddMembers, onError, onSuccess, webId, selectedGroup, onDeleteMembers, onGroupDeletion }} />
        </EditGroupPanel>
    </EditGroupWrapper>;
};

export default GroupEditionPanel;