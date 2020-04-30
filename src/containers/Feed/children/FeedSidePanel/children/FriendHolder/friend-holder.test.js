import React from 'react';
import { cleanup } from 'react-testing-library';
import FriendHolder from './friend-holder.component';
import { RouteMapContext } from '@containers/MyRoutes/my-routes.component';

import { FeedContext } from '../../../../feed.component';

import 'jest-dom/extend-expect';

import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

const webId = "https://marcosav.inrupt.net/profile/card#me";

describe('FriendHolder', () => {
    afterAll(cleanup);

    let wrapper;
    beforeEach(() => {
        wrapper = mount(
            <RouteMapContext.Provider>
                <FeedContext.Provider value={{ isDeletedFriend: f => false, isSelectedFriend: f => false }}>
                    <FriendHolder {...{ friend: webId }} />
                </FeedContext.Provider>
            </RouteMapContext.Provider>);
    });

    it('renders without crashing', () => {
        expect(wrapper).toBeTruthy();
    });

    it('renders on creation', () => {
        expect(wrapper.find('.FriendHolderWrapper')).toBeDefined();
        expect(wrapper.find('.FriendHolderHeader')).toBeDefined();
        expect(wrapper.find('.FriendButtonContainer')).toBeDefined();
        expect(wrapper.find('.RouteContainer')).toBeDefined();
        expect(wrapper.find('.no-routes')).toBeDefined();
        expect(wrapper.find('.loading')).toBeDefined();
    });

    it('renders the right content', () => {
        expect(wrapper.find('.friend-title')).toBeDefined();
        expect(wrapper.find('.friend-title').props().content).toStrictEqual(webId);
    });

    it('renders on selection', () => {
        wrapper = mount(
            <RouteMapContext.Provider>
                <FeedContext.Provider value={{ isDeletedFriend: f => false, isSelectedFriend: f => true }}>
                    <FriendHolder {...{ friend: webId }} />
                </FeedContext.Provider>
            </RouteMapContext.Provider>);
        expect(wrapper.find('#deletebutton')).toBeDefined();
        expect(wrapper.find('#profilebutton')).toBeDefined();
        expect(wrapper.find('#deletebutton').first().props().name).toStrictEqual("delete-" + webId);
        expect(wrapper.find('#profilebutton').first().props().name).toStrictEqual("openProfile-" + webId);
    });
});