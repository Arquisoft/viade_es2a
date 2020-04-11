import React from 'react';
import { cleanup } from 'react-testing-library';
import RouteFields from './route-fields.component';
import { shallow, mount, render } from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { errorToaster } from '@utils';

Enzyme.configure({ adapter: new Adapter() });

afterAll(cleanup);

describe.only('RouteFields tests', () => {

  it('RouteFields requires onSave prop', () => {
    const onSave = jest.fn();
    const wrapper = mount(<RouteFields onSave={onSave} />);
    expect(wrapper.props().onSave).toBeDefined();
  });

  it('RouteFields requires onError prop', () => {
    const onError = jest.fn();
    const wrapper = mount(<RouteFields onError={onError} />);
    expect(wrapper.props().onError).toBeDefined();
  });

  it('RouteFields requires onImport prop', () => {
    const onImport = jest.fn();
    const wrapper = mount(<RouteFields onImport={onImport} />);
    expect(wrapper.props().onImport).toBeDefined();
  });

  it('renders on creation of a route', () => {
    const routeBase = false;
    const wrapper = shallow(<RouteFields routeBase={routeBase} />)

    expect(wrapper.find('.value-name')).toBeDefined();
    expect(wrapper.find('.value-description')).toBeDefined();

    expect(wrapper.find('.value-name')).toHaveLength(1);
    expect(wrapper.find('.value-description')).toHaveLength(1);
    // Values are empty if we are creating a route
    expect(wrapper.find('.value-name').get(0).props.value)
      .toBe('');
    expect(wrapper.find('.value-description').get(0).props.value)
      .toBe('');
  });
});
