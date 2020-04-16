import React from 'react';
import { render, cleanup } from 'react-testing-library';
import LocationMenu from './location-menu.component';
import { RouteViewContext } from '../../route-view.component';

import { RouteColor as colors } from '@constants';

import 'jest-dom/extend-expect';

const initialState = { selectedPoint: null }

const route = {
  id: "16c67714-f386-4832-93da-5fb7b8ffce13",
  name: "Ruta 1",
  author: "Alejandro Leon",
  description: "Ruta preciosa",
  color: colors[0],
  date: Date.now(),
  comments: "commentsURI",
  commentList: [{ content: "COMENTARIO cometario", author: "autor" }],
  media: [
    { '@id': "https://www.ruta0.com/pix/una-ruta.jpg" },
    { '@id': "https://fotografias.lasexta.com/clipping/cmsimages02/2017/01/22/E40D121E-FDA0-4F6D-901C-A40A2B772762/58.jpg" }
  ],
  waypoints: [
    { lat: -34.397, lng: 150.644, color: colors[0], name: "Castillo", description: "Imponente" },
    { lat: -35.297, lng: 149.644, color: colors[1], name: "Restaurante", description: "El Lupa" },
    { lat: -34.297, lng: 148.644, color: colors[2], name: "Universidad" },
    { lat: -34.197, lng: 146.644, color: colors[3], description: "Fin de la ruta" }
  ],
  points: [
    { lat: -34.397, lng: 150.644 },
    { lat: -35.297, lng: 149.644 },
    { lat: -34.297, lng: 148.644 },
    { lat: -34.197, lng: 146.644 }
  ]
};

describe('SideRoutesMenu', () => {
  afterAll(cleanup);

  route.points.forEach((point, index) => {
    point.color = colors[index % colors.length]
  });

  const { container } = render(
    <RouteViewContext.Provider value={{ state: initialState, setState: null }}>
      <LocationMenu {...{ trackpoints: route.points, waypoints: route.waypoints }} />
    </RouteViewContext.Provider>
  );

  test('renders without crashing', () => {
    expect(container).toBeTruthy();
  });
});
