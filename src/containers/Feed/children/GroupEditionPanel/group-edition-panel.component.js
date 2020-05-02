import React from 'react';

import { useTranslation } from 'react-i18next';

import {
    EditGroupPanel,
    EditGroupWrapper
} from './group-edition-panel.style';

import EditFields from './children'

import { errorToaster, successToaster, ModalCloseButton, MobileCompatWrapper } from '@utils';

const GroupEditionPanel = ({ webId, closeGroupEdition, onGroupEdition, selectedGroup, onGroupDeletion }) => {
    const { t } = useTranslation();

    const date = selectedGroup.date;

    const onEdit = async (name, members) => {
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

    const onError = error => {
        errorToaster(error, 'Error');
    };

    return <MobileCompatWrapper>
        <ModalCloseButton onClick={closeGroupEdition} />
        <EditGroupWrapper>
            <EditGroupPanel>
                <EditFields id="edit-fields"
                    {...{
                        onEdit,
                        onError,
                        webId,
                        selectedGroup,
                        onGroupDeletion
                    }} />
            </EditGroupPanel>
        </EditGroupWrapper>
    </MobileCompatWrapper>;
};

export default GroupEditionPanel;