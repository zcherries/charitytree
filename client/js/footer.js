"use strict";
var React = require('react');
import { Router, Route, Link, IndexRoute } from 'react-router';


var Footer = exports.Footer = React.createClass({
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
                <li><Link className="waves-effect waves-light" to="search" className="grey-text text-lighten-3">Search</Link></li>
                <li><Link className="waves-effect waves-light" to="browse" className="grey-text text-lighten-3">Browse</Link></li>
                <li><a className="grey-text text-lighten-3" href="#!">Link 3</a></li>
                <li><a className="grey-text text-lighten-3" href="#!">Link 4</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="footer-copyright">
          <div className="container">
            © 2015 Charity Collective
            <a className="grey-text text-lighten-4 right" href="#!">More Links</a>
          </div>
        </div>
      </footer>
    );
  }
});