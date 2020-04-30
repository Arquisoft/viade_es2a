import React from 'react';
import {  cleanup } from 'react-testing-library';
import ConfirmationDialog from './confirmation-dialog.component';
import Enzyme, { mount, shallow, render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

describe('ConfirmationDialog', () => {
    afterAll(cleanup);

    let wrapper;
    beforeEach(() => {
        wrapper = shallow(
          <div id="test">
          <ConfirmationDialog options={{ message: 'This is a test' }} parentSelector="#test" />
        </div>
        );
    });

    it('renders without crashing', () => {
        expect(wrapper).toBeTruthy();
    });

    it('renders on creation', () => {
        expect(wrapper.find('.modal-content')).toBeDefined();
        expect(wrapper.find('.content')).toBeDefined();
        expect(wrapper.find('.declineButton')).toBeDefined();
        expect(wrapper.find('.acceptButton')).toBeDefined();

        expect(wrapper.find('.modal-content')).toHaveLength(0);
        expect(wrapper.find('.content')).toHaveLength(0);
        expect(wrapper.find('.declineButton')).toHaveLength(0);
        expect(wrapper.find('.acceptButton')).toHaveLength(0);

        
    });

});