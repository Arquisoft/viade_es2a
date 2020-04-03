import React from 'react';
import { render, cleanup } from 'react-testing-library';
import RouteElements from './route-elements.component';

afterAll(cleanup);

const route = {
    id: "16c67714-f386-4832-93da-5fb7b8ffce44",
    name: "Ruta 2",
    author: "Jesus Perez",
    description: "Ruta peligrosa",
    date: Date.now(),
    comments: "commentsURI",
    images: [
        { img: "https://www.ruta0.com/pix/una-ruta.jpg" },
        { img: "https://fotografias.lasexta.com/clipping/cmsimages02/2017/01/22/E40D121E-FDA0-4F6D-901C-A40A2B772762/58.jpg" }
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

const comments = [
    { content: "Comentario 1", author: "Labra" },
    { content: "Comentario 2", author: "Jesus" },
    { content: "Comentario 3", author: "Marcos" }
];

const files = [
    { link: "https://live.staticflickr.com/4026/4394622693_f7daebe11f_b.jpg" },
    { link: "https://alejandroleon98.github.io/multi/file3.zip" },
    { link: "https://live.staticflickr.com/65535/49693057273_67d37d186b_b.jpg"}
];

const webId = "webIdDePrueba"

describe.only('RouteElements', () => {
    const { container } = render(
        <RouteElements {...{ comments, files, webId, route }} />
    );

    it('renders without crashing', () => {
        expect(container).toBeTruthy();
    });
});
