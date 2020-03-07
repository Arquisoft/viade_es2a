import React from 'react';
import { render, cleanup } from 'react-testing-library';
import { BrowserRouter as Router } from 'react-router-dom';
import { FeedContainer } from './feed.container';

describe.only('Feed', () => {
  afterAll(cleanup);
  /*const { container, getByTestId } = render(
    <Router>
      <FeedContainer />
    </Router>
  );*/
});