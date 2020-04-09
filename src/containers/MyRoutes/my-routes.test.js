import React from 'react';
import { render, cleanup } from 'react-testing-library';
import { BrowserRouter as Router } from 'react-router-dom';

import { MyRoutesContainer } from './my-routes.container';

const webId = 'https://marcosav.inrupt.net/profile/card#';

const routes = [
  {
    id: "uuiwebad",
    name: "Test",
    author: "test",
    points: [
      { lat: -34.397, lng: 150.644 },
      { lat: -35.297, lng: 149.644 }
    ],
    waypoints: [
      { lat: -44.397, lng: 130.644, name: "test1" },
      { lat: -45.297, lng: 169.644, name: "test1" }
    ]
  }
];

describe.only('MyRoutes', () => {
  afterAll(cleanup);
  const { container } = render(
    <Router>
      <MyRoutesContainer {... { ...webId, routes }} />
    </Router>
  );

  test('renders without crashing', () => {
    expect(container).toBeTruthy();
  });
});