import React from 'react';
import { cleanup } from 'react-testing-library';
import RouteCreationPanel from './route-creation-panel.component';
import { shallow, mount, render } from 'enzyme';
import  Enzyme from 'enzyme';
import  Adapter  from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

afterAll(cleanup);

describe.only('Route Creation Panel tests', () => {

  it('should render without crashing', () => {
    const wrapper = shallow(<RouteCreationPanel />);
    expect(wrapper).toBeTruthy();
  });

  it('empty route for creating one', ()=> {
    const wrapper = shallow(<RouteCreationPanel>
    </RouteCreationPanel>);

    expect(wrapper.props().routeBase).toBeUndefined();

  });

  it('route data for editing it', ()=> {

    const route = { name: 'Route',
        description: 'description',
        date:  '13-03-2020',
        author: 1,
        waypoints: [],
        points: []
      };
    
    const wrapper = shallow(<RouteCreationPanel routeBase={route}/>);

    expect(wrapper.find('.route-fields').props().routeBase.name).toEqual('Route');
    expect(wrapper.find('.route-fields').props().routeBase.description).toEqual('description');
    expect(wrapper.find('.route-fields').props().routeBase.date).toEqual('13-03-2020');
    expect(wrapper.find('.route-fields').props().routeBase.author).toEqual(1);
    expect(wrapper.find('.route-fields').props().routeBase.waypoints).toHaveLength(0);
    expect(wrapper.find('.route-fields').props().routeBase.points).toHaveLength(0);
  });

});
