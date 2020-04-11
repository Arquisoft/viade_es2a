import React from 'react';
import {  cleanup } from 'react-testing-library';
import RouteCard from './route-card.component';
import { RouteColor as colors } from '@constants';
import moment from 'moment';
import { RouteMapContext } from '@containers/MyRoutes/my-routes.component';
import 'jest-dom/extend-expect';
import Enzyme,{mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({adapter: new Adapter()});




const route = {
    id: 'webiduuid',
    name: "Test",
    author: "https://marcosav.inrupt.net/profile/card#me",
    color: colors[0],
    points: [
        { lat: -34.397, lng: 150.644 },
        { lat: -35.297, lng: 149.644 }
    ]
};

describe('RouteCard', () => {
    afterAll(cleanup);

    let wrapper;
    beforeEach(()=>{
        wrapper = mount(
            <RouteMapContext.Provider value={{ selectedRoute: route.id }}>
                <RouteCard {...{ route }} />
            </RouteMapContext.Provider>);

    })


    it('renders without crashing', () => {
        expect(wrapper).toBeTruthy();
    });

    it('renders on creation', () => {
    
        expect(wrapper.find('.title')).toBeDefined();
        expect(wrapper.find('.date')).toBeDefined();
        expect(wrapper.find('.rwrapper')).toBeDefined();
    
        expect(wrapper.find('.title')).toHaveLength(1);
        expect(wrapper.find('.date')).toHaveLength(1);
        expect(wrapper.find('.rwrapper')).toHaveLength(0);
    });
    it('route shown correctly', () => {
    
        expect(wrapper.find('.title')).toBeDefined();
        expect(wrapper.find('.date')).toBeDefined();
        expect(wrapper.find('.rwrapper')).toBeDefined();

        var m = moment(route.date).fromNow();

        expect(wrapper.find('.title').text()).toContain(route.name);
        expect(wrapper.find('.date').text()).toContain(m);
    
    });
   
});