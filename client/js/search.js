"use strict";
var React = require('react');
import { Link, History } from 'react-router';
import { TagContainer, Tag } from './tagContainer.js';

exports.Search = React.createClass({
  render: function () {
    return (
      <div>
        <div className="row">
          <h4 className="center-align"> Find a cause to give to </h4>

            <div className="center-align col s6 grey lighten-2">
          <h5 className="center col s8"> Tags</h5>

                <TagContainer
                    searchCriteria={this.props.searchCriteria}
                    removeSearchTag={this.props.removeSearchTag}/>
            </div>

          {/*Search Tags*/}


          {/*Project Search Results*/}
          <div className="col s12 m8 push-m3">
            <h5 className="center-align">Project Search Results</h5><hr/>
            <ProjectResults
              searchResultsProjects={this.props.searchResults.projects}
              getProject={this.props.getProject}
              setProject={this.props.setProject}/>
          </div>

          {/*Org Search Results*/}
          <div className="col s12 m3 pull-m8">
            <h5 className="center-align">Organizations</h5><hr/>
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
          <div className="row">
            {org ? org : <h5 className="center-align">No results to display</h5>}
          </div>
        </div>
      </div>
    );
  }
});

var Organization = React.createClass({
  setOrganization: function() {
    localStorage.currentOrgID = this.props.org._id;
    console.log('Set local storage organization');
    this.props.setOrganization(this.props.org);
    console.log('inside of search.js and localstorage is ', localStorage);
    localStorage.currentOrganization = this.props.org._id;
    console.log('inside of search.js and localstorage.currOrg is ', localStorage.currentOrganization);
  },

  render: function () {
    var img = (this.props.org.profile_img) ? "http://localhost:4000/organization/profile_img/" + this.props.org._id
        : "http://previews.123rf.com/images/kritchanut/kritchanut1406/kritchanut140600093/29213195-Male-silhouette-avatar-profile-picture-Stock-Vector-profile.jpg";
    return (
      <div className="cardx hoverable" onClick={this.setOrganization}>
        <div className="card-image ">
          <img src={img}/>
          <span className="card-title shadow">
            <h4>{this.props.org.name}</h4>
          </span>
        </div>

        <div className="card-content">
          <div className="line-clamp line-clamp-5">
            {this.props.org.about}
          </div>
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
        {projects ? projects : <h5 className="center-align">No results to display</h5>}
      </div>
    );
  }
});

var Project = React.createClass({
  setProject: function(){
    console.log('inside of search.js in set project');
        console.log('inside of search.js and localStorage.currentProjID is ', localStorage.currentProjID);

    localStorage.currentProjID = this.props.projectId;
    this.props.setProject(this.props.project);
},

  getProject: function() {
    this.props.getProject(this.props.projectId);
  },

  render: function () {

    return (
    <div className="col s12 m6 l4" onClick={this.setProject}>
      <div className="card hoverable">
        <div className="card-image">
          <img className="responsive-img" src="http://worldofgoodethiopia.org/yahoo_site_admin/assets/images/30050052.182123348_std.jpg"/>
            <span className="card-title shadow">
              {this.props.title}
            </span>
        </div>

        <div className="card-content">
          <div className="line-clamp line-clamp-5">
            {this.props.info}
          </div>
        </div>

      </div>
    </div>
    );
  }
});
