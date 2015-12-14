"use strict";
var React = require('react');
var ReactDOM = require('react-dom');

import { Link } from 'react-router';

var Login = exports.Login = React.createClass({
  getInitialState: function() {
    return {
      username: '',
      pwd: ''
    }
  },

  usernameChange: function(e) {
    this.setState({ username: e.target.value });
  },

  pwdChange: function(e) {
    this.setState({ pwd: e.target.value });
  },

  login: function(e) {
    e.preventDefault();
    $.ajax({
      type: 'POST',
      url: '/login',
      data: this.state,
      success: function(response) {
        console.log(response)
        //navigate to profile page
      }.bind(this),
      error: function(xhr, status, err) {
        console.log("Error posting to: " + xhr, status, err.toString());
      }.bind(this)
    });

    var frm = document.getElementById('loginForm');
    frm.reset();
    return false;
  },

  render: function() {
    return (

      <div className="div-signup-form">
        <form id="loginForm" className="col s12" onSubmit={this.login}>
          <div className="row">
            <div className="input-field col s4">
              <label htmlFor="username">Username</label>
              <input type="text" id="username" name="username" required onChange={this.usernameChange} />
            </div>
          </div>

          <div className="row">
            <div className="input-field col s4">
              <label htmlFor="pwd">Password</label>
              <input type="password" id="pwd" name="pwd" required onChange={this.pwdChange} />
            </div>
          </div>

          <div className="row">
            <input type="submit" value="Submit" />
          </div>
        </form>
      </div>
    )
  }
});
