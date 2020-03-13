import React from 'react';
import { render, cleanup } from 'react-testing-library';
import { BrowserRouter as Router } from 'react-router-dom';
import { FeedContainer } from './feed.container';

const props = {

};

const routes = [
  {
    name: "Test",
    author: "test",
    points: [
      { lat: -34.397, lng: 150.644 },
      { lat: -35.297, lng: 149.644 }
    ]
  }
];

describe.only('Feed', () => {
  afterAll(cleanup);
  const { container, getByTestId } = render(
    <Router>
      <FeedContainer {... { ...routes }} />
    </Router>
  );

  test('renders without crashing', () => {
    expect(container).toBeTruthy();
  });

  test('renders with styled components', () => {
    expect(getByTestId('feed-holder')).toBeTruthy();
    //expect(getByTestId('feed-map')).toBeTruthy();
    //expect(getByTestId('side-menu')).toBeTruthy();
  });
});