import React from 'react';
import { cleanup } from 'react-testing-library';
import { BrowserRouter as Router } from 'react-router-dom';
import GroupCreationPanel from './group-creation-panel.component';

import 'jest-dom/extend-expect';

import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

afterAll(cleanup);

const webId = 'https://marcosav.inrupt.net/profile/card#me';

describe.only('GroupCreationPanel', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(
      <Router>
        <GroupCreationPanel { ...{webId: webId } } />
      </Router>);
  });

  it('renders without crashing', () => {
    expect(wrapper).toBeTruthy();
  });

  it('renders on creation', () => {
    expect(wrapper.find('#group-fields')).toBeDefined();
  });

  it('renders the right data', () => {
    expect(wrapper.find('#group-fields').props().webId).toBeDefined();
    expect(wrapper.find('#group-fields').props().webId).toStrictEqual(webId);
  })
});