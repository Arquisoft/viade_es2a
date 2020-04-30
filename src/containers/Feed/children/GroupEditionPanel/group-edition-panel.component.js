import React, { useState } from 'react';

import { useTranslation } from 'react-i18next';

import {
    EditGroupPanel,
    EditGroupWrapper
} from './group-edition-panel.style';

import EditFields from './children'

import { errorToaster, successToaster, ModalCloseButton, MobileCompatWrapper } from '@utils';

const GroupEditionPanel = ({ webId, closeGroupEdition, onGroupEdition, selectedGroup, onGroupDeletion }) => {
    const { t } = useTranslation();

    const [members, setMembers] = useState(selectedGroup.members);
    const date = selectedGroup.date;

    const onEdit = async (name) => {
        const group = {
            name,
            members,
            date,
            owner: webId,
            id: selectedGroup.id
        };

        successToaster(t('groupeditor.edition_content'), t('groupeditor.edition_title'));
        await onGroupEdition(group);
        closeGroupEdition();
    };

    const onAddMembers = async newMembers => {
        setMembers([...members, ...newMembers]);
    }

    const onDeleteMembers = async newMembers => {
        setMembers(newMembers);
        successToaster("Member succesfully removed", t('groupeditor.edition_title'));
    }

    const onError = error => {
        errorToaster(error, 'Error');
    };

    const onSuccess = () => {
        successToaster(t('groupcreator.friend_content'), t('groupcreator.friend_title'));
    }

    return <MobileCompatWrapper>
        <EditGroupWrapper>
            <ModalCloseButton onClick={closeGroupEdition} />
            <EditGroupPanel>
                <EditFields id="edit-fields"
                    {...{
                        onEdit,
                        onAddMembers,
                        onError,
                        onSuccess,
                        webId,
                        selectedGroup,
                        onDeleteMembers,
                        onGroupDeletion
                    }} />
            </EditGroupPanel>
        </EditGroupWrapper>
    </MobileCompatWrapper>;
};

export default GroupEditionPanel;