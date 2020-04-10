import React from 'react';
import {  cleanup } from 'react-testing-library';
import HamburgerButton from './hamburger.component';
import Enzyme,{render,mount,shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({adapter: new Adapter()});

afterAll(cleanup);

describe.only('Waypoint', () => {
    let wrapper;
    beforeEach(()=>{
        wrapper = shallow( <HamburgerButton  />);

    })

    it('renders without crashing', () => {
        
        console.log(wrapper.debug());
        expect(wrapper).toBeTruthy();
    });

    it('renders on creation', () => {
    
        expect(wrapper.find('.mobile-navigation__toggle')).toBeDefined();
        expect(wrapper.find('.button')).toBeDefined();
        expect(wrapper.find('.icon')).toBeDefined();
    
        expect(wrapper.find('.mobile-navigation__toggle')).toHaveLength(1);
        expect(wrapper.find('.icon')).toHaveLength(1); 
    });



});