import React from 'react';
import { render, cleanup } from 'react-testing-library';
import { BrowserRouter as Router } from 'react-router-dom';
import AddRoutePage from './add-route-page.component';

afterAll(cleanup);

describe.only('Route', () => {
  const { container, rerender } = render(
    <Router>
      <AddRoutePage />
    </Router>
  );

  it('renders without crashing', () => {
    expect(container).toBeTruthy();
  });
});
