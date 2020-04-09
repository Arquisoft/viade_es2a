import React from 'react';
import { cleanup } from 'react-testing-library';
import RouteFields from './route-fields.component';
import { shallow, mount, render } from 'enzyme';
import  Enzyme from 'enzyme';
import  Adapter  from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

afterAll(cleanup);

describe.only('RouteFields tests', () => {

  it('Add requires onSave prop', () => {
    const onSave = jest.fn();
    const add = mount(<RouteFields onSave={onSave} />);
    expect(add.props().onSave).toBeDefined();
});

  it('renders on creation', () => {
    const routeBase = false;
    const wrapper = shallow(<RouteFields routeBase={routeBase} />)
    
    expect(wrapper.find('.value-name')).toBeDefined();
    expect(wrapper.find('.value-description')).toBeDefined();

    expect(wrapper.find('.value-name')).toHaveLength(1);
    expect(wrapper.find('.value-description')).toHaveLength(1);
  });
});
