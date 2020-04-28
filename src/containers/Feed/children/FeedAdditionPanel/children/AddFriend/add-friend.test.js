import React from 'react';
import { cleanup } from 'react-testing-library';
import AddFriend from './add-friend.component';

import 'jest-dom/extend-expect';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

describe('AddFriend', () => {
  afterAll(cleanup);

  let wrapper;

  beforeEach(() => {
    wrapper = mount(
      <AddFriend />
    );
  });

  it('renders without crashing', () => {
    expect(wrapper).toBeTruthy();
  });
});
