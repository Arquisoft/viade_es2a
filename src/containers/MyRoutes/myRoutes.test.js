import React from 'react';
import { render, cleanup } from 'react-testing-library';
import { BrowserRouter as Router } from 'react-router-dom';
import { MyRoutesContainer } from './myRoutes.container';


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

describe.only('MyRoutes', () => {
  afterAll(cleanup);
  const { container } = render(
    <Router>
      <MyRoutesContainer {... { ...routes }} />
    </Router>
  );

  test('renders without crashing', () => {
    expect(container).toBeTruthy();
  });


});