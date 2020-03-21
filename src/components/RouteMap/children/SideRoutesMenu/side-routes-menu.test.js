import React from 'react';
import { render, cleanup } from 'react-testing-library';
import SideRoutesMenu from './side-routes-menu.component';
import { RouteColor as colors } from '@constants';
import { RouteMapContext } from '../../route-map.component';

import 'jest-dom/extend-expect';

const initialState = { selectedRoute: null }

const routes = [
  {
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
    <RouteMapContext.Provider value={{ state: initialState, setState: null }}>
      <SideRoutesMenu {...{ routes }} />
    </RouteMapContext.Provider>
  );

  test('renders without crashing', () => {
    expect(container).toBeTruthy();
  });
});
