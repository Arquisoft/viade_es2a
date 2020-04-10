import React from 'react';
import {  cleanup } from 'react-testing-library';
import WaypointMenu from './waypoint-menu.component';
import Enzyme,{render,mount,shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({adapter: new Adapter()});

afterAll(cleanup);

const waypoints = [{
  lat: 24.3,
  lng: -2.2,
  name: 'Test1',
  description: 'Teste1'
}, {
  lat: 14.3,
  lng: -12.2,
  name: 'Test2',
  description: 'Teste2'
}];



describe.only('WaypointMenu', () => {
  let wrapper;
  let wrapperVacio;
  beforeEach(()=>{
      wrapper = mount( <WaypointMenu {...{ waypoints }} />);
      wrapperVacio = shallow( <WaypointMenu waypoints={[]} />);
  })

  it('renders without crashing', () => {
    expect(wrapper).toBeTruthy();
  });

  it('renders on creation', () => {
    
    expect(wrapper.find('.menuHeader')).toBeDefined();
    expect(wrapper.find('.waypointContainer')).toBeDefined();
    expect(wrapper.find('.button')).toBeDefined();

    expect(wrapper.find('.menuHeader')).toHaveLength(0);
    expect(wrapper.find('.waypointContainer')).toHaveLength(0);
});

  it('render no waypoints', () => {
    
    expect(wrapperVacio.find('Waypoint')).toHaveLength(0);
    });

  it('render all waypoints', () => {
    
    expect(wrapper.find('Waypoint')).toHaveLength(waypoints.length);
    });
    
  it('render all waypoints correctly', () => {
    console.log(wrapper.debug());
  expect(wrapper.find('Waypoint')).toHaveLength(waypoints.length);
  
 
});
});


