import React from 'react';
import { cleanup } from 'react-testing-library';
import GroupFields from './group-fields.component';

import 'jest-dom/extend-expect';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

const webId = 'https://tangofdez.solid.community/profile/card#me';

/*const friends = [
    'https://amigomio.solid.community/profile/card#me',
    'https://lamasumas.inrupt.net/profile/card#me'
  ];*/

describe.only('GroupFields', () => {
    afterAll(cleanup);

    let wrapper;
    beforeEach(() => {
        wrapper = mount(
          <GroupFields {...{ webId }} />
        );
      });

    it('renders without crashing', () => {
        expect(wrapper).toBeTruthy();
    });

    /*it('renders friends data', () => {
        console.log(wrapper.debug());
        expect(wrapper.find("#friend0").props().content).toBeDefined();
        expect(wrapper.find("#friend1").props().content).toBeDefined();
    });

    it('renders right data', () => {
        expect(wrapper.find("#friend0").props().content).toStrictEqual(friends[0]);
        expect(wrapper.find("#friend1").props().content).toStrictEqual(friends[1]);
    });*/
});