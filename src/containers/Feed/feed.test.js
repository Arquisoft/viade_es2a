import React from 'react';
import { render, cleanup } from 'react-testing-library';
import { BrowserRouter as Router } from 'react-router-dom';
import { FeedContainer } from './feed.container';

const props = {
  webId: 'https://exmaple.com/#me',
  image: 'test.png',
  updatePhoto: 'updated.png',
  name: 'example'
};

describe.only('Feed', () => {
  afterAll(cleanup);
  const { container, getByTestId } = render(
    <Router>
      <FeedContainer {...{ ...props }} />
    </Router>
  );
});