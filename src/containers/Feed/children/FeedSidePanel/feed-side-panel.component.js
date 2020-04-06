import React from 'react';

import {
  FeedPanelHolder,
  FriendContainer,
  GroupContainer,
  TabContainer,
  MainTabContainer,
  TabButton
} from './feed-side-panel.style';

import { useTranslation } from 'react-i18next';

import { FriendHolder, GroupHolder } from './children';

const FeedSidePanel = ({ friends, groups, collapsed, setCollapsed, webId, onGroupSelected, setSelectedGroup }) => {
  const { t } = useTranslation();

  const [selectedTab, setSelectedTab] = React.useState(0);

  const tabs = ["friends.friends", "feed.groups"];

  return <FeedPanelHolder id='feed-container' {...{ collapsed }}>
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

    <GroupContainer hidden={!selectedTab}>
      {console.log('Grupos' + groups)}
      {groups.map(group => {
        return <GroupHolder key={group.id} {... { group, onGroupSelected, setSelectedGroup }} />;
      })}
    </GroupContainer>

    <FriendContainer hidden={selectedTab}>
      {friends.map(friend => {
        return <FriendHolder key={friend} {... { friend }} />;
      })}
    </FriendContainer>
  </FeedPanelHolder>
}

export default FeedSidePanel;
