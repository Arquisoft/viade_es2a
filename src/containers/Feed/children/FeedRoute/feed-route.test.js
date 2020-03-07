import React from 'react';
import { render, cleanup } from 'react-testing-library';
import FeedRoute from './feed-route.component';

import 'jest-dom/extend-expect';

describe('FeedRoute', () => {
  afterAll(cleanup);

  const { container } = render(<FeedRoute />);
});
