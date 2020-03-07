import React from 'react';
import { render, cleanup } from 'react-testing-library';
import FeedMap from './feed-map.component';

import 'jest-dom/extend-expect';

describe('FeedMap', () => {
  afterAll(cleanup);

  const { container } = render(<FeedMap />);
});
