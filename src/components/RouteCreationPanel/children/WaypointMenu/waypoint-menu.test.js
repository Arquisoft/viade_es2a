import React from 'react';
import { render, cleanup } from 'react-testing-library';
import WaypointMenu from './waypoint-menu.component';

afterAll(cleanup);

const waypoints = [{
  lat: 24.3,
  lng: -2.2,
  name: 'Test',
  description: 'Teste'
}, {
  lat: 14.3,
  lng: -12.2,
  name: 'Test2',
  description: 'Teste2'
}];

describe.only('WaypointMenu', () => {
  const { container } = render(
    <WaypointMenu {...{ waypoints }} />
  );

  it('renders without crashing', () => {
    expect(container).toBeTruthy();
  });
});
