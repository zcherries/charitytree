"use strict";
import React from 'react';
import { render } from 'react-dom';
import { Router, Route, Link, IndexRoute, Navigation } from 'react-router';
import { createHistory, useBasename } from 'history';

import {Dashboard, About} from '../js/dashboard.js';
import {ProjectCreate} from '../js/projectCreate';

const history = useBasename(createHistory)({
  basename: '/org/'
});

console.log(document.getElementById('org'))

render((
  <Router history={history}>
    <Route path="/org/" component={Dashboard}>
      <IndexRoute component={About} />
      <Route path="projectCreate" component={ProjectCreate} />
    </Route>
  </Router>
), document.getElementById('org'));
