import React from 'react';
import { render, cleanup } from 'react-testing-library';
import SideRoutesMenu from './side-routes-menu.component';

import 'jest-dom/extend-expect';

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

describe('SideFeed', () => {
  afterAll(cleanup);

  const { container } = render(<SideFeed {...{ routes }} />);

  test('renders without crashing', () => {
    expect(container).toBeTruthy();
  });
});
