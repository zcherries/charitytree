"use strict";
var React = require('react');
import { Link } from 'react-router';
import { TagContainer, Tag } from './tag_container.js';


var Search = exports.Search = React.createClass({
  render: function () {
    console.log("Search Props: ", this.props);
    return (
      <div>
        <div className="row">
          <div className="col s12 m8 push-m4">
            <h5 className="center-align">Projects</h5>
            <h6>Search Tags</h6>
            <div style={{minHeight: '25px'}}>
              <TagContainer
                searchCriteria={this.props.searchCriteria}
                removeSearchTag={this.props.removeSearchTag}
              />
            </div>
            <ProjectResults
              searchResultsProjects={dummyBoy}
              getProject={this.props.getProject}
            />
          </div>
          <div className="col s12 m4 pull-m8">
            <h5 className="center-align">Organizations</h5>
            <OrganizationResults
              searchResultOrgs={this.props.searchResults.orgs}
            />
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
          <Organization org={organization} key={index}/>
        )
      });
    }
    return(
      <div>
        <div>
          <h6>Organization Results</h6>
          <div className="collection hoverable">
            {org ? org : "No results to display"}
          </div>
        </div>
      </div>
    );
  }
});

var Organization = React.createClass({
  render: function () {
    var img = (this.props.org.img) ? "data:image/jpeg;base64," + this.props.org.img
        : "http://previews.123rf.com/images/kritchanut/kritchanut1406/kritchanut140600093/29213195-Male-silhouette-avatar-profile-picture-Stock-Vector-profile.jpg";
    return( <div className="org-card">
        <div className="collection-item avatar">
          <img className="image circle" src={img} />
          <span className="title right-align"><h4>{this.props.org.name}</h4></span>
          <p>{this.props.org.about}</p>
        </div>
      </div>
    );
  }
});

var ProjectResults = React.createClass({
  render: function () {
    return(
      <div className="row">
        <div className="col s12 m6 l4">
          <h6>Project Search Results</h6>
          <Project
            searchResultsProjects={this.props.searchResultsProjects}
            getProject={this.props.getProject}
          />
        </div>
      </div>
    );
  }
});

var Project = React.createClass({

  getProject: function() {
    this.props.getProject(this.props.searchResultsProjects._id);
  },


  render: function () {
    return(

      <div className="card hoverable">
        <div className="card-image">
          <img src="http://worldofgoodethiopia.org/yahoo_site_admin/assets/images/30050052.182123348_std.jpg" />
          <span className="card-title shadow">
            {this.props.searchResultsProjects.title}
          </span>
        </div>
        <div className="card-content">

          <h6>{this.props.searchResultsProjects.org}</h6>
          <div className="truncate">
            {this.props.searchResultsProjects.info}
          </div>
        </div>
        <div className="card-action">
          <p><Link className="waves-effect waves-light" onClick={this.getProject}>Read more...</Link></p>

        </div>
      </div>

    );
  }
});

var dummyBoy = {
    _id: "123",
    org: "World of Good Ethiopia",
    info: "One of the greatest caues of ill health in the third world continues to be caused by the lack of sanitary water sources. World of Good has put the improvement of water accessibility and sanitation high on our list, supporting water sanitation needs within our project area as we are able. Your donation designated to water sanitation will assist with both small scale plans such as hygiene courses to larger scale improvements such as community wells and well repairs - all beneficial in lessening the spread of disease.",
    start_date: "today",
    end_date: "tomorrow",
    status: "Pending",
    areas_of_focus: ["water", "sanitation", "children", "Zach"],
    amount: {
      goal: 10000,
      current: 100
    },
    // is_complete: false,
    title: "Create Sweet Water Wells",
    // faqs: [title: "What dis about?", description: "It's about some real stuff that helps people by giving them water that any human needs to drink to survive"],
    comments: [{
      comment: "Test Comment 1",
      date: "Some Date"
    }],
    updates: [{
      title: "Supplies Bought!",
      date: "today in a half",
      description: "We bought a pipe and a wrench with the 100 so far" }],

  };
