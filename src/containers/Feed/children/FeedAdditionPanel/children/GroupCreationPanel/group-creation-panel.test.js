import React from 'react';
import { render, cleanup } from 'react-testing-library';
import { BrowserRouter as Router } from 'react-router-dom';
import GroupCreationPanel from './group-creation-panel.component';

afterAll(cleanup);

describe.only('GroupCreationPanel', () => {
  const { container, rerender } = render(
    <Router>
      <GroupCreationPanel />
    </Router>
  );

  it('renders without crashing', () => {
    expect(container).toBeTruthy();
  });
});