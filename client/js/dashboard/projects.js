"use strict";
var React = require('react');
var ReactDOM = require('react-dom');

import {ProjectCreate} from './projectCreate.js'

var Projects = exports.Projects = React.createClass({
  getInitialState: function() {
    return {
      action: 'display',
      orgInfo: {}
    }
  },

  update: function(formData) {
    console.log("Form Data:", formData);
    $.ajax({
      method: 'POST',
      url: '/dashboard_data/projects',
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

  changeAction: function(e) {
    e.preventDefault();
    this.setState({ action: 'create' });
  },

  showProjectForm: function() {
    console.log('Show Form')
    return <div><ProjectCreate /></div>
  },

  handleSubmit: function(e) {
    e.preventDefault();
    this.update(formData);
  },

  displayMode: function() {
    return (
      <div>
        <h4><a href="#" onClick={this.changeAction}>Create a Project</a></h4>
        <div>

        </div>
      </div>
    )
  },

  editMode: function() {
    var orgInfo = Object.keys(this.state.orgInfo).length ? this.state.orgInfo : this.props.orgInfo;
    return (
      <div>
        <h3>{orgInfo.name}</h3>
        <h5>{orgInfo.username}</h5>
        <form onSubmit={this.handleSubmit}>
          <h5>About</h5>
          <textarea className="form-control" ref="about" defaultValue={orgInfo.about}></textarea>
          <h5>Areas of Focus</h5>
          <textarea className="form-control" ref="aofs" defaultValue={orgInfo.areas_of_focus.join("; ")}></textarea>
          <input type="submit" value="Submit" />
        </form>
      </div>
    )
  },

  render: function() {
    return (this.state.action === 'display') ? this.displayMode() : this.showProjectForm()
  }
});
