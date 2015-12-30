"use strict";
var React = require('react');
import { History } from 'react-router';
import { Signup } from './signup.js';

// import { Link } from 'react-router';

var Login = exports.Login = React.createClass({

  getInitialState: function() {
    return {
      username: '',
      pwd: ''
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
    $.ajax({
      type: 'POST',
      url: '/login_post',
      data: this.state,
      success: function (response) {
        console.log(response);
        localStorage.token = response.token;
        // feeder.emit('getFeed', response.token)
        this.props.isLoggedIn();
        this.navigateToDashboard();
        //navigate to dashboard page
        // window.location.href = "http://127.0.0.1:4000/dashboard"
      }.bind(this),
      error: function (xhr, status, err) {
        console.log("Error posting to: " + xhr, status, err.toString());
      }.bind(this)
    });
    // var frm = document.getElementById('loginForm');
    // frm.reset();
    // return false;
  },

  render: function() {
    return (
      <div className="container">
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
                <button className="waves-effect waves-light btn" type="submit" >Submit</button>
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
                <h5>Which would you like to sign up as?</h5>
                <div className="row">
                  <div className="userType">
                    <button className="waves-effect waves-light btn" value="Organization" onClick={this.props.setUserType} style={{margin: '20px'}}>Organization</button>
                    <button className="waves-effect waves-light btn" value="Donor" onClick={this.props.setUserType} style={{margin: '20px'}}>Donor</button>
                  </div>
                </div>
              </div>
            </fieldset>
          </div>

        </div>
      </div>
    )
  }
});
