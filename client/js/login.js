"use strict";
var React = require('react');
import { History } from 'react-router';
import { Signup } from './signup.js';
import auth from '../utils/auth.js';

import { Link } from 'react-router';

var Login = exports.Login = React.createClass({
  mixins: [History],

  getInitialState: function() {
    return {
      username: '',
      pwd: '',
      error: false
    }
  },

  navigateToDashboard: function () {
    this.props.history.pushState(null, `/dashboard`);
  },

  usernameChange: function(e) {
    this.setState({ username: e.target.value });
  },

  pwdChange: function(e) {
    this.setState({ pwd: e.target.value });
  },

  login: function(e) {
    e.preventDefault();
    auth.login(this.state.username, this.state.pwd, function (loggedIn) {
        console.log("Login/login/loggedIn:",loggedIn);
      if (!loggedIn) {
        return this.setState({ error: true });
      }
      const {location} = this.props;
      //console.log("Login/login/location:",location);
      if (location.state && location.state.nextPathname) {
        this.history.replaceState(null, location.state.nextPathname);
      } else {
        this.history.replaceState(null, '/');
      }
    }.bind(this));

    // var frm = document.getElementById('loginForm');
    // frm.reset();
    // return false;
  },

  render: function() {
    return (
      <div className="div-signup-form container">
        <div className="row">
          <div className="col s12 m6">
            <fieldset className="center-align">
              <header><h3>Login</h3></header><hr/>
              <form id="loginForm" onSubmit={this.login}>
                <div className="input-field">
                  <label htmlFor="username">Username</label>
                  <input type="text" id="username" name="username" required onChange={this.usernameChange} />
                </div>
                <div className="input-field">
                  <label htmlFor="pwd">Password</label>
                  <input type="password" id="pwd" name="pwd" required onChange={this.pwdChange} />
                </div>
                <input type="submit" value="Submit" />
                {this.state.error && (
                  <p>Bad login information</p>
                )}
              </form>
            </fieldset>
          </div>
          <div className="col s12 m6">
            <fieldset className="center-align">
              <header><h3>Signup</h3></header><hr/>
              <div>
                <div className="userType">
                  <button value="Organization" onClick={this.props.setUserType}>Organization</button>
                </div>
                <div className="userType">
                  <button value="Donor" onClick={this.props.setUserType}>Donor</button>
                </div>
              </div>
            </fieldset>
          </div>
        </div>
      </div>
    )
  }
});
