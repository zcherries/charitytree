"use strict";
var React = require('react');
import { Router, Route, Link, IndexRoute } from 'react-router';


var Footer = exports.Footer = React.createClass({
  render: function () {
    return (
      <footer className="page-footer grey lighten-5">
        <div className="container">
          <div className="row">
            <div className="col l6 s12">
              <h5 className="black-text">Charity Tree</h5>
              <p className="grey-text">Making Giving Personal!</p>
            </div>
            <div className="col l4 offset-l2 s12">
              <h5 className="black-text">Links</h5>
              <ul>
                <li><Link className="waves-effect waves-light black-text" to="search" className="black-text text-lighten-3">Search</Link></li>
                <li><Link className="waves-effect waves-light black-text" to="browse" className="black-text text-lighten-3">Browse</Link></li>
                <li><a className="black-text" href="#!">Link 3</a></li>
                <li><a className="black-text" href="#!">Link 4</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="footer-copyright">
          <div className="container black-text">
            © 2015 Charity Collective
            <a className="black-text right" href="#!">More Links</a>
          </div>
        </div>
      </footer>
    );
  }
});