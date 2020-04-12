import React from 'react';
import RouteView from './route-view.component';
import { cleanup } from 'react-testing-library';
import { shallow, mount, render } from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

afterAll(cleanup);

const comments = [
    { "author": "Labra", "content": "Comentario 1" },
    { "author": "Jesus", "content": "Comentario 2" },
    { "author": "Marcos", "content": "Comentario 3" },
    { "author": "Marcos", "content": "Comentario 4" },
    { "author": "Marcos", "content": "Comentario 5 muyyyyyyyyyyyyyyyyyy lagroooooooooooooooooooooo sklfhsnkf sdklf shfk shnfksdh fdks fhsdjkfhsdkf shkfds hfkds fhsdkfdskjfh skf shfkds hfskjf hksjd f" },
    { "author": "Marcos", "content": "Comentario 6" },
    { "author": "Marcos", "content": "Comentario 6" },
    { "author": "Marcos", "content": "Comentario 6" },
    { "author": "Marcos", "content": "Comentario 6" }
];

const route = {
    id: "16c67714-f386-4832-93da-5fb7b8ffce44",
    name: "Ruta 2",
    author: "Nerea Valdés",
    description: "Route for test",
    date: '10-03-2009 15:09',
    comments,
    images: [
        { img: "https://www.ruta0.com/pix/una-ruta.jpg" },
        { img: "https://fotografias.lasexta.com/clipping/cmsimages02/2017/01/22/E40D121E-FDA0-4F6D-901C-A40A2B772762/58.jpg" }
    ],
    waypoints: [
        { lat: -34.397, lng: 150.644, alt: 50, name: "WayPoint 1", description: "Desc 1" },
        { lat: -35.297, lng: 149.644, alt: 100, name: "WayPoint 2", description: "Desc 2" },
        { lat: -34.297, lng: 148.644, name: "WayPoint 3" },
        { lat: -34.197, lng: 146.644, description: "End  route" }
    ],
    points: [
        { lat: -34.397, lng: 150.644 },
        { lat: -35.297, lng: 149.644 },
        { lat: -34.297, lng: 148.644 },
        { lat: -34.197, lng: 146.644 }
    ]
};

afterAll(cleanup);

describe.only('RouteView', () => {

    it('renders without crashing', () => {
        const wrapper = shallow(
            <RouteView {...{ route }} />
        );
        expect(wrapper).toBeTruthy();
    });

    it('rendes route data', () => {
        const wrapper = shallow(
            <RouteView {...{ route }} />
        );

        expect(wrapper.find(".route-elements").props().route.name).toBeDefined();
        expect(wrapper.find(".route-elements").props().route.id).toBeDefined();
        expect(wrapper.find(".route-elements").props().route.date).toBeDefined();
        expect(wrapper.find(".route-elements").props().route.author).toBeDefined();
        expect(wrapper.find(".route-elements").props().route.description).toBeDefined();

        expect(wrapper.find(".route-elements").props().comments).toHaveLength(9);
        expect(wrapper.find(".route-elements").props().route.waypoints).toHaveLength(4);
        expect(wrapper.find(".route-elements").props().route.points).toHaveLength(4);
        expect(wrapper.find(".route-elements").props().route.images).toHaveLength(2);
    });

    it('shows route data', () => {
        const wrapper = shallow(
            <RouteView {...{ route }} />
        );

        expect(wrapper.find(".route-elements").props().route.name).toStrictEqual("Ruta 2");
        expect(wrapper.find(".route-elements").props().route.id).toStrictEqual("16c67714-f386-4832-93da-5fb7b8ffce44");
        expect(wrapper.find(".route-elements").props().route.date).toStrictEqual("10-03-2009 15:09");
        expect(wrapper.find(".route-elements").props().route.author).toStrictEqual("Nerea Valdés");
        expect(wrapper.find(".route-elements").props().route.description).toStrictEqual("Route for test");
        expect(wrapper.find('.route-elements').props().route.waypoints[0].name).toStrictEqual("WayPoint 1");
        expect(wrapper.find('.route-elements').props().route.waypoints[0].description).toStrictEqual("Desc 1");

        expect(wrapper.find(".route-elements").props().comments).toStrictEqual(comments);
        expect(wrapper.find(".route-elements").props().route.waypoints[0].lat).toStrictEqual(-34.397);
        expect(wrapper.find(".route-elements").props().route.waypoints[0].lng).toStrictEqual(150.644);
        expect(wrapper.find(".route-elements").props().route.waypoints[0].alt).toStrictEqual(50);

        expect(wrapper.find(".route-elements").props().route.points[0].lat).toStrictEqual(-34.397);
        expect(wrapper.find(".route-elements").props().route.points[0].lng).toStrictEqual(150.644);

        expect(wrapper.find(".route-elements").props().route.images).toHaveLength(2);

    });
});
