import React from 'react';
import { cleanup } from 'react-testing-library';
import GroupHolder from './group-holder.component';
import { RouteMapContext } from '@containers/MyRoutes/my-routes.component';

import { FeedContext } from '../../../../feed.component';

import 'jest-dom/extend-expect';

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

describe('GroupHolder', () => {
    afterAll(cleanup);

    let wrapper;
    beforeEach(() => {
        wrapper = mount(
        <RouteMapContext.Provider>
            <FeedContext.Provider value={{ onGroupView: () => undefined, isSelectedGroup: g => false }}>
                <GroupHolder {...{ group: group }} />
            </FeedContext.Provider>
        </RouteMapContext.Provider>)}
    );

    it('renders without crashing', () => {
        expect(wrapper).toBeTruthy();
    });

    it('renders on creation', () => {
        expect(wrapper.find('.GroupHolderWrapper')).toBeDefined();
        expect(wrapper.find('.GroupHolderHeader')).toBeDefined();
        expect(wrapper.find('.ButtonContainer')).toBeDefined();
        expect(wrapper.find('#friend-title')).toBeDefined();
    });

    it('renders the right content', () => {
        expect(wrapper.find('#friend-title').props().content).toStrictEqual(group.name);
    });

    it('renders on selection', () => {
        wrapper = mount(
            <RouteMapContext.Provider>
                <FeedContext.Provider value={{ onGroupView: () => undefined, isSelectedGroup: g => true }}>
                    <GroupHolder {...{ group: group }} />
                </FeedContext.Provider>
            </RouteMapContext.Provider>);

        expect(wrapper.find({id : 'details-Grupo A'})).toBeDefined();
        expect(wrapper.find({id : 'edit-Grupo A'})).toBeDefined();
        expect(wrapper.find({id : 'details-Grupo A'}).first().props().active).toStrictEqual(true);
        expect(wrapper.find({id : 'edit-Grupo A'}).first().props().active).toStrictEqual(true);
    });
});