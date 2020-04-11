import React from 'react';
import { render, cleanup } from 'react-testing-library';
import Map from './map.component';
import {
    withScriptjs, withGoogleMap
} from 'react-google-maps'

import { RouteColor as colors } from '@constants';

import { RouteMapContext } from '@containers/MyRoutes/my-routes.component';

import 'jest-dom/extend-expect';

const googleMapURL = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&v=3.exp&libraries=geometry,drawing,places`;

const routes = [
    {
        id: "uuiwebad",
        name: "Test",
        author: "test",
        color: colors[0],
        points: [
            { lat: -34.397, lng: 150.644 },
            { lat: -35.297, lng: 149.644 }
        ],
        waypoints: [
            { lat: -44.397, lng: 130.644, name: "test1" },
            { lat: -45.297, lng: 169.644, name: "test1" }
        ]
    }
];

describe('Map', () => {
    afterAll(cleanup);

    let mapRef = React.createRef();

    const { container } = render(
        <RouteMapContext.Provider value={{ selectedRoute: routes[0].id, onRouteSelect: route => undefined }}>
            <Map {... { routes }}
                mapRef={mapRef}
                data-testid="map"
                googleMapURL={googleMapURL}
                loadingElement={<div></div>}
                containerElement={<div></div>}
                mapElement={<div></div>}
            />
        </RouteMapContext.Provider>
    );

    test('renders without crashing', () => {
        expect(container).toBeTruthy();
        expect(mapRef).toBeTruthy();
    });
});