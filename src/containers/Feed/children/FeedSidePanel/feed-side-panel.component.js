import React from 'react';

import {
  SidePanelHolder,
  SideElementContainer,
  TabContainer,
  MainTabContainer,
  TabButton
} from './feed-side-panel.style';

import { useTranslation } from 'react-i18next';

import { FriendHolder, GroupHolder } from './children';

const FeedSidePanel = ({ friends, groups, collapsed, setCollapsed }) => {
  const { t } = useTranslation();

  const [selectedTab, setSelectedTab] = React.useState(0);

  const tabs = ["friends.friends", "feed.groups"];

  return <SidePanelHolder
    id='feed-container' {...{ collapsed, minWidth: '18em', maxWidth: '24em' }}>
    <TabContainer>
      <MainTabContainer>
        {tabs.map((name, i) => {
          return <TabButton
            id={"tab-" + tabs[i]}
            selected={selectedTab === i}
            key={i}
            onClick={() => setSelectedTab(i)}
          >
            {t(name)}
          </TabButton>;
        })}
      </MainTabContainer>

      {!collapsed && <TabButton className='collapse' onClick={() => setCollapsed(true)}>⇢</TabButton>}
    </TabContainer>

    <SideElementContainer hidden={!selectedTab}>
      {groups.map(group => {
        return <GroupHolder key={group.id} {... { group }} />;
      })}
    </SideElementContainer>

    <SideElementContainer hidden={selectedTab}>
      {friends.map(friend => {
        return <FriendHolder key={friend} {... { friend }} />;
      })}
    </SideElementContainer>
  </SidePanelHolder>
}

export default FeedSidePanel;
