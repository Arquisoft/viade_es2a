import React from 'react';
import { cleanup } from 'react-testing-library';
//import { BrowserRouter as Router } from 'react-router-dom';
import GroupView from './group-view.component';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

const group = {
    id: 'testid',
    name: "Grupo A",
    members: ["https://marcosav2.inrupt.net/profile/card#me"],
    date: 1529644667834,
    owner: 'https://marcosav.inrupt.net/profile/card#me'
};

describe.only('GroupView', () => {
    afterAll(cleanup);

    let wrapper;

    beforeEach(() => {
        wrapper = mount(
        <GroupView {...{ selectedGroup: group }} />
        );
    });

    /*const { container } = render(
        <Router>
            <GroupView {...{ selectedGroup: group }} />
        </Router>
    );*/

    it('renders without crashing', () => {
        expect(wrapper).toBeTruthy();
    });

    it('renders group data', () => {
        expect(wrapper.find("#group-name")).toBeDefined();
    });
});