"use strict";
import React from 'react';
import { render } from 'react-dom';
import { Router, Route, Link, IndexRoute } from 'react-router';
import { createHistory, useBasename } from 'history';

/*local imports*/
import {Browse} from './browsePage.js';
import {Options} from './browsePage.js';
import {Footer} from './footer.js';
import {Navbar} from './navbar.js';
import {Search} from './search.js';


const history = useBasename(createHistory)({
  basename: '/'
});

const App = React.createClass({
  render: function () {
    return (
      <div>
      <Navbar />
        {this.props.children}
      </div>
    );
  }
});

var Index = React.createClass({
  render: function() {
    return(
      <div>

        {/*Parallax*/}
        <div className="parallax-container">
          <div className="parallax"><img src="http://www.muslimpress.com/wp-content/uploads/2015/09/45.jpg" /></div>
        </div>
        <div className="section white">
          <div className="row container">
            <h2 className="header">Parallax</h2>
            <p className="grey-text text-darken-3 lighten-3">Parallax is an effect where the background content or image in this case, is moved at a different speed than the foreground content while scrolling.</p>
          </div>
        </div>
        <div className="parallax-container">
          <div className="parallax"><img src="http://117.240.88.108/rockys/wp-content/uploads/2012/05/charity-day.jpg" /></div>
        </div>

        {/*Footer*/}
        <Footer />
      </div>
    );
  }
});

render((
  <Router history={history}>
    <Route path="/" component={App}>
      <IndexRoute component={Index} />
      <Route path="browse" component={Browse} options = {Options} />
      <Route path="search" component={Search} />
    </Route>
  </Router>
), document.getElementById('app'));
