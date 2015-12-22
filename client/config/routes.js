//============Unauthenticated Routes===============/
import {App} from '../js/app.js';
import {Home} from '../js/home.js';
import {Browse} from '../js/browse.js';
import {Search} from '../js/search.js';
import {Project} from '../js/project.js';
import {Organization} from '../js/organization.js';
import {Login} from '../js/login.js';
import {Signup} from '../js/signup.js';

//============Authenticated Routes===============/
import {Dashboard} from '../js/dashboard.js';
// import auth from '../utils/auth.js';
import Logout from '../js/logout.js';

function redirectToLogin(nextState, replaceState) {
  if (!loggedIn()) {
    replaceState({
      nextPathname: nextState.location.pathname
    }, '/login')
  }
}

function redirectToDashboard(nextState, replaceState) {
  if (loggedIn()) {
    replaceState(null, '/dashboard');
  }
}

var loggedIn = exports.loggedIn = function () {
  console.log('Token: ' + localStorage.token)
  return !!localStorage.token;
}

exports.routes = {
  component: App,
  childRoutes: [
    { path: '/',
      getComponent: (location, cb) => {
        require.ensure([], () => {
          cb(null, Home);
        });
      }
    },

    { path: '/dashboard',
      getComponent: (location, cb) => {
        // Share the path
        // Dynamically load the correct component
        if (loggedIn()) {
          return require.ensure([], () => {
            cb(null, Dashboard);
          })
        }
        return require.ensure([], () => {
          cb(null, Login);
        })
      },
      // indexRoute: {
      //   getComponent: (location, cb) => {
      //     // Only load if we're logged in
      //     if (auth.loggedIn()) {
      //       return require.ensure([], () => {
      //         cb(null, Dashboard);
      //       })
      //     }
      //     return cb()
      //   }
      // },
      //childRoutes: [
      //  { onEnter: redirectToLogin,
      //    childRoutes: [
      //      // Protected nested routes for the dashboard
      //      { path: '/page2',
      //        getComponent: (location, cb) => {
      //          require.ensure([], (require) => {
      //            cb(null, require('../components/PageTwo'));
      //          })
      //        }
      //      }
      //      // ...
      //    ]
      //  }
      //]
    },

    { path: '/browse',
      getComponent: (location, cb) => {
        require.ensure([], () => {
          cb(null, Browse);
        });
      }
    },
    { path: '/search',
      getComponent: (location, cb) => {
        require.ensure([], () => {
          cb(null, Search);
        });
      }
    },
    { path: '/project',
      getComponent: (location, cb) => {
        require.ensure([], () => {
          cb(null, Project);
        });
      }
    },
    { path: '/logout',
      getComponent: (location, cb) => {
        require.ensure([], () => {
          cb(null, Logout);
        });
      }
    },
    { path: '/login',
      getComponent: (location, cb) => {
        require.ensure([], () => {
          cb(null, Login);
        });
      }
    },
    { path: '/organization',
      getComponent: (location, cb) => {
        require.ensure([], () => {
          cb(null, Organization);
        });
      }
    },

    { onEnter: redirectToDashboard,
      childRoutes: [
        // Unauthenticated routes
        // Redirect to dashboard if user is already logged in
        { path: '/login',
          getComponent: (location, cb) => {
            require.ensure([], () => {
              cb(null, Login);
            })
          }
        }
        // ...
      ]
    },

    //{ onEnter: redirectToLogin,
    //  childRoutes: [
    //    // Protected routes that don't share the dashboard UI
    //    { path: '/user/:id',
    //      getComponent: (location, cb) => {
    //        require.ensure([], (require) => {
    //          cb(null, require('../js/User'));
    //        })
    //      }
    //    }
    //    // ...
    //  ]
    //},
  ]
}


//render((
//  <Router history={history}>
//    <Route path="/" component={App}>
//      <IndexRoute component={Index} />
//      <Route path="Login" component={Login} />
//      <Route path="Signup" component={Signup} />
//      <Route path="browse" component={Browse} />
//      <Route path="search" component={Search} />
//      <Route path="project" component={Project} />
//      <Route path="organization" component={Organization} />
//    </Route>
//  </Router>
//), document.getElementById('app'));
