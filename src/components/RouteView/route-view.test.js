import React from 'react';
import { render, cleanup } from 'react-testing-library';
import RouteView from './route-view.component';

afterAll(cleanup);

describe.only('RouteView', () => {
    const { container } = render(
        <RouteView
            {...{}}
        />
    );

    it('renders without crashing', () => {
        expect(container).toBeTruthy();
    });
});
