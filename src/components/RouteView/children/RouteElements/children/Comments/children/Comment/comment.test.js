import React from 'react';
import Comment from './comment.component';

import { cleanup } from 'react-testing-library';
import { shallow } from 'enzyme';

import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

afterAll(cleanup);

const comments = [
    { "text": "Comentario de prueba 1", "date": Date.now(), "author": "Autor 1", "waypoint": 0 },
    { "text": "Comentario de prueba 2", "date": Date.now(), "author": "Autor 2", "waypoint": 1 }
];

const route1 = {
    id: "16c67714-f386-4832-93da-45454354353",
    name: "Ruta 1",
    author: "https://marcosav.inrupt.net/profile/card#me",
    description: "Ruta peligrosa",
    date: Date.now(),
    comments: "commentsURI",
    commentList: comments,
    media: [
        { '@id': "https://www.ruta0.com/pix/una-ruta.jpg" },
        { '@id': "https://fotografias.lasexta.com/clipping/cmsimages02/2017/01/22/E40D121E-FDA0-4F6D-901C-A40A2B772762/58.jpg" }
    ],
    waypoints: [
        {
            lat: -34.397, lng: 150.644, alt: 50,
            name: "Waypoint1", description: "Prueba waypoint1",
            color: { markerId: 0, hexCode: '#35d415' }
        },
        {
            lat: -38.397, lng: 150.644, alt: 60,
            name: "Waypoint2", description: "Prueba waypoint2",
            color: { markerId: 1, hexCode: '#d9436a' }
        }
    ],
    points: [
        { lat: -34.397, lng: 150.644 },
        { lat: -35.297, lng: 149.644 },
        { lat: -34.297, lng: 148.644 },
        { lat: -34.197, lng: 146.644 }
    ]
};

describe.only('Comment', () => {
    const container1 = shallow(<Comment {...{ route: route1, comment: comments[0] }} />);
    const container2 = shallow(<Comment {...{ route: route1, comment: comments[1] }} />);

    it("renders without crashing", () => {
        expect(container1).toBeTruthy();
        expect(container1).toHaveLength(1);

        expect(container2).toBeTruthy();
        expect(container2).toHaveLength(1);
    });

    it("shows the comment information", () => {
        // Comment 1
        expect(container1.find(".user-title")).toHaveLength(1);
        expect(container1.find(".user-title").text().includes("Autor 1")).toBe(true);

        expect(container1.find(".waypoint-name")).toHaveLength(1);
        expect(container1.find(".waypoint-name").text().includes("Waypoint1")).toBe(true);

        expect(container1.find(".content")).toHaveLength(1);
        expect(container1.find(".content").text().includes("Comentario de prueba 1")).toBe(true);

        // Comment 2
        expect(container2.find(".user-title")).toHaveLength(1);
        expect(container2.find(".user-title").text().includes("Autor 2")).toBe(true);

        expect(container2.find(".waypoint-name")).toHaveLength(1);
        expect(container2.find(".waypoint-name").text().includes("Waypoint2")).toBe(true);

        expect(container2.find(".content")).toHaveLength(1);
        expect(container2.find(".content").text().includes("Comentario de prueba 2")).toBe(true);
    });
});