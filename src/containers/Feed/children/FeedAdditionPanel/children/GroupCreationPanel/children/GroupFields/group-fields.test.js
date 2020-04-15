import React from 'react';
import { render, cleanup } from 'react-testing-library';
import { BrowserRouter as Router } from 'react-router-dom';
import GroupFields from './group-fields.component';

describe.only('GroupFields', () => {
    afterAll(cleanup);

    const { container } = render(
        <Router>
            <GroupFields />
        </Router>
    );

    it('renders without crashing', () => {
        expect(container).toBeTruthy();
    });
});