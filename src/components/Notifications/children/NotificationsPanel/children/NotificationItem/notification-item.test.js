import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { cleanup } from 'react-testing-library';
import Enzyme, { render, mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import NotificationItem from './notification-item.component.js';

Enzyme.configure({ adapter: new Adapter() });


const notification = {};
afterAll(cleanup);


describe.only('NotificationItem', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<NotificationItem {...{notification}} />);
    });

    it('renders without crashing', () => {
        
        expect(wrapper.find('.Img')).toBeDefined();
        expect(wrapper.find('.Body')).toBeDefined();
        expect(wrapper.find('.Message')).toBeDefined();
        expect(wrapper.find('.Meta')).toBeDefined();
        expect(wrapper.find('.moment')).toBeDefined();
        expect(wrapper.find('.MarkAsRead')).toBeDefined();

    });


});
