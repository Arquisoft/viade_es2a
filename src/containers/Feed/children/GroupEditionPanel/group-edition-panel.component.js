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

    const [members, setMembers] = useState([]);
    const date = selectedGroup.date;

    const onEdit = async ({ name }) => {
        
        const group = {
            name,
            members,
            date,
            owner: webId
        };

        successToaster("Por favor espere mientras se edita el grupo", "Edicion completa");
        await onGroupCreation(group);
        closeGroupEdition();
    };

    const onAddMember = async (newMember) => {
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

    return <EditGroupWrapper>
        <ModalCloseButton onClick={closeGroupEdition} />
        <EditGroupPanel>
        <EditFields {...{ onEdit, onAddMember, onError, onSuccess, webId, selectedGroup }} />
        </EditGroupPanel>
    </EditGroupWrapper>;
};

export default GroupEditionPanel;