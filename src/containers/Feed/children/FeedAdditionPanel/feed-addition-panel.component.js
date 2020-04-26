import React from 'react';

import { useTranslation } from 'react-i18next';

import {
  FeedAdditionPanelHolder,
  SectionContainer,
  TabContainer,
  TabButton
} from './feed-addition-panel.style';

import { AddFriend, GroupCreationPanel } from './children';
import { ModalCloseButton } from '@utils';

import { MobileCompatWrapper } from '@utils';

const FeedSidePanel = ({ webId, closeFeedAddition, onGroupCreation, fetchFeed }) => {
  const { t } = useTranslation();

  const [selectedTab, setSelectedTab] = React.useState(0);

  const tabs = ["feedadditionpanel.friends", "feedadditionpanel.groups"];

  return <MobileCompatWrapper>
    <ModalCloseButton onClick={closeFeedAddition} />
    <FeedAdditionPanelHolder id='feed-container'>
      <TabContainer>
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
      </TabContainer>

      <SectionContainer hidden={!selectedTab}>
        <GroupCreationPanel {...{ webId, closeFeedAddition, onGroupCreation }} />
      </SectionContainer>

      <SectionContainer hidden={selectedTab}>
        <AddFriend {...{ webId, fetchFeed }} />
      </SectionContainer>
    </FeedAdditionPanelHolder>
  </MobileCompatWrapper>
}

export default FeedSidePanel;