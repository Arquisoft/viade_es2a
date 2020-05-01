import React from 'react';
import { cleanup } from 'react-testing-library';
import GroupFields from './group-fields.component';

import 'jest-dom/extend-expect';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

const webId = 'https://tangofdez.solid.community/profile/card#me';

describe.only('GroupFields', () => {
    afterAll(cleanup);

    let wrapper;
    beforeEach(() => {
        wrapper = mount(
          <GroupFields {...{ webId: webId }} />
        );
      });

    it('renders without crashing', () => {
        wrapper = mount(
            <GroupFields {...{ webId: webId }} />
          );
        expect(wrapper).toBeTruthy();
    });
});