import React from 'react';

import {
    GroupPanel,
    GroupHeader,
    Button,
    GroupCard
} from './group-view.style';

import { useTranslation } from 'react-i18next';

import { ModalCloseButton } from '@utils';

const GroupView = ({ selectedGroup, closeGroupView }) => {
    const { t } = useTranslation();

    const seeGroupRoutes = async () => {
        //TO DO
    };

    return <GroupPanel>
        <ModalCloseButton onClick={closeGroupView} />
        <GroupHeader>{selectedGroup.name}</GroupHeader>
        <GroupCard>
            {selectedGroup ? selectedGroup.members.map(member => {
                return <div>{member} </div>
            }) : 'null'}
            <Button onClick={() => seeGroupRoutes()}>{t('groupviewer.routes')}</Button>
        </GroupCard>
    </GroupPanel>;
};

export default GroupView;