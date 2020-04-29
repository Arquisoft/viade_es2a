import React from 'react';

import {
    GroupPanel,
    GroupHeader,
    GroupCard,
    GroupLine
} from './group-view.style';

import { ModalCloseButton } from '@utils';

const GroupView = ({ selectedGroup, closeGroupView }) => {

    return <GroupPanel>
        <ModalCloseButton onClick={closeGroupView} />
        <GroupHeader>{selectedGroup.name}</GroupHeader>
        <GroupCard>
            {selectedGroup ? selectedGroup.members.map((member, i) => {
                return <GroupLine id={"member-" + i} key={i}>{member}</GroupLine>
            }) : 'null'}
        </GroupCard>
    </GroupPanel>;
};

export default GroupView;