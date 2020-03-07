import React from 'react';
import { render, cleanup } from 'react-testing-library';
import SideFeed from './side-feed.component';

import 'jest-dom/extend-expect';

describe('SideFeed', () => {
  afterAll(cleanup);

  const { container } = render(<SideFeed />);
});
