import React from 'react';
import { render, cleanup } from 'react-testing-library';
import { BrowserRouter as Router } from 'react-router-dom';
import GroupView from './group-view.component';

const group = {
    name: "Grupo A",
    members: "https://marcosav2.inrupt.net/profile/card#me",
    date: 1529644667834,
    owner: 'https://marcosav.inrupt.net/profile/card#me'
}

describe.only('GroupView', () => {
    afterAll(cleanup);

    const { container } = render(
        <Router>
            <GroupView {...{ group }} />
        </Router>
    );

    it('renders without crashing', () => {
        expect(container).toBeTruthy();
    });
});