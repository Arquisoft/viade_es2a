import React from 'react';

import { useTranslation } from 'react-i18next';

import {
    FeedAdditionPanelHolder,
    FriendContainer,
    GroupContainer,
    TabContainer,
    MainTabContainer,
    TabButton
  } from './feed-addition-panel.style';

import { AddFriend, GroupCreationPanel } from '@containers/Feed/children';

import { MobileCompatWrapper } from '../../../../utils/modal-wrapper';

const FeedSidePanel = ({ webId, closeFeedAddition, onGroupCreation, fetchFriends, fetchGroups }) => {
    const { t } = useTranslation();
  
    const [selectedTab, setSelectedTab] = React.useState(0);
  
    const tabs = ["feedadditionpanel.friends", "feedadditionpanel.groups"];
  
    return <MobileCompatWrapper>
      <FeedAdditionPanelHolder id='feed-container'>
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
        </TabContainer>
    
        <GroupContainer hidden={!selectedTab}>
          <GroupCreationPanel {...{ webId, onGroupCreation, closeFeedAddition, fetchGroups }} />
        </GroupContainer>
    
        <FriendContainer hidden={selectedTab}>
          <AddFriend {...{ webId, closeFeedAddition, fetchFriends }} />    
        </FriendContainer>
      </FeedAdditionPanelHolder>
    </MobileCompatWrapper>
  }
  
  export default FeedSidePanel;