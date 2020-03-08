import React from 'react';
import { render, cleanup } from 'react-testing-library';
import { BrowserRouter as Router } from 'react-router-dom';
import { MyRoyesContainer } from './myRoutes.container';

describe.only('MyRoutes', () => {
  afterAll(cleanup);
  /*const { container, getByTestId } = render(
    <Router>
      <FeedContainer />
    </Router>
  );*/
});