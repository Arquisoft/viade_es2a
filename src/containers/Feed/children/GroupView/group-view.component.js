import React from 'react';

import {
    GroupPanel,
    GroupHeader,
    MemberContainer,
    GroupLine
} from './group-view.style';

import { ModalCloseButton, MobileCompatWrapper } from '@utils';

const GroupView = ({ selectedGroup, closeGroupView }) => {
    return <MobileCompatWrapper>
        <ModalCloseButton onClick={closeGroupView} />
        <GroupPanel>
            <GroupHeader id={"group-name"} content={selectedGroup.name}>{selectedGroup.name}</GroupHeader>
            <MemberContainer>
                {selectedGroup ? selectedGroup.members.map((member, i) => {
                    return <GroupLine id={"member-" + member} key={i}>{member}</GroupLine>
                }) : 'null'}
            </MemberContainer>
        </GroupPanel>
    </MobileCompatWrapper>;
};

export default GroupView;