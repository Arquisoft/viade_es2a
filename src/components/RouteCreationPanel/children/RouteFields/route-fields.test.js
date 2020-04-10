import React from 'react';
import { render, cleanup } from 'react-testing-library';
import RouteFields from './route-fields.component';

afterAll(cleanup);

describe.only('RouteFields', () => {
  const { container } = render(
    <RouteFields />
  );

  it('renders without crashing', () => {
    expect(container).toBeTruthy();
  });
});
