"use strict";
var React = require('react');
var ReactDOM = require('react-dom');

import { Link } from 'react-router';

var Signup = exports.Signup = React.createClass({
  getInitialState: function() {
    return {
      userType: ''
    }
  },

  setUserType: function(e) {
    console.log(e.target.value);
    this.setState( {userType: e.target.value });
  },

  showOrgSignupForm: function() {
    return (
      <div className="div-signup-form">
        <form id="signupForm" className="col s12" onSubmit={this.signup}>
          <div className="row">
            <div className="input-field col s6">
              <label htmlFor="org_name">Organization Name</label>
              <input type="text" id="org_name" name="org_name" ref="org_name" required />
            </div>
          </div>

          <div className="row">
            <div className="input-field col s6">
              <label htmlFor="username">Username</label>
              <input type="text" id="username" name="username" ref="username" required />
            </div>
          </div>

          <div className="row">
            <div className="input-field col s6">
              <label htmlFor="pwd">Password</label>
              <input type="password" id="pwd" name="pwd" ref="pwd" required />
            </div>
          </div>

          <div className="row">
            <input type="submit" value="Submit" />
          </div>
        </form>
      </div>
    )
  },

  showDonorSignupForm: function() {
    return (
      <div className="div-signup-form">
        <form id="signupForm" className="col s12" onSubmit={this.signup}>
          <div className="row">
            <div className="input-field col s6">
              <label htmlFor="first_name">First Name</label>
              <input type="text" id="first_name" name="first_name" ref="first_name" required />
            </div>
          </div>

          <div className="row">
            <div className="input-field col s6">
              <label htmlFor="last_name">Last Name</label>
              <input type="text" id="last_name" name="last_name" ref="last_name" required />
            </div>
          </div>

          <div className="row">
            <div className="input-field col s6">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" ref="email" required className="validate" />
            </div>
          </div>

          <div className="row">
            <div className="input-field col s6">
              <label htmlFor="username">Username</label>
              <input type="text" id="username" name="username" ref="username" required />
            </div>
          </div>

          <div className="row">
            <div className="input-field col s6">
              <label htmlFor="pwd">Password</label>
              <input type="password" id="pwd" name="pwd" ref="pwd" required />
            </div>
          </div>

          <div className="row">
            <input type="submit" value="Submit" />
          </div>
        </form>
      </div>
    )
  },

  signup: function(e) {
    e.preventDefault();
    // var formData = new FormData(document.querySelector('#signupForm'))
    // $('#signupForm').submit(function(e) {
    //   console.log("here")
    //   formData = $( this ).serializeArray();
    //   console.log(formData);
    //   e.preventDefault();
    // })

    var formData = {};
    if (this.state.userType === 'Organization') {
        formData.org_name = ReactDOM.findDOMNode(this.refs.org_name).value,
        formData.username = ReactDOM.findDOMNode(this.refs.username).value,
        formData.pwd = ReactDOM.findDOMNode(this.refs.username).value
        formData.userType = this.state.userType
    }

    if (this.state.userType === 'Donor') {
      formData.first_name = ReactDOM.findDOMNode(this.refs.first_name).value,
      formData.last_name = ReactDOM.findDOMNode(this.refs.last_name).value,
      formData.email = ReactDOM.findDOMNode(this.refs.email).value,
      formData.username = ReactDOM.findDOMNode(this.refs.username).value,
      formData.pwd = ReactDOM.findDOMNode(this.refs.pwd).value
      formData.userType = this.state.userType
    }

    $.ajax({
      type: 'POST',
      url: '/signup',
      data: formData,
      success: function(response) {
        console.log(response)
        //navigate to profile page
      }.bind(this),
      error: function(xhr, status, err) {
        console.log("Error posting to: " + xhr, status, err.toString());
      }.bind(this)
    });

    var frm = document.getElementById('signupForm');
    frm.reset();
    return false;
  },

  render: function() {
    if (this.state.userType === 'Organization') {
      return this.showOrgSignupForm();
    } else if (this.state.userType === 'Donor') {
      return this.showDonorSignupForm();
    } else {
      return (
        <div className="div-signup-form">
          <div className="userType">
            <button value="Organization" onClick={this.setUserType}>Organization</button>
          </div>
          <div className="userType">
            <button value="Donor" onClick={this.setUserType}>Donor</button>
          </div>
        </div>
      )
    }
  }
});
