import React from 'react';
import { render, cleanup } from 'react-testing-library';
import ShareRoutePanel from './share-route-panel.component';

const route = {
  id: 'awdawd',
  name: "Test",
  author: "test",
  points: [
    { lat: -34.397, lng: 150.644 },
    { lat: -35.297, lng: 149.644 }
  ]
};

afterAll(cleanup);

describe.only('ShareRoutePanel', () => {
  const { container } = render(
    <ShareRoutePanel {...{ route }} />
  );

  it('renders without crashing', () => {
    expect(container).toBeTruthy();
  });
});
