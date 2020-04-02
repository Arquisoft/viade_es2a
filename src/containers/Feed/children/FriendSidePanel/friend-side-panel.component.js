import React from 'react';

import {
  FriendPanelHolder,
  FriendContainer,
  FriendPanelHeader,
  CollapseButton
} from './friend-side-panel.style';

import { useTranslation } from 'react-i18next';

import FriendHolder from './friend-holder.component';

const FriendSidePanel = ({ friends, collapsed, setCollapsed }) => {
  const { t } = useTranslation();

  return <FriendPanelHolder {...{ collapsed }}>
    <FriendPanelHeader>
      {t("friends.friends")}
      {!collapsed && <CollapseButton onClick={() => setCollapsed(true)}>⇢</CollapseButton>}
    </FriendPanelHeader>

    <FriendContainer>
      {friends.map(friend => {
        return <FriendHolder key={friend} {... { friend }} />;
      })}
    </FriendContainer>
  </FriendPanelHolder>
}

export default FriendSidePanel;
