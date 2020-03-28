import React from 'react';
import { render, cleanup } from 'react-testing-library';
import Waypoint from './waypoint.component';

afterAll(cleanup);

const waypoint = {
    lat: 24.3,
    lng: -2.2,
    name: 'Test',
    description: 'Teste'
};

describe.only('Waypoint', () => {
    const { container } = render(
        <Waypoint {...{ waypoint }} />
    );

    it('renders without crashing', () => {
        expect(container).toBeTruthy();
    });
});
