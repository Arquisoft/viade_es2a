import React from 'react';
import { cleanup } from 'react-testing-library';
import GroupEditionPanel from './group-edition-panel.component';
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

describe('GroupEditionPanel', () => {
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
          <GroupEditionPanel {...{ selectedGroup: groups[0] }} />
        </FeedContext.Provider>
      </RouteMapContext.Provider>
    );
  });

  it('renders without crashing', () => {
    expect(wrapper).toBeTruthy();
  });

  it('renders group data', () => {
    expect(wrapper.find("#edit-fields").props().selectedGroup).toBeDefined();
  });

  it('renders right data', () => {
    expect(wrapper.find("#edit-fields").props().selectedGroup).toStrictEqual(groups[0]);
  });
});
