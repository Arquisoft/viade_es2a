import React from 'react';
import { render, cleanup } from 'react-testing-library';
import RouteView from './route-view.component';

import { RouteMapContext } from '../RouteMap/route-map.component';

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

afterAll(cleanup);

describe.only('RouteView', () => {
    const { container } = render(
        <RouteMapContext.Provider value={{ selectedRoute: null, setSelectedRoute: null }}>
            <RouteView {...{ route }} />
        </RouteMapContext.Provider>
    );

    it('renders without crashing', () => {
        expect(container).toBeTruthy();
    });
});
