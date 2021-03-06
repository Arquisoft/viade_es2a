import React, { Fragment } from 'react';
import { PrivateLayout, PublicLayout, NotLoggedInLayout } from '@layouts';
import { HashRouter as Router, Switch, Redirect } from 'react-router-dom';

import {
  Login,
  Register,
  PageNotFound,
  Welcome,
  RegistrationSuccess,
  Feed,
  MyRoutes
} from './containers';

const privateRoutes = [
  {
    id: 'welcome',
    path: '/welcome',
    component: Welcome
  },
  {
    id: 'feed',
    path: '/feed',
    component: Feed
  },
  {
    id: 'myRoutes',
    path: '/my-routes',
    component: MyRoutes
  }
];

const Routes = () => (
  <Router>
    <Fragment>
      <Switch>
        <NotLoggedInLayout component={Login} path="/login" exact />
        <NotLoggedInLayout component={Register} path="/register" exact />
        <NotLoggedInLayout path="/register/success" component={RegistrationSuccess} exact />
        <PublicLayout path="/404" component={PageNotFound} exact />
        <Redirect from="/" to="/feed" exact />
        <PrivateLayout path="/" routes={privateRoutes} />
        <Redirect to="/404" />
      </Switch>
    </Fragment>
  </Router>
);

export default Routes;
