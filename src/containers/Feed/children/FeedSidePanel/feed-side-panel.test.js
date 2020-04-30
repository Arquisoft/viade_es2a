import React from 'react';
import { cleanup } from 'react-testing-library';
import FeedSidePanel from './feed-side-panel.component';
import { RouteMapContext } from '@containers/MyRoutes/my-routes.component';

import 'jest-dom/extend-expect';
import { FeedContext } from '../../feed.component';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

const friends = [
  'https://marcosav.inrupt.net/profile/card#me',
  'https://marcosav2.inrupt.net/profile/card#me'
];

const groups = [
  {
    id: 'testid',
    name: "Grupo A",
    members: ["https://marcosav2.inrupt.net/profile/card#me"],
    date: 1529644667834,
    owner: 'https://marcosav.inrupt.net/profile/card#me'
  }
];

describe('FeedSidePanel', () => {
  afterAll(cleanup);

  let wrapper;
  beforeEach(() => {
    wrapper = mount(
      <RouteMapContext.Provider>
        <FeedContext.Provider value={{
          isDeletedFriend: f => false,
          isSelectedFriend: f => false,
          isSelectedGroup: g => false
        }}>
          <FeedSidePanel {...{ friends, groups }} />
        </FeedContext.Provider>
      </RouteMapContext.Provider>
    );
  });

  it('renders without crashing', () => {
    expect(wrapper).toBeTruthy();
  });

  it('renders on creation', () => {
    expect(wrapper.find('.FeedPanelHolder')).toBeDefined();
    expect(wrapper.find('.TabContainer')).toBeDefined();
    expect(wrapper.find('.MainTabContainer')).toBeDefined();
    expect(wrapper.find('.FriendContainer')).toBeDefined();


    expect(wrapper.find('.FeedPanelHolder')).toHaveLength(0);
    expect(wrapper.find('.TabContainer')).toHaveLength(0);
    expect(wrapper.find('.MainTabContainer')).toHaveLength(0);
    expect(wrapper.find('.FriendContainer')).toHaveLength(0);
  });
});
