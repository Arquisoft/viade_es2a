import React from 'react';
import { render, cleanup } from 'react-testing-library';
import { BrowserRouter as Router } from 'react-router-dom';
import { FeedContainer } from './feed.container';

const webId = 'https://marcosav.inrupt.net/profile/card#';

describe.only('Feed', () => {
  afterAll(cleanup);
  const { container, getByTestId } = render(
    <Router>
      <FeedContainer {... { webId }} />
    </Router>
  );

  test('renders without crashing', () => {
    expect(container).toBeTruthy();
  });

  test('renders with styled components', () => {
    //expect(getByTestId('route-map')).toBeTruthy();
    //expect(getByTestId('feed-map')).toBeTruthy();
    //expect(getByTestId('side-menu')).toBeTruthy();
  });
});