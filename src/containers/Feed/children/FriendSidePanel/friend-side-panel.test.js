import React from 'react';
import { render, cleanup } from 'react-testing-library';
import FriendSidePanel from './friend-side-panel.component';
import { RouteColor as colors } from '@constants';
import { RouteMapContext } from '@components/RouteMap/route-map.component';

import 'jest-dom/extend-expect';
import { FeedContext } from '../../feed.component';

const friends = [
  'https://marcosav.inrupt.net/profile/card#me',
  'https://marcosav2.inrupt.net/profile/card#me'
];

describe('FriendSidePanel', () => {
  afterAll(cleanup);

  const { container } = render(
    <RouteMapContext.Provider>
      <FeedContext.Provider value={{ isDeletedFriend: f => false, isSelectedFriend: f => false }}>
        <FriendSidePanel {...{ friends }} />
      </FeedContext.Provider>
    </RouteMapContext.Provider>
  );

  test('renders without crashing', () => {
    expect(container).toBeTruthy();
  });
});
