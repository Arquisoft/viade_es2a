import React from 'react';
import { render, cleanup } from 'react-testing-library';
import Multimedia from './multimedia.component';

afterAll(cleanup);

const files = [
    { '@id': "https://live.staticflickr.com/4026/4394622693_f7daebe11f_b.jpg" },
    { '@id': "https://alejandroleon98.github.io/multi/file3.zip" },
    { '@id': "https://live.staticflickr.com/65535/49693057273_67d37d186b_b.jpg" }
];

const closeRouteView = null;

describe.only('Multimedia', () => {
    const { container } = render(
        <Multimedia {...{ files, onUpload: () => undefined, editable: true }} />
    );

    it('renders without crashing', () => {
        expect(container).toBeTruthy();
    });
});