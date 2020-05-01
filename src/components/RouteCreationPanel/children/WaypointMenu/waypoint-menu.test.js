import React from 'react';
import { cleanup } from 'react-testing-library';
import WaypointMenu from './waypoint-menu.component';
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

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

  beforeEach(() => {
    wrapper = mount(<WaypointMenu {...{ waypoints }} />);
    wrapperVacio = shallow(<WaypointMenu waypoints={[]} />);
  });

  it('renders without crashing', () => {
    expect(wrapper).toBeTruthy();
  });

  it('renders on creation', () => {
    expect(wrapper.find('.menuHeader')).toBeDefined();
    expect(wrapper.find('.waypointContainer')).toBeDefined();
    expect(wrapper.find('.button')).toBeDefined();
    expect(wrapper.find('.waypoint_name_Test1')).toBeDefined();
    expect(wrapper.find('.waypoint_description_Test1')).toBeDefined();
    expect(wrapper.find('.waypoint_name_Test2')).toBeDefined();
    expect(wrapper.find('.waypoint_description_Test2')).toBeDefined();

    expect(wrapper.find('.menuHeader')).toHaveLength(3);
    expect(wrapper.find('.waypointContainer')).toHaveLength(3);
  });

  it('render no waypoints', () => {
    expect(wrapperVacio.find('Waypoint')).toHaveLength(0);
  });

  it('render all waypoints', () => {
    expect(wrapper.find('Waypoint')).toHaveLength(waypoints.length);
  });

  it('render all waypoints correctly', () => {
    expect(wrapper.find('Waypoint')).toHaveLength(waypoints.length);
    expect(wrapper.find('.waypoint_name_Test1').prop('value')).toContain("Test1");
    expect(wrapper.find('.waypoint_description_Test1').prop('value')).toBe("Teste1");
    expect(wrapper.find('.waypoint_name_Test2').prop('value')).toContain("Test2");
    expect(wrapper.find('.waypoint_description_Test2').prop('value')).toBe("Teste2");

  });
});


