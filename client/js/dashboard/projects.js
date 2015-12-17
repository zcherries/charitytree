"use strict";
var React = require('react');
var ReactDOM = require('react-dom');

import {ProjectCreate} from './projectCreate.js'

var Projects = exports.Projects = React.createClass({
  compDidMount: function() {
    this.getProjects();
  },

  componentDidMount: function() {
    this.setState({ action: 'display' });
  },

  getInitialState: function() {
    return {
      action: '',
      projects: []
    }
  },

  getProjects: function() {
    $.ajax({
      method: 'GET',
      url: '/dashboard_data/projects',
      success:function(response) {
        console.log("GET Success: ", response.results);
        this.setState({ projects: response.results, action: 'display' });
      }.bind(this),
      error: function(error){
        console.log(error);
      }
    });
  },

  update: function(formData) {
    console.log("Form Data:", formData);
    $.ajax({
      method: 'POST',
      url: '/dashboard_data/projects',
      data: formData,
      success: function(response) {
        console.log("POST Success: ", response.results);
        this.setState({ projects: response.results });
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

  createProject: function() {
    console.log('Show Form')
    return <div><ProjectCreate submitHandler={this.handleSubmit} /></div>
  },

  handleSubmit: function() {
    this.getProjects();
  },

  showProjects: function() {
    var org_projects = this.state.projects.length ? this.state.projects : this.props.projects;
    console.log("Org Projects: ", org_projects)
    return (
      <div>
        <h6><a href="#" onClick={this.changeAction}>Create a Project</a></h6>
        <div>
          {org_projects.map(function(project, idx) {
            return <ProjectBlurb key={idx} details={project} />
          })}
        </div>
      </div>
    )
  },

  editMode: function() {
    var orgInfo = Object.keys(this.state.orgInfo).length ? this.state.orgInfo : this.props.orgInfo;
    return (
      <div>
      </div>
    )
  },

  render: function() {
    return (this.state.action === 'display') ? this.showProjects() : this.createProject()
  }
});

var ProjectBlurb = React.createClass({
  render: function() {
    return (
      <div>
        <h5>Project</h5>
        <p>{"Title: " + this.props.details.title}</p>
        <p>{"Description: " + this.props.details.info}</p>
        <p>{"Status: " + this.props.details.status}</p>
        <p>{"Created: " + this.props.details.created_date}</p>
        <p>{"Total Donors: " + this.props.details.total_donors_participating}</p>
      </div>
    )
  }
})
