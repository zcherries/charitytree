"use strict";
var React = require('react');
var ReactDOM = require('react-dom');
var Router = require('react-router').Router;
var Route = require('react-router').Route;
var Link = require('react-router').Link;
var IndexRoute = require('react-router').IndexRoute;
import { createHistory, useBasename } from 'history'

//local imports
import {Browse} from './js/browsePage.js';
var Search = require('./js/search.js');

const history = useBasename(createHistory)({
  basename: '/'
});

const App = React.createClass({

  render: function () {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
});

var Index = React.createClass({
  render: function() {
    return(
      <div>
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

        <Footer />
      </div>
    );
  }
});

var Footer = React.createClass({
  render: function () {
    return (
      <footer className="page-footer">
        <div className="container">
          <div className="row">
            <div className="col l6 s12">
              <h5 className="white-text">Footer Content</h5>
              <p className="grey-text text-lighten-4">You can use rows and columns here to organize your footer content.</p>
            </div>
            <div className="col l4 offset-l2 s12">
              <h5 className="white-text">Links</h5>
              <ul>
                <li><a className="grey-text text-lighten-3" href="search">Search</a></li>
                <li><a className="grey-text text-lighten-3" href="#!">Link 2</a></li>
                <li><a className="grey-text text-lighten-3" href="#!">Link 3</a></li>
                <li><a className="grey-text text-lighten-3" href="#!">Link 4</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="footer-copyright">
          <div className="container">
            © 2014 Copyright Text
            <a className="grey-text text-lighten-4 right" href="#!">More Links</a>
          </div>
        </div>
      </footer>
    );
  }
})

ReactDOM.render((
  <Router history={history}>
    <Route path="/" component={App}>
      <IndexRoute component={Index} />
      <Route path="browse" component={Browse} />
      <Route path="search" component={Search} />
    </Route>
  </Router>
), document.getElementById('app'));
