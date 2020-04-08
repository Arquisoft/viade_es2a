import React from 'react';
import { render, cleanup } from 'react-testing-library';

import SideRoutesMenu from './side-routes-menu.component';

import { RouteColor as colors } from '@constants';

import { RouteMapContext } from '@containers/MyRoutes/my-routes.component';

import 'jest-dom/extend-expect';

const routes = [
  {
    id: 'awdawd',
    name: "Test",
    author: "test",
    color: colors[0],
    points: [
      { lat: -34.397, lng: 150.644 },
      { lat: -35.297, lng: 149.644 }
    ]
  }
];

describe('SideRoutesMenu', () => {
  afterAll(cleanup);

  const { container } = render(
    <RouteMapContext.Provider value={{ selectedRoute: routes[0].id }}>
      <SideRoutesMenu {...{ routes }} />
    </RouteMapContext.Provider>
  );

  test('renders without crashing', () => {
    expect(container).toBeTruthy();
  });
});
