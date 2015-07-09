'use strict';

import React from 'react';
import App from '../pages/app.js';
import Index from 'react-router-proxy?name=index!../pages/index.js';
import Login from 'react-router-proxy?name=login!../pages/login.js';
import { Route, DefaultRoute } from 'react-router';

module.exports = (
  <Route name='index' path='/?' handler={App}>
    <Route name='login' path='login' handler={Login} />
    <DefaultRoute name='home' handler={Index} />
  </Route>
);
