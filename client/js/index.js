  "use strict";
import React from 'react';
import { render } from 'react-dom';
import { Router } from 'react-router';
import { createHistory, useBasename, } from 'history';
//import createBrowserHistory from 'history/lib/createBrowserHistory';

/*local imports*/
//============Unauthenticated Routes===============/
import {App} from './App';
import {Navbar} from './navbar';
import {Footer} from './footer.js';
import {Home} from './Home';
import {Browse} from './browsePage.js';
import {Search} from './search.js';
import {Project} from './project.js';
import {Signup} from './signup.js';
import {Login} from './login.js';
import {Organization} from './organizationpage.js';

//============Authenticated Routes===============/
import {Dashboard} from './dashboard.js';
// import {ProjectCreate} from './dashboard/projectCreate.js';
import {Upload} from './upload.js';
import auth from '../utils/auth';
import routes from '../config/routes';

const history = useBasename(createHistory)({
  basename: '/'
});

//let history = createBrowserHistory();

render(<Router history={history} routes={routes}/>, document.getElementById('app'));
