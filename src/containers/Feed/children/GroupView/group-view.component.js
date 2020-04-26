import React from 'react';

import {
    GroupPanel,
    GroupHeader,
    Button,
    GroupCard,
    GroupLine
} from './group-view.style';

import { useTranslation } from 'react-i18next';

import { ModalCloseButton, successToaster } from '@utils';

import { groupService } from "@services";

const GroupView = ({ selectedGroup, closeGroupView, onGroupDeletion }) => {
    const { t } = useTranslation();

    const deleteGroup = async () => {
        const aux = selectedGroup.name;
        await groupService.deleteGroup(selectedGroup.id);
        successToaster(aux + t('groupviewer.deletion_content'), t('groupviewer.deletion_title'));
        onGroupDeletion();
    };

    const editGroup = async () => {
        closeGroupView();
        //onGroupEdition(content);
    }

    return <GroupPanel>
        <ModalCloseButton onClick={closeGroupView} />
        <GroupHeader>{selectedGroup.name}</GroupHeader>
        <GroupCard>
            {selectedGroup ? selectedGroup.members.map(member => {
                return <GroupLine>{member}</GroupLine>
            }) : 'null'}
            <GroupLine>
                <Button onClick={() => deleteGroup()}>{t('groupviewer.delete')}</Button>
                <Button onClick={() => editGroup()}>{'Editar'}</Button>
            </GroupLine>
        </GroupCard>
    </GroupPanel>;
};

export default GroupView;