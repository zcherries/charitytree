"use strict";
var React = require('react');
import { Link } from 'react-router';

var Navbar = exports.Navbar = React.createClass({
  render: function () {
    return(
      <div>
        <nav>
          <div className="nav-wrapper">
            <Link to="/" className="brand-logo">Charity Tree</Link>
            <a href="#" data-activates="mobile-demo" className="button-collapse"><i className="material-icons">menu</i></a>
            <ul className="right hide-on-med-and-down">
              <li><Link className="waves-effect waves-light" to="/search">Search</Link></li>
              <li><Link className="waves-effect waves-light" to="/browse">Browse</Link></li>
            </ul>
            <ul className="side-nav" id="mobile-demo">
              <li><a href="sass.html">Sass</a></li>
              <li><a href="badges.html">Components</a></li>
              <li><a href="collapsible.html">Javascript</a></li>
              <li><a href="mobile.html">Mobile</a></li>
            </ul>
          </div>
        </nav>
        <SearchBar />
      </div>
    );
  }
});

var SearchBar = exports.SearchBar = React.createClass({
  render: function () {
    return(
      <div>
        <nav>
          <div className="nav-wrapper">
            <form>
              <div className="input-field">
                <input id="search" type="search" required />
                <label htmlFor="search"><i className="material-icons">search</i></label>
                <i className="material-icons">close</i>
              </div>
            </form>
          </div>
        </nav>
      </div>
    );
  }
});