"use strict";
var React = require('react');
var ReactDOM = require('react-dom');

import {ProjectCreate} from './projectCreate.js'
import {ProjectEdit} from './projectEdit.js'

var Projects = exports.Projects = React.createClass({
  componentWillReceiveProps: function(nextProps) {
    if (this.props.projects.length !== nextProps.projects.length) {
      this.setState({ projects: nextProps.projects, action: 'display' })
    }
  },

  getInitialState: function() {
    return {
      action: 'display',
      projects: [],
      project_to_edit: {}
    }
  },

  getProjects: function() {
    $.ajax({
      method: 'GET',
      url: '/dashboard_data/projects',
      success:function(response) {
        console.log("GET Success: ", response.results);
        // this.setState({ projects: response.results.projects, action: 'display' });
        this.props.update_db_state_prop('projects', response.results.projects); //update dashboard state property
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

  create: function(e) {
    e.preventDefault();
    this.setState({ action: 'create' });
  },

  edit: function(project) {
    this.setState({ project_to_edit: project, action: 'edit' });
  },

  createProject: function() {
    return <div><ProjectCreate submitHandler={this.submitHandler} /></div>
  },

  editProject: function() {
    return <div><ProjectEdit submitHandler={this.submitHandler} project={this.state.project_to_edit} /></div>
  },

  submitHandler: function() {
    this.getProjects();
  },

  showProjects: function() {
    var org_projects = this.state.projects.length ? this.state.projects : this.props.projects;
    return (
      <div>
        <h6><a href="#" onClick={this.create}>Create a Project</a></h6>
        <div>
          {org_projects.map(function(project, idx) {
            return <ProjectBlurb key={idx} project={project} edit={this.edit} />
          }.bind(this))}
        </div>
      </div>
    )
  },

  render: function() {
    switch (this.state.action) {
      case 'display':
        return this.showProjects()
        break;
      case 'create':
        return this.createProject()
        break;
      case 'edit':
        return this.editProject()
        break;
      default:
      return this.showProjects()
    }
  }
});

var ProjectBlurb = React.createClass({
  edit: function(e) {
    e.preventDefault();
    this.props.edit(this.props.project);
  },

  render: function() {
    return (
      <div className="card blue-grey darken-1">
        <div className="card-content white-text">
          <span className="card-title">{this.props.project.title}</span>
          <span className="btn_edit_project"><button onClick={this.edit} className="btn blue">Update</button></span>
          <p>{"Description: " + this.props.project.info}</p>
          <p>{"Status: " + this.props.project.status}</p>
          <p>{"Created: " + this.props.project.created_date}</p>
          <p>{"Total Donors: " + this.props.project.total_donors_participating}</p>
        </div>
      </div>
    )
  }
});
