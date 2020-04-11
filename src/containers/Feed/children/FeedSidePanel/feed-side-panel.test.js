import React from 'react';
import { render, cleanup } from 'react-testing-library';
import FeedSidePanel from './feed-side-panel.component';
import { RouteMapContext } from '@containers/MyRoutes/my-routes.component';

import 'jest-dom/extend-expect';
import { FeedContext } from '../../feed.component';

const friends = [
  'https://marcosav.inrupt.net/profile/card#me',
  'https://marcosav2.inrupt.net/profile/card#me'
];

const groups = [
  {
    id: 'testid',
    name: "Grupo A",
    members: ["https://marcosav2.inrupt.net/profile/card#me"],
    date: 1529644667834,
    owner: 'https://marcosav.inrupt.net/profile/card#me'
  }
];

describe('FeedSidePanel', () => {
  afterAll(cleanup);

  const { container } = render(
    <RouteMapContext.Provider>
      <FeedContext.Provider value={{ isDeletedFriend: f => false, isSelectedFriend: f => false }}>
        <FeedSidePanel {...{ friends, groups }} />
      </FeedContext.Provider>
    </RouteMapContext.Provider>
  );

  test('renders without crashing', () => {
    expect(container).toBeTruthy();
  });
});
