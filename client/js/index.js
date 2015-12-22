  "use strict";
import React from 'react';
import { render } from 'react-dom';
import { Router } from 'react-router';
import { createHistory, useBasename } from 'history';
//import createBrowserHistory from 'history/lib/createBrowserHistory';

import { routes } from '../config/routes';

const history = useBasename(createHistory)({
  basename: '/'
});

//let history = createBrowserHistory();

render(<Router history={history} routes={routes}/>, document.getElementById('app'));
