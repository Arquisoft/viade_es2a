import React from 'react';
import { render, cleanup } from 'react-testing-library';
import { BrowserRouter as Router } from 'react-router-dom';
import RouteCreationPanel from './route-creation-panel.component';

afterAll(cleanup);

describe.only('RouteCreationPanel', () => {
  const { container, rerender } = render(
    <Router>
      <RouteCreationPanel />
    </Router>
  );

  it('renders without crashing', () => {
    expect(container).toBeTruthy();
  });
});
