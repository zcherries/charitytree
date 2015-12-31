"use strict";
var React = require('react');
var ReactDOM = require('react-dom');
import { History } from 'react-router';
var LocalStorageMixin = require('react-localstorage');

var DonorProfile = exports.DonorProfile = React.createClass({
  getInitialState: function() {
    return {
      editing: false,
      donorInfo: {}
    }
  },

  componentWillReceiveProps: function(newProps) {
    console.log('CWRP is fired ', newProps);
    this.setState({ donorInfo: newProps.donorInfo, editing: false });
  },

  componentWillMount: function() {
    console.log('Donor Profile will mount')
  },

  componentWillUnmount: function() {
    console.log('Donor Profile will unmount')
  },

  update: function(formData) {
    console.log("Form Data:", formData);
    $.ajax({
      method: 'POST',
      url: '/dashboard/profile',
      data: formData,
      success: function(response) {
        console.log("Post Success: ", response.results);
        feeder.emit('profile_update', response.results.username);
        // this.setState({ donorInfo: response.results, editing: false });
        this.props.update_db_state_prop({
          'name': response.results.name,
          'email': response.results.email,
          'areas_of_focus': response.results.areas_of_focus
        });
      }.bind(this),
      error: function(error){
        console.log(error);
      }
    });
  },

  editPage: function(e) {
    e.preventDefault();
    this.setState({ editing: true });
  },

  handleSubmit: function(e) {
    e.preventDefault();
    var formData = {
      name: {
        first: ReactDOM.findDOMNode(this.refs.first_name).value,
        last: ReactDOM.findDOMNode(this.refs.last_name).value
      },
      email: ReactDOM.findDOMNode(this.refs.email).value,
      areas_of_focus: (ReactDOM.findDOMNode(this.refs.aofs).value).trim()
        .replace(/;\s*|\s|\r\n|\r|\n/g,"/b$117/").split("/b$117/")
    };
    this.update(formData);
  },

  displayMode: function() {
    var donorInfo = Object.keys(this.state.donorInfo).length ? this.state.donorInfo : this.props.donorInfo;
    console.log(donorInfo.areas_of_focus.join("; "));
    return (
      <div className="float-left">
        <h5>About</h5>
          <h3>{donorInfo.name.first + ' ' + donorInfo.name.last}</h3>
          <h6>{'@'+donorInfo.username}</h6>
          <p>{donorInfo.email}</p>
        <h5>Areas of Focus</h5>
          <ul>
            {donorInfo.areas_of_focus.map(function(aof, idx) {
              return (
                <li key={idx}><i className="tiny material-icons">label</i>{aof}</li>
              );
            })}
          </ul>
        <button className="waves-effect waves-light btn blue"onClick={this.editPage}>Edit</button>
      </div>
    )
  },

  editMode: function() {
    var donorInfo = Object.keys(this.state.donorInfo).length ? this.state.donorInfo : this.props.donorInfo;
    return (
      <div className="float-left">
          <h5>Profile</h5>
          <div className="div-profile-edit-form">
            <form id="profileEdit" className="col s12" onSubmit={this.handleSubmit}>
              <div className="row">
                <div className="input-field col s6">
                  <label htmlFor="first_name">First Name</label>
                  <input type="text" id="first_name" name="first_name" ref="first_name" defaultValue={donorInfo.name.first} required />
                </div>
              </div>

              <div className="row">
                <div className="input-field col s6">
                  <label htmlFor="last_name">Last Name</label>
                  <input type="text" id="last_name" name="last_name" ref="last_name"defaultValue={donorInfo.name.last} required />
                </div>
              </div>

              <div className="row">
                <div className="input-field col s6">
                  <label htmlFor="email">Email</label>
                  <input className="validate" type="email" id="email" name="email" ref="email" defaultValue={donorInfo.email} required />
                </div>
              </div>

              <div className="row">
                <div className="input-field col s12">
                  <label htmlFor="aofs">Areas of Focus</label>
                  <textarea id="aofs" className="materialize-textarea" ref="aofs" defaultValue={donorInfo.areas_of_focus.join("; ")}/>
                </div>
              </div>
              <input type="submit" value="Submit" className="waves-effect waves-light btn blue"/>
            </form>
          </div>
      </div>
    );
  },

  render: function() {
    return (!this.state.editing) ? this.displayMode() : this.editMode()
  }
});
