import React from 'react';
import { render, cleanup } from 'react-testing-library';
import LocationMenu from './location-menu.component';
import { RouteViewContext } from '../../route-view.component';

import 'jest-dom/extend-expect';

const initialState = { selectedPoint: null }

const route = {
  id: "16c67714-f386-4832-93da-5fb7b8ffce13",
  name: "Ruta 1",
  author: "Alejandro Leon",
  description: "Ruta preciosa",
  date: Date.now(),
  images: [
    { img: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.jWD6GovOo64zq_idWxiKvgHaFj%26pid%3DApi&f=1" },
    { img: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.pURRtKHJaz29-NvLonL0FgHaE8%26pid%3DApi&f=1" }
  ],
  points: [
    { lat: -34.397, lng: 150.644, alt: 50, name: "Fuente", description: "Muy guapa", img: "https://www.ruta0.com/pix/una-ruta.jpg" },
    { lat: -35.297, lng: 149.644, alt: 100, name: "Chigre", description: "El Roxu" },
    { lat: -34.297, lng: 148.644, name: "Universidad", description: "Maravillosa" },
    { lat: -33.397, lng: 147.644, name: "Restaurante" },
    { lat: -34.197, lng: 146.644, description: "Fin de la ruta" }
  ],
  comments: [
    { com: "Comentario 1", author: "Labra", idAuthor: "1" },
    { com: "Comentario 2", author: "Jesus", idAuthor: "2" },
    { com: "Comentario 3", author: "Marcos", idAuthor: "3" }
  ]
};

describe('SideRoutesMenu', () => {
  afterAll(cleanup);

  const { container } = render(
    <RouteViewContext.Provider value={{ state: initialState, setState: null }}>
      <LocationMenu {...{ route }} />
    </RouteViewContext.Provider>
  );

  test('renders without crashing', () => {
    expect(container).toBeTruthy();
  });
});
