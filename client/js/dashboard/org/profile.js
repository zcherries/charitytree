"use strict";
var React = require('react');
var ReactDOM = require('react-dom');
import { History } from 'react-router';
var LocalStorageMixin = require('react-localstorage');

var OrgProfile = exports.OrgProfile = React.createClass({
  // displayName: 'OrgProfile',
  // mixins: [ History, LocalStorageMixin ],
  getInitialState: function() {
    return {
      editing: false,
      orgInfo: {}
    }
  },

  update: function(formData) {
    console.log("Form Data:", formData);
    $.ajax({
      method: 'POST',
      url: '/dashboard_data/profile',
      data: formData,
      success:function(response) {
        console.log("Post Success: ", response.results);
        this.setState({ orgInfo: response.results, editing: false });
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
      about: ReactDOM.findDOMNode(this.refs.about).value,
      areas_of_focus: (ReactDOM.findDOMNode(this.refs.aofs).value).trim()
        .replace(/\s|;\s*|\r\n|\r|\n/g,"/b$117/").split("/b$117/")
    }
    this.update(formData);
  },

  displayMode: function() {
    var orgInfo = Object.keys(this.state.orgInfo).length ? this.state.orgInfo : this.props.orgInfo;
    console.log(orgInfo.areas_of_focus.join("; "));
    return (
      <div className="float-left">
        <h3>{orgInfo.name}</h3>
          <h6>{'@'+orgInfo.username}</h6>
          <h5>About</h5>
          <p>{orgInfo.about}</p>
        <h5>Areas of Focus</h5>
          <ul>
            {orgInfo.areas_of_focus.map(function(aof, idx) {
              return <li key={idx}>{aof}</li>
            })}
          </ul>
        <a className="waves-effect waves-light btn blue" onClick={this.editPage}>Edit</a>
      </div>
    )
  },

  editMode: function() {
    var orgInfo = Object.keys(this.state.orgInfo).length ? this.state.orgInfo : this.props.orgInfo;
    return (
      <div className="float-left">
        <h3>{orgInfo.name}</h3>
        <h5>{orgInfo.username}</h5>

        <div className="div-profile-edit-form">
          <form id="profileEdit" className="col s12" onSubmit={this.handleSubmit}>
            <div className="row">
              <div className="input-field col s12">
                <label htmlFor="about">About</label>
                <textarea id="about" className="materialize-textarea" ref="about" defaultValue={orgInfo.about} required></textarea>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <label htmlFor="aofs">Areas of Focus</label>
                <textarea id="aofs" className="materialize-textarea" ref="aofs" defaultValue={orgInfo.areas_of_focus.join("; ")}></textarea>
              </div>
            </div>
            <input type="submit" value="Submit" className="btn blue"/>
          </form>
        </div>
      </div>
    )
  },

  render: function() {
    return (!this.state.editing) ? this.displayMode() : this.editMode()
  }
});
