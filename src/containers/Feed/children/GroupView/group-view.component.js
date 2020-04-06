import React, { useState } from 'react';

import {
    GroupPanel,
    GroupHeader,
    Button,
    GroupCard
} from './group-view.style';

import { useTranslation } from 'react-i18next';

import { errorToaster, ModalCloseButton } from '@utils';

const GroupView = ({ selectedGroup, closeGroupView, anyGroupSelected }) => {
    const { t } = useTranslation();

    const seeGroupRoutes = async () => {
        //TO DO
    };

    return <GroupPanel>
        <ModalCloseButton onClick={closeGroupView} />
        <GroupHeader>{anyGroupSelected? selectedGroup.name : 'null'}</GroupHeader>
        <GroupCard>
            {anyGroupSelected? selectedGroup.members.map(member => {
                return <p>{ member }</p>
            }) : 'null'}
            <Button onClick={seeGroupRoutes()}>{'See group routes'}</Button>
        </GroupCard>
    </GroupPanel>;
};

export default GroupView;