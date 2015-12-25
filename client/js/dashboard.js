"use strict";
var React = require('react');

import {OrgProfile} from './dashboard/org/profile.js';
import {Projects} from './dashboard/org/projects.js';
import {Media} from './dashboard/org/media.js';

import {DonorProfile} from './dashboard/donor/profile.js';
import {Feed} from './dashboard/donor/feed.js';

 import {History} from 'react-router';
 // var LocalStorageMixin = require('react-localstorage');

// feeder.on('feedUpdate', function(count) {
//   //show feed count
// });

var Dashboard = exports.Dashboard = React.createClass({
   displayName: 'Dashboard',
  //  mixins: [ History, LocalStorageMixin ],
  getInitialState: function() {
    return {
      data: {},
      userType: '',
      view: 'profile'
    }
  },
  componentWillMount: function() {
    this.props.isLoggedIn();
  },

  componentDidMount: function() {
    console.log('Dashboard Component is Mounted');
    this.getData();
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
        console.log("Response data: ", response);
        this.setState({ data: response.results, userType: response.userType, view: this.state.view });
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
        console.log("Org Info About: " + orgInfo.about);

        view = <OrgProfile update_db_state_prop={this.update_db_state_prop} orgInfo={orgInfo} />;
        break;
      case 'projects':
        view = <Projects update_db_state_prop={this.update_db_state_prop} projects={this.state.data.projects} />;
        break;
      case 'media':
        var media = {
          profile_img: this.state.data.profile_img,
          images: this.state.data.images,
          videos: this.state.data.videos
        }
        view = <Media username={this.state.data.username} media={media} update_db_state_prop={this.update_db_state_prop} />;
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
        <div className="view indent">{view}</div>
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
        <div className="view indent">{view}</div>
      </div>
    )
  },

  update_db_state_prop: function(prop, data) {
    var state = this.state.data;
    console.log('State before update: ', state[prop]);
    state[prop] = data;
    console.log('State: ', state);
    console.log('State after update: ', state[prop]);
    this.setState({ data: state });
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
        <div className="row">
          <ul id="slide-out" className="side-nav fixed waves-effect waves-light">
            <li className="valign-wrapper"><i className="material-icons left valign">person_pin</i><a href="#" onClick={this.goToPage}>Profile</a></li>
            <li className="valign-wrapper"><i className="material-icons left valign">perm_media</i><a href="#" onClick={this.goToPage}>Projects</a></li>
            <li className="valign-wrapper"><i className="material-icons left valign">video_library</i><a href="#" onClick={this.goToPage}>Media</a></li>
            <li className="valign-wrapper"><i className="material-icons left valign">stars</i><a href="#" onClick={this.goToPage}>Endorsements</a></li>
            <li className="valign-wrapper"><i className="material-icons left valign">supervisor_account</i><a href="#" onClick={this.goToPage}>Find Donors</a></li>
          </ul>
            <a href="#" data-activates="slide-out" className="button-collapse"><i className="mdi-navigation-menu"/></a>
        </div>
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
        <div className="row">
          <ul id="slide-out" className="side-nav fixed waves-effect waves-light">
            <li className="valign-wrapper"><i className="material-icons left valign">person_pin</i><a href="#" onClick={this.goToPage}>Profile</a></li>
            <li className="valign-wrapper"><i className="material-icons left valign">question_answer</i><a href="#" onClick={this.goToPage}>Feed</a></li>
            <li className="valign-wrapper"><i className="material-icons left valign">video_library</i><a href="#" onClick={this.goToPage}>Activity</a></li>
            <li className="valign-wrapper"><i className="material-icons left valign">stars</i><a href="#" onClick={this.goToPage}>Endorsements</a></li>
          </ul>
          <a href="#" data-activates="slide-out" className="button-collapse"><i className="mdi-navigation-menu medium"></i></a>
        </div>
      </div>
    )
  }
});
