import React from 'react';
import { render, cleanup } from 'react-testing-library';
import { BrowserRouter as Router } from 'react-router-dom';
import { FeedContainer } from './feed.container';

const routes = [
  {
    id: "26c67714-f386-4832-93da-5fb7b8ffce44",
    name: "Ruta de prueba",
    author: "https://marcosav.inrupt.net/profile/card#",
    description: "Descripcion de la ruta de prueba",
    date: Date.now(),
    images: [
      { url: "https://s3.amazonaws.com/tinycards/image/98d84c9c624b3576d978c827d0780798" },
      { url: "https://upload.wikimedia.org/wikipedia/commons/f/f7/MetroDF_Linea_2.jpg" },
      { url: "https://lh3.googleusercontent.com/proxy/peagw-wfe1BX5X-PjcA2MZfANJ9dgItG9XYc2cmwW5pns7whXhz7bx9CI4MeUeWhrq5aOv364CzghFl3b7AuAHXK5zSQ49C5v1aQmlXymA" },
      { url: "https://s3.amazonaws.com/tinycards/image/70da13db7297a4508c66d4936c4beccc" },
      { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/MA_Route_5.svg/600px-MA_Route_5.svg.png" }
    ],
    points: [
      { lat: 42.868123, lng: -8.547259, name: "Punto de prueba 1", description: "Prueba descripcion 1" },
      { lat: 43.258073, lng: -2.921462, name: "Punto de prueba 2", description: "Prueba descripcion 2" },
      { lat: 39.452128, lng: -0.407872, description: "Prueba descripcion 3" },
      { lat: 36.520274, lng: -6.281328, name: "Punto de prueba 4" },
      { lat: 40.969841, lng: -5.667944 }
    ],
    comments: [
      { content: "K wapa ermao", author: "https://marcosav.inrupt.net/profile/card#", date: Date.now() }
    ]
  }
];

describe.only('Feed', () => {
  afterAll(cleanup);
  const { container, getByTestId } = render(
    <Router>
      <FeedContainer {... { ...routes }} />
    </Router>
  );

  test('renders without crashing', () => {
    expect(container).toBeTruthy();
  });

  test('renders with styled components', () => {
    //expect(getByTestId('route-map')).toBeTruthy();
    //expect(getByTestId('feed-map')).toBeTruthy();
    //expect(getByTestId('side-menu')).toBeTruthy();
  });
});