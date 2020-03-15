import React from 'react';
import { render, cleanup } from 'react-testing-library';
import RouteView from './route-view.component';

import { RouteMapContext } from '../RouteMap/route-map.component';

const initialState = { selectedRoute: null }

const route = {
    id: "16c67714-f386-4832-93da-5fb7b8ffce44",
    name: "Ruta 2",
    author: "Jesus Perez",
    description: "Ruta peligrosa",
    date: Date.now(),
    images: [
        { img: "https://www.ruta0.com/pix/una-ruta.jpg" },
        { img: "https://fotografias.lasexta.com/clipping/cmsimages02/2017/01/22/E40D121E-FDA0-4F6D-901C-A40A2B772762/58.jpg" }
    ],
    points: [
        { lat: -34.397, lng: 150.644, alt: 50, name: "Castillo", description: "Imponente", img: "https://ep01.epimg.net/elpais/imagenes/2018/12/03/gente/1543839794_912812_1543840598_noticia_normal.jpg" },
        { lat: -35.297, lng: 149.644, alt: 100, name: "Restaurante", description: "El Lupa" },
        { lat: -34.297, lng: 148.644, name: "Universidad" },
        { lat: -34.197, lng: 146.644, description: "Fin de la ruta" }
    ],
    comments: [
        { content: "Comentario 1", author: "Labra", idAuthor: "1" },
        { content: "Comentario 2", author: "Jesus", idAuthor: "2" },
        { content: "Comentario 3", author: "Marcos", idAuthor: "3" }
    ]
}

afterAll(cleanup);

describe.only('RouteView', () => {
    const { container } = render(
        <RouteMapContext.Provider value={{ state: initialState, setState: null }}>
            <RouteView {...{ route }} />
        </RouteMapContext.Provider>
    );

    it('renders without crashing', () => {
        expect(container).toBeTruthy();
    });
});
