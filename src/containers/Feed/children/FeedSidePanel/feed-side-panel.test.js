import React from 'react';
import { render, cleanup } from 'react-testing-library';
import FeedSidePanel from './feed-side-panel.component';
import { RouteColor as colors } from '@constants';
import { RouteMapContext } from '@containers/MyRoutes/my-routes.component';

import 'jest-dom/extend-expect';
import { FeedContext } from '../../feed.component';

const friends = [
  'https://marcosav.inrupt.net/profile/card#me',
  'https://marcosav2.inrupt.net/profile/card#me'
];

describe('FeedSidePanel', () => {
  afterAll(cleanup);

  const { container } = render(
    <RouteMapContext.Provider>
      <FeedContext.Provider value={{ isDeletedFriend: f => false, isSelectedFriend: f => false }}>
        <FeedSidePanel {...{ friends }} />
      </FeedContext.Provider>
    </RouteMapContext.Provider>
  );

  test('renders without crashing', () => {
    expect(container).toBeTruthy();
  });
});
