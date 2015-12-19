"use strict";
var React = require('react');
import { Link, History } from 'react-router';
import { TagContainer, Tag } from './tag_container.js';
var LocalStorageMixin = require('react-localstorage');

var Search = exports.Search = React.createClass({
  displayName: 'Search',
  mixins: [ History,LocalStorageMixin ],
  render: function () {
    return (
      <div>
        <div className="row">
          <div className="col s12 m8 push-m4">
            <h5 className="center-align">Projects</h5>
            <h6>Search Tags</h6>
            <div style={{minHeight: '25px'}}>
              <TagContainer
                searchCriteria={this.props.searchCriteria}
                removeSearchTag={this.props.removeSearchTag}/>
            </div>
            <ProjectResults
              searchResultsProjects={this.props.searchResults.projects}
              getProject={this.props.getProject}
              setProject={this.props.setProject}/>
          </div>
          <div className="col s12 m4 pull-m8">
            <h5 className="center-align">Organizations</h5>
            <OrganizationResults
              searchResultOrgs={this.props.searchResults.orgs}
              setOrganization={this.props.setOrganization}
              searchResultOrgs={this.props.searchResults.orgs}/>
          </div>
        </div>
      </div>
    );
  }
});

var OrganizationResults = React.createClass({
  render: function () {
    if (this.props.searchResultOrgs) {
      var org = this.props.searchResultOrgs.map(function(organization, index){
        return (
          <Organization
            key={index}
            org={organization}
            setOrganization={this.props.setOrganization}/>
        )
      }.bind(this));
    }
    return (
      <div>
        <div>
          <h6>Organization Results</h6>
          <div className="collection">
            {org ? org : "No results to display"}
          </div>
        </div>
      </div>
    );
  }
});

var Organization = React.createClass({

  setOrganization: function() {
    this.props.setOrganization(this.props.org);
  },

  render: function () {
    var img = (this.props.org.img) ? "data:image/jpeg;base64," + this.props.org.img
        : "http://previews.123rf.com/images/kritchanut/kritchanut1406/kritchanut140600093/29213195-Male-silhouette-avatar-profile-picture-Stock-Vector-profile.jpg";
    return (
      <div className="container">
        <div className="cardx hoverable" onClick={this.setOrganization}>

          <div className="card-image ">
            <img src={img}/>
            <span className="card-title shadow">
              <h4>{this.props.org.name}</h4>
            </span>
          </div>

          <div className="card-content truncate ">
            <p>{this.props.org.about}</p>
          </div>

          {/*<div className="card-action">
            <p>
              <button className="btn-small btn-flat waves-effect waves-light" onClick={this.setOrganization}>Read more...</button>
            </p>
          </div>*/}

        </div>
      </div>
    );
  }
});

var ProjectResults = React.createClass({
  render: function () {
    console.log("ProjectResults/render/this.props.searchResultsProjects:",this.props.searchResultsProjects);
    if (this.props.searchResultsProjects) {
      var projects = this.props.searchResultsProjects.map(function (project, index) {
        return (
          <Project
            key={index}
            title={project.title}
            info={project.info}
            areas_of_focus={project.areas_of_focus}
            projectId={project._id}
            getProject={this.props.getProject}
            setProject={this.props.setProject}
            project={project}/>
        );
      }.bind(this));
    }
    return(
      <div className="row">
        <div className="col s12 m6 l4">
          <h6>Project Search Results</h6>
          {projects ? projects : "No results to display"}
        </div>
      </div>
    );
  }

});

var Project = React.createClass({
  setProject: function(){
    this.props.setProject(this.props.project);  
  },

  getProject: function() {
    this.props.getProject(this.props.projectId);
  },

  render: function () {

    return (
      <div className="card hoverable" onClick={this.setProject}>
        <div className="card-image">
          <img src="http://worldofgoodethiopia.org/yahoo_site_admin/assets/images/30050052.182123348_std.jpg"/>
            <span className="card-title shadow">
              {this.props.title}
            </span>
        </div>

        <div className="card-content">
          <h6>{this.props.areas_of_focus}</h6>
          <div className="truncate">
            {this.props.info}
          </div>
        </div>
        <div className="card-action">
          <p>
            <button className="btn-small btn-flat waves-effect waves-light" onClick={this.getProject}>Read more...</button>
          </p>
        </div>

      </div>
    );
  }
});
