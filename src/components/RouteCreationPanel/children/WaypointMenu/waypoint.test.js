import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { cleanup } from 'react-testing-library';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Waypoint from './waypoint.component';

Enzyme.configure({ adapter: new Adapter() });

afterAll(cleanup);

const waypoint = {
    lat: 24.3,
    lng: -2.2,
    name: 'Test',
    description: 'Test description'
};


describe.only('Waypoint', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = mount(<Waypoint {...{ waypoint }} />);
    });

    it('renders without crashing', () => {
        expect(wrapper).toBeTruthy();
    });

    it('renders on creation', () => {
        expect(wrapper.find('.waypoint_name_Test')).toBeDefined();
        expect(wrapper.find('.waypoint_description_Test')).toBeDefined();
        expect(wrapper.find('.button')).toBeDefined();

        expect(wrapper.find('.waypoint_name_Test')).toHaveLength(1);
        expect(wrapper.find('.waypoint_description_Test')).toHaveLength(1);
    });

    it('render waypoint correct name', () => {
        expect(wrapper.find('.waypoint_name_Test').prop('value')).toContain("Test");
    });

    it('render waypoint correct description', () => {
        expect(wrapper.find('.waypoint_description_Test').prop('value')).toBe("Test description");
    });

});



