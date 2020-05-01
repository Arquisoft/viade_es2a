import React from 'react';
import { cleanup } from 'react-testing-library';
import FeedAdditionPanel from './feed-addition-panel.component';
import { RouteMapContext } from '@containers/MyRoutes/my-routes.component';

import 'jest-dom/extend-expect';
import { FeedContext } from '../../feed.component';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

/*const friends = [
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
];*/

describe('FeedAdditionPanel', () => {
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
          <FeedAdditionPanel />
        </FeedContext.Provider>
      </RouteMapContext.Provider>
    );
  
  });

  it('renders without crashing', () => {
    expect(wrapper).toBeTruthy();
  });

  it('renders on creation', () => {
    expect(wrapper.find('.wrap')).toBeDefined();
    expect(wrapper.find('.button')).toBeDefined();
    expect(wrapper.find('.feed-container')).toBeDefined();
    expect(wrapper.find('.tabcontainer')).toBeDefined();
    expect(wrapper.find('.sc1')).toBeDefined();
    expect(wrapper.find('.sc2')).toBeDefined();
    expect(wrapper.find('.tabButton-0')).toBeDefined();
    expect(wrapper.find('.tabButton-1')).toBeDefined();

    expect(wrapper.find('.tabcontainer')).toHaveLength(3);

    
    
});
});
