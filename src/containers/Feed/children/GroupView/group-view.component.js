import React from 'react';

import {
    GroupPanel,
    GroupHeader,
    Button,
    GroupCard,
    GroupLine
} from './group-view.style';

import { useTranslation } from 'react-i18next';

import { ModalCloseButton, errorToaster } from '@utils';

const GroupView = ({ selectedGroup, closeGroupView }) => {
    const { t } = useTranslation();

    const deleteGroup = async () => {
        errorToaster('Not available yet');
    };

    return <GroupPanel>
        <ModalCloseButton onClick={closeGroupView} />
        <GroupHeader>{selectedGroup.name}</GroupHeader>
        <GroupCard>
            {selectedGroup ? selectedGroup.members.map(member => {
                return <GroupLine>{member} </GroupLine>
            }) : 'null'}
            <GroupLine>
                <Button onClick={() => deleteGroup()}>{t('groupviewer.delete')}</Button>
            </GroupLine>
        </GroupCard>
    </GroupPanel>;
};

export default GroupView;