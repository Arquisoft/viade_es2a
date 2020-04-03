import React from 'react';

import {
  FriendPanelHolder,
  FriendContainer,
  GroupContainer,
  TabContainer,
  MainTabContainer,
  TabButton
} from './friend-side-panel.style';

import { useTranslation } from 'react-i18next';

import { FriendHolder } from './children';

const FriendSidePanel = ({ friends, collapsed, setCollapsed }) => {
  const { t } = useTranslation();

  const [selectedTab, setSelectedTab] = React.useState(0);

  const tabs = ["friends.friends", "feed.groups"];

  return <FriendPanelHolder {...{ collapsed }}>
    <TabContainer>
      <MainTabContainer>
        {tabs.map((name, i) => {
          return (
            <TabButton
              selected={selectedTab === i}
              key={i}
              onClick={() => setSelectedTab(i)}
            >
              {t(name)}
            </TabButton>
          );
        })}
      </MainTabContainer>

      {!collapsed && <TabButton className='collapse' onClick={() => setCollapsed(true)}>⇢</TabButton>}
    </TabContainer>

    {selectedTab ?
      <GroupContainer>

      </GroupContainer>
      :
      <FriendContainer>
        {friends.map(friend => {
          return <FriendHolder key={friend} {... { friend }} />;
        })}
      </FriendContainer>
    }
  </FriendPanelHolder>
}

export default FriendSidePanel;
