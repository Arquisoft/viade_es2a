import React from 'react';
import { render, cleanup } from 'react-testing-library';
import RouteView from './route-view.component';
import colors from '../RouteMap/route-color';

const route = {
    id: "16c67714-f386-4832-93da-5fb7b8ffce13",
    name: "Ruta 1",
    author: "patata",
    color: colors[0],
    date: Date.now(),
    points: [
        { lat: -34.397, lng: 150.644 },
        { lat: -35.297, lng: 149.644 },
        { lat: -34.297, lng: 148.644 },
        { lat: -33.397, lng: 147.644 },
        { lat: -34.197, lng: 146.644 }
    ]
}

afterAll(cleanup);

describe.only('RouteView', () => {
    const { container } = render(
        <RouteView {...{ route }} />
    );

    it('renders without crashing', () => {
        expect(container).toBeTruthy();
    });
});
