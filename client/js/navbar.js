"use strict";
var React = require('react');
import { Link } from 'react-router';

var Navbar = exports.Navbar = React.createClass({
  render: function () {
    return(
      <div>
        <div className="navbar-fixed">
          <nav>
            <div className="nav-wrapper grey lighten-5">
              <Link to="/" className="brand-logo black-text">Charity Tree</Link>
              <a href="#" data-activates="mobile-demo" className="button-collapse"><i className="material-icons">menu</i></a>
              <ul className="right hide-on-med-and-down">
                <li>
                  <form>
                    <div className="input-field black-text">
                      <input id="search black" type="search" placeholder="Search..." required />
                      <label htmlFor="search"><i className="material-icons grey-text text-lighten-3 black-text">search</i></label>
                      <i className="material-icons">close</i>
                    </div>
                  </form>
                </li>
                <li><Link className="waves-effect waves-light black-text" to="/search">Advanced Search</Link></li>
                <li><Link className="waves-effect waves-light black-text" to="/browse">Browse Categories</Link></li>
              </ul>

              {/*Side Navigation*/}
              <ul className="side-nav" id="mobile-demo">
                <li>
                  <form>
                    <div className="input-field">
                      <input id="search" type="search" placeholder="Search..." required />
                      <label htmlFor="search"><i className="material-icons grey-text text-darken-3">search</i></label>
                      <i className="material-icons">close</i>
                    </div>
                  </form>
                </li>
                <li><Link className="waves-effect waves-light" to="/search">Advanced Search</Link></li>
                <li><Link className="waves-effect waves-light" to="/browse">Browse Categories</Link></li>
              </ul>
            </div>
          </nav>
        </div>
        {/*
        <SearchBar />*/}
      </div>
    );
  }
});

//var SearchBar = exports.SearchBar = React.createClass({
//  render: function () {
//    return(
//      <div>
//        <nav>
//          <div className="nav-wrapper">
//            <form>
//              <div className="input-field">
//                <input id="search" type="search" required />
//                <label htmlFor="search"><i className="material-icons">search</i></label>
//                <i className="material-icons">close</i>
//              </div>
//            </form>
//          </div>
//        </nav>
//      </div>
//    );
//  }
//});