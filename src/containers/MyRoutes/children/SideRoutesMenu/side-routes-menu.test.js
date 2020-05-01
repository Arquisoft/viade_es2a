import React from 'react';
import { render, cleanup } from 'react-testing-library';

import SideRoutesMenu from './side-routes-menu.component';

import { RouteColor as colors } from '@constants';

import { RouteMapContext } from '@containers/MyRoutes/my-routes.component';
import moment from 'moment';
import 'jest-dom/extend-expect';
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

const routes = [
  {
    id: 'id1',
    name: "Test1",
    author: "test1",
    color: colors[0],
    points: [
      { lat: -34.397, lng: 150.644 },
      { lat: -35.297, lng: 149.644 }
    ]
  },
  {
    id: 'id2',
    name: "Test2",
    author: "test2",
    color: colors[1],
    points: [
      { lat: -34.397, lng: 150.644 },
      { lat: -35.297, lng: 149.644 }
    ]
  },
  {
    id: 'id3',
    name: "Test3",
    author: "test3",
    color: colors[2],
    points: [
      { lat: -34.397, lng: 150.644 },
      { lat: -35.297, lng: 149.644 }
    ]
  }
];

describe('SideRoutesMenu', () => {
  afterAll(cleanup);
  let wrapper;
  let wrapperVacio;
  beforeEach(() => {
      wrapper = mount(
      <RouteMapContext.Provider value={{ selectedRoute: routes[0].id }}>
        <SideRoutesMenu {...{ routes }} />
      </RouteMapContext.Provider>);
      wrapperVacio = shallow(<RouteMapContext.Provider value={{ selectedRoute: routes[0].id }}>
        <SideRoutesMenu {...{}} />
      </RouteMapContext.Provider>);
  });


  test('renders without crashing', () => {
    expect(wrapper).toBeTruthy();
  });

  it('renders on creation', () => {
    expect(wrapper.find('.menuHeader')).toBeDefined();
    expect(wrapper.find('.panel')).toBeDefined();
    expect(wrapper.find('.elementContainer')).toBeDefined();
    expect(wrapper.find('.button')).toBeDefined();
    expect(wrapper.find('RouteCard')).toBeDefined();
    expect(wrapper.find('.id1')).toBeDefined();
    expect(wrapper.find('.id2')).toBeDefined();
    expect(wrapper.find('.id3')).toBeDefined();
   

    expect(wrapper.find('RouteCard')).toHaveLength(routes.length);
    
  });

  it('render no routes', () => {
    expect(wrapperVacio.find('RouteCard')).toHaveLength(0);
  });

  it('render all waypoints correctly', () => {
    expect(wrapper.find('RouteCard')).toHaveLength(routes.length);
    expect(wrapper.find('.title_Test1').text()).toContain("Test1");
    expect(wrapper.find('.title_Test2').text()).toContain("Test2");
    expect(wrapper.find('.title_Test3').text()).toContain("Test3");

    var m = moment(routes[0].date).fromNow();
    expect(wrapper.find('.date_Test1').text()).toContain(m);
    expect(wrapper.find('.date_Test2').text()).toContain(m);
    expect(wrapper.find('.date_Test3').text()).toContain(m);

        
        

  });
});
