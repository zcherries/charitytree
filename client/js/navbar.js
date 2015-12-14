"use strict";
var React = require('react');
import { Link } from 'react-router';

var Navbar = exports.Navbar = React.createClass({
  updateInput: function (e) {
    //console.log("value",e.target.value);
    this.props.updateInput(e.target.value);
  },

  clearInput: function (e) {
    //console.log("value",e.target.value);
    this.props.updateInput("");
  },

  handleSearchSubmit: function (e) {
    e.preventDefault();
    this.props.handleSearchSubmit();
  },

  render: function () {
    return (
      <div>
        <div className="navbar-fixed">
          <nav>
            <div className="nav-wrapper grey lighten-5">
              <Link to="/" className="brand-logo black-text">Charity Tree</Link>
              <a href="#" data-activates="mobile-demo" className="button-collapse black-text"><i className="material-icons">menu</i></a>
              <ul className="right hide-on-med-and-down">
                <li>
                  <form onSubmit={this.handleSearchSubmit}>
                    <div className="input-field black-text">
                    <input
                        id="search"
                        type="search"
                        placeholder="Search..."
                        value={this.props.searchText}
                        onChange={this.updateInput}
                        required />
                      <label htmlFor="search" ><i className="material-icons black-text" >search</i></label>
                      {this.props.searchText ? <i className="material-icons black-text" onClick={this.clearInput}>close</i> : "" }
                    </div>
                  </form>
                </li>
                <li><Link className="waves-effect waves-light black-text" to="/login">Login</Link></li>
                <li><Link className="waves-effect waves-light black-text" to="/organization">organization</Link></li>

                <li><Link className="waves-effect waves-light black-text" to="/signup">Signup</Link></li>
                <li><Link className="waves-effect waves-light black-text" to="/browse">Browse Categories</Link></li>
                <li><Link className="waves-effect waves-light black-text" to="/projectCreate">Create a Project</Link></li>

              </ul>

              {/*Side Navigation*/}
              <ul className="side-nav" id="mobile-demo">
                <li>
                  <form onSubmit={this.handleSearchSubmit}>
                    <div className="input-field black-text">
                      <input
                        id="search"
                        type="search"
                        placeholder="Search..."
                        value={this.props.searchText}
                        onChange={this.updateInput}
                        required />
                      <label htmlFor="search" ><i className="material-icons black-text" >search</i></label>
                      {this.props.searchText ? <i className="material-icons black-text" onClick={this.clearInput}>close</i> : "" }
                    </div>
                  </form>
                </li>
                <li><Link className="waves-effect waves-light" to="/login">Login</Link></li>
                <li><Link className="waves-effect waves-light" to="/signup">Signup</Link></li>
                <li><Link className="waves-effect waves-light" to="/browse">Browse Categories</Link></li>
              </ul>
            </div>
          </nav>
        </div>
      </div>
    );
  }
});
