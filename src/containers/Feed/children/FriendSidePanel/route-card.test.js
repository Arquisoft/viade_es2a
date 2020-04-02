import React from 'react';
import { render, cleanup } from 'react-testing-library';
import RouteCard from './route-card.component';
import { RouteColor as colors } from '@constants';
import { RouteMapContext } from '@components/RouteMap/route-map.component';

import 'jest-dom/extend-expect';

const route = {
    id: 'webiduuid',
    name: "Test",
    author: "https://marcosav.inrupt.net/profile/card#me",
    color: colors[0],
    points: [
        { lat: -34.397, lng: 150.644 },
        { lat: -35.297, lng: 149.644 }
    ]
};

describe('RouteCard', () => {
    afterAll(cleanup);

    const { container } = render(
        <RouteMapContext.Provider value={{ selectedRoute: route.id }}>
            <RouteCard {...{ route }} />
        </RouteMapContext.Provider>
    );

    test('renders without crashing', () => {
        expect(container).toBeTruthy();
    });
});