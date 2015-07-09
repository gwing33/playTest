'use strict';

import Index from 'react-router-proxy?name=user!../pages/index.jsx';
import Login from 'react-router-proxy?name=user!../pages/login.jsx';
import { Route } from 'react-router';

var routes = (
  <Route name="/" handler={Index}>
    <Route name="login" handler={Login}>
  </Route>
);

module.exports = routes;
