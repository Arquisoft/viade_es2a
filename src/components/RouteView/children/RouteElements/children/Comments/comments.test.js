import React from 'react';
import Comments from './comments.component';
import Comment from './children/Comment/comment.component';

import { cleanup } from 'react-testing-library';
import { shallow, mount } from 'enzyme';

import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

afterAll(cleanup);

const testComments = [
    {
        text: "Comentario de prueba 1", date: Date.now(),
        author: "Autor 1", waypoint: 0
    },
    {
        text: "Comentario de prueba 2", date: Date.now(),
        author: "Autor 2", waypoint: 1
    }
];

const commentsRoute = {
    id: "16c67714-f386-4832-93da-45454354353",
    name: "Ruta 1",
    author: "https://marcosav.inrupt.net/profile/card#me",
    description: "Ruta peligrosa",
    date: Date.now(),
    comments: "commentsURI",
    commentList: testComments,
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

const no_comments = [];

const no_comments_route = {
    id: "16c67714-f386-4832-93da-45454354353",
    name: "Ruta 1",
    author: "https://marcosav.inrupt.net/profile/card#me",
    description: "Ruta peligrosa",
    date: Date.now(),
    comments: "commentsURI",
    commentList: no_comments,
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

const webId = "webIdDePrueba";

describe.only('Comments', () => {

    let container = mount(
        <Comments isLoading={false}
            {...{
                webId: webId,
                route: commentsRoute,
                comments: testComments
            }}>
        </Comments>
    );

    it("renders without crashing", () => {
        expect(container).toBeTruthy();
    });

    it("shows comments message", () => {
        expect(container.find(".comment")).toHaveLength(2);

        expect(container.find("#comment-0")).toHaveLength(1);
        expect(container.find("#comment-0").text().includes("Comentario de prueba 1")).toBe(true);

        expect(container.find("#comment-1")).toHaveLength(1);
        expect(container.find("#comment-1").text().includes("Comentario de prueba 2")).toBe(true);
    });

    let containerNoComments = mount(
        <Comments isLoading={false}
            {...{
                webId: webId,
                route: no_comments_route,
                comments: no_comments
            }}>
        </Comments>
    );
    it("shows no comments message", () => {
        expect(containerNoComments).toBeTruthy();
        expect(containerNoComments).toHaveLength(1);

        expect(containerNoComments.find(".no-comments")).toHaveLength(1);
    });
});