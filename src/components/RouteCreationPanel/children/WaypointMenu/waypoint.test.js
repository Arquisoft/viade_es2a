import React from 'react';
import {render, cleanup } from 'react-testing-library';
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

it('render no waypoint when waypoint is empty', () => {
    
    const wrapper = render(<Waypoint />);
    expect(wrapper.find("waypoint").length).toBe(0);
});


it('render waypoint', () => {

const wrapper = render(<Waypoint waypoint={waypoint} />);
expect(wrapper.find("waypoint_name").text).toBe("Test");
});

