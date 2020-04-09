import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { cleanup } from 'react-testing-library';
import Enzyme,{render,mount,shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Waypoint from './waypoint.component';

Enzyme.configure({adapter: new Adapter()});




afterAll(cleanup);

const waypoint = {
    lat: 24.3,
    lng: -2.2,
    name: 'Test',
    description: 'Test description'
};

describe.only('Waypoint', () => {
    let wrapper;
    beforeEach(()=>{
        wrapper = mount( <Waypoint {...{ waypoint }} />);

    })
    

    it('renders without crashing', () => {
        
        console.log(wrapper.debug());
        expect(wrapper).toBeTruthy();
    });
   

    it('render waypoint correct name', () => {
    
    expect(wrapper.find('.waypoint_name').text()).toContain("Test");
    });
    
    it('render waypoint correct description', () => {
    
        expect(wrapper.find('.waypoint_description').text()).toBe("Test description");
        });
    
});



