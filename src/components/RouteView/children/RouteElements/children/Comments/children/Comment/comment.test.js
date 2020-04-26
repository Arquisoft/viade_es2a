import React from 'react';
import Comment from './comment.component';

import { cleanup } from 'react-testing-library';
import { shallow } from 'enzyme';

import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

afterAll(cleanup);

const route = {
    id: "16c67714-f386-4832-93da-5fb7b8ffce44",
    name: "Ruta 2",
    author: "Jesus Perez",
    description: "Ruta peligrosa",
    date: Date.now(),
    comments: "commentsURI",
    commentList: [
        { text: "Comentario 1", date: Date.now(), author: "https://marcosav.inrupt.net/profile/card#me", waypoint: 1 },
        { text: "Comentario 2", date: Date.now(), author: "https://marcosav.inrupt.net/profile/card#me" }
    ],
    media: [],
    waypoints: [
        { lat: -34.397, lng: 150.644, alt: 50, name: "Castillo", description: "Imponente" },
        { lat: -35.297, lng: 149.644, alt: 100, name: "Restaurante", description: "El Lupa" }
    ],
    points: [
        { lat: -34.397, lng: 150.644 }
    ]
};

describe.only('Comment', () => {
    const container = shallow(<Comment {...{ comment: route.commentList[0] }} />);

    it("renders without crashing", () => {
        expect(container).toBeTruthy();
        expect(container).toHaveLength(1);
    });
});