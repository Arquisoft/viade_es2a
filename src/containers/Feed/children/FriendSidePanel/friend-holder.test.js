import React from 'react';
import { render, cleanup } from 'react-testing-library';
import FriendHolder from './friend-holder.component';
import { RouteMapContext } from '@components/RouteMap/route-map.component';

import { FeedContext } from '../../feed.component';

import 'jest-dom/extend-expect';

const webId = "https://marcosav.inrupt.net/profile/card#me";

describe('FriendHolder', () => {
    afterAll(cleanup);

    const { container } = render(
        <RouteMapContext.Provider>
            <FeedContext.Provider value={{ isDeletedFriend: f => false, isSelectedFriend: f => false }}>
                <FriendHolder {...{ webId }} />
            </FeedContext.Provider>
        </RouteMapContext.Provider>
    );

    test('renders without crashing', () => {
        expect(container).toBeTruthy();
    });
});