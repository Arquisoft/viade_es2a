import React from 'react';
import Comments from './comments.component';

import { cleanup } from 'react-testing-library';
import { shallow } from 'enzyme';

import  Enzyme from 'enzyme';
import  Adapter  from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

afterAll(cleanup);

const comments = [
    { content: "Comentario 1", author: "Labra" },
    { content: "Comentario 2", author: "Jesus" },
    { content: "Comentario 3", author: "Marcos" }
];

const route = {
    id: "16c67714-f386-4832-93da-5fb7b8ffce44",
    name: "Ruta 2",
    author: "Jesus Perez",
    description: "Ruta peligrosa",
    date: Date.now(),
    comments: "commentsURI",
    commentList: comments,
    media: [
        { '@id': "https://www.ruta0.com/pix/una-ruta.jpg" },
        { '@id': "https://fotografias.lasexta.com/clipping/cmsimages02/2017/01/22/E40D121E-FDA0-4F6D-901C-A40A2B772762/58.jpg" }
    ],
    waypoints: [
        { lat: -34.397, lng: 150.644, alt: 50, name: "Castillo", description: "Imponente" },
        { lat: -35.297, lng: 149.644, alt: 100, name: "Restaurante", description: "El Lupa" },
        { lat: -34.297, lng: 148.644, name: "Universidad" },
        { lat: -34.197, lng: 146.644, description: "Fin de la ruta" }
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
    id: "16c67714-f386-4832-93da-5fb7b8ffce44",
    name: "Ruta 3",
    author: "Marcos Alvarez",
    description: "Ruta sin comentarios",
    date: Date.now(),
    comments: "commentsURI",
    commentList: no_comments,
    media: [
        { '@id': "https://www.ruta0.com/pix/una-ruta.jpg" }
    ],
    waypoints: [
        { lat: -34.397, lng: 150.644, alt: 50, name: "Castillo", description: "Imponente" }
    ],
    points: [
        { lat: -34.397, lng: 150.644 },
    ]
};

const webId = "webIdDePrueba";

describe.only('Comments', () => {
    const container = shallow( <Comments {...{ webId, route: route }} />);

    it("renders without crashing", () => {
        expect(container).toBeTruthy();
        expect(container).toHaveLength(1);
    });

    it("shows all comments", () => {
        expect(container.find(".comment")).toHaveLength(3);

        expect(container.find("#comment-0")).toHaveLength(1);
        expect(container.find("#comment-0").text().includes("Comentario 1 - Labra")).toBe(true);
        
        expect(container.find("#comment-1")).toHaveLength(1);
        expect(container.find("#comment-1").text().includes("Comentario 2 - Jesus")).toBe(true);
        
        expect(container.find("#comment-2")).toHaveLength(1);
        expect(container.find("#comment-2").text().includes("Comentario 3 - Marcos")).toBe(true);

        expect(container.find("#comment-3")).toHaveLength(0);
    });

    it("shows a message if there are no comments", () => {
        const noCommentsContainer = shallow( <Comments {...{ webId, route: no_comments_route }} />);

        expect(noCommentsContainer.find(".comment")).toHaveLength(0);

        expect(noCommentsContainer.find(".no-comments")).toHaveLength(1);
    });

});