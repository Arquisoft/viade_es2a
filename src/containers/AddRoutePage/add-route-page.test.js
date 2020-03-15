import React from 'react';
import { render, cleanup } from 'react-testing-library';
import { BrowserRouter as Router } from 'react-router-dom';
import AddRoutePage from './add-route.component';

afterAll(cleanup);

describe.only('Route', () => {
  const { container, rerender } = render(
    <Router>
      <Route />
    </Router>
  );

  it('renders without crashing', () => {
    expect(container).toBeTruthy();
  });

  it('renders with Navigation', () => {
    rerender(
      <Router>
        <Route navigation={[]} />
      </Router>
    );
    expect(document.querySelector('.nav__primary')).toBeTruthy();
  });

  it('renders with Toolbar', () => {
    rerender(
      <Router>
        <Route toolbar={[]} />
      </Router>
    );
    expect(document.querySelector('.nav__toolbar')).toBeTruthy();
  });
});
