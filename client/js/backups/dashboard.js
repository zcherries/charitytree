"use strict";
var React = require('react');
var ReactDOM = require('react-dom');

import {OrgProfile} from './dashboard/org/profile.js';
import {Projects} from './dashboard/org/projects.js';
import {Media} from './dashboard/org/media.js';

import {DonorProfile} from './dashboard/donor/profile.js';
import {Feed} from './dashboard/donor/feed.js';

var Dashboard = exports.Dashboard = React.createClass({
  componentDidMount: function() {
    this.getData();
  },

  getInitialState: function() {
    return {
      data: {},
      userType: '',
      view: ''
    }
  },

  getData: function() {
    console.log('Making AJAX request to server')
    $.ajax({
      method: 'GET',
      beforeSend: function(request) {
        request.setRequestHeader("Authority", localStorage.token);
      },
      url: '/dashboard_data',
      success: function(response) {
        console.log("Response data: ", response.results);
        this.setState({ data: response.results, userType: response.userType, view: 'profile' });
      }.bind(this),
      error: function(xhr, status, error){
        if (xhr.readyState == 0 || xhr.status == 0) {
          console.log('Not really an error');
          return;
        }
        else
          console.log("Dashboard/getData/error", xhr, status, error);
      }.bind(this)
    });
  },

  showOrgDashboard: function() {
    var view;
    switch (this.state.view) {
      case 'profile':
        var orgInfo = {
          name: this.state.data.name,
          username: this.state.data.username,
          about: this.state.data.about,
          areas_of_focus: this.state.data.areas_of_focus,
          address: this.state.data.address
        };
        console.log("About: " + orgInfo.about);
        view = <OrgProfile postData={this.postData} orgInfo={orgInfo} />;
        break;
      case 'projects':
        view = <Projects postData={this.postData} projects={this.state.data.projects} />;
        break;
      case 'media':
        var media = {
          profile_img: this.state.data.profile_img,
          content: this.state.data.media
        }
        view = <Media postData={this.postData} media={media} />;
        break;
      case 'endorsements':
        view = <Endorsements postData={this.postData} endorsements={this.state.data.endorsements} />;
        break;
      default:
        view = <div></div>
    }
    return (
      <div>
        <div className="db_menu"><OrgDashboardMenu updatePageView={this.updatePageView} /></div>
        <div className="view">{view}</div>
      </div>
    )
  },

  showDonorDashboard: function() {
    var view;
    switch (this.state.view) {
      case 'profile':
        var donorInfo = {
          name: this.state.data.name,
          username: this.state.data.username,
          email: this.state.data.email,
          areas_of_focus: this.state.data.areas_of_focus,
          profile_img: this.state.data.profile_img
        };
        view = <DonorProfile postData={this.postData} donorInfo={donorInfo} />;
        break;
      case 'feed':
        view = <Feed postData={this.postData} feed={this.state.data.projects} />;
        break;
      case 'activity':
        view = <Activity orgs_followed={this.state.data.orgs_followed} sponsorships={this.state.data.sponsored_projects} />;
        break;
      case 'endorsements':
        view = <Endorsements postData={this.postData} endorsements={this.state.data.endorsements} />;
        break;
      default:
        view = <div></div>
    }
    return (
      <div>
        <div className="db_menu"><DonorDashboardMenu updatePageView={this.updatePageView} /></div>
        <div className="view">{view}</div>
      </div>
    )
  },

  updatePageView: function(view) {
    console.log(view);
    this.setState({ view: view });
  },

  render: function() {
    if (this.state.userType === 'organization') {
      return this.showOrgDashboard();
    } else if (this.state.userType === 'donor') {
      return this.showDonorDashboard();
    }
    return <div></div>
  }
});

var OrgDashboardMenu = React.createClass({
  goToPage: function(e) {
    e.preventDefault();
    this.props.updatePageView(e.target.innerHTML.toLowerCase());
  },

  render: function() {
    return (
      <div>
        <ul>
          <li><a href="#" onClick={this.goToPage}>Profile</a></li>
          <li><a href="#" onClick={this.goToPage}>Projects</a></li>
          <li><a href="#" onClick={this.goToPage}>Media</a></li>
          <li><a href="#" onClick={this.goToPage}>Endorsements</a></li>
          <li><a href="#" onClick={this.goToPage}>Find Donors</a></li>
        </ul>
      </div>
    )
  }
});

var DonorDashboardMenu = React.createClass({
  goToPage: function(e) {
    e.preventDefault();
    this.props.updatePageView(e.target.innerHTML.toLowerCase());
  },

  render: function() {
    return (
      <div>
        <ul>
          <li><a href="#" onClick={this.goToPage}>Profile</a></li>
          <li><a href="#" onClick={this.goToPage}>Feed</a></li>
          <li><a href="#" onClick={this.goToPage}>Activity</a></li>
          <li><a href="#" onClick={this.goToPage}>Endorsements</a></li>
        </ul>
      </div>
    )
  }
});

ReactDOM.render(<Dashboard />, document.getElementById('dashboard'));
