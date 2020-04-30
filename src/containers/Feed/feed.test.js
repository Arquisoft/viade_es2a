import React from 'react';
import { render, cleanup } from 'react-testing-library';
import { HashRouter as Router } from 'react-router-dom';
import { FeedContainer } from './feed.container';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

const webId = 'https://marcosav.inrupt.net/profile/card#';

describe.only('Feed', () => {
  afterAll(cleanup);

  let wrapper;
  beforeEach(() => {
      wrapper = mount(
        <Router>
        <FeedContainer {... { webId }} />
      </Router>
      );
  });
  test('renders without crashing', () => {
    expect(wrapper).toBeTruthy();
  });

 test('renders with styled components', () => {
    expect(wrapper.find('.RouteMapHolder')).toBeDefined();
    expect(wrapper.find('.Map')).toBeDefined();
    expect(wrapper.find('.FeedSidePanel')).toBeDefined();
    expect(wrapper.find('.RouteViewModal')).toBeDefined();
    expect(wrapper.find('.RouteView')).toBeDefined();
    expect(wrapper.find('.FeedAdditionModal')).toBeDefined();
    expect(wrapper.find('.FeedAdditionPanel')).toBeDefined();
    expect(wrapper.find('.GroupViewModal')).toBeDefined();
    expect(wrapper.find('.GroupView')).toBeDefined();
    expect(wrapper.find('.GroupEditionModal')).toBeDefined();
    expect(wrapper.find('.FloatingButton')).toBeDefined();

  });
});