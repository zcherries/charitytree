import React from 'react';
import { Link, History } from 'react-router';
var LocalStorageMixin = require('react-localstorage');

import auth from '../utils/auth.js';
console.log("App/auth.loggedIn():",auth.loggedIn());
import {Navbar} from './navbar';

exports.App = React.createClass({
  mixins: [LocalStorageMixin, History],

  getInitialState: function () {
    return {
      loggedIn: auth.loggedIn(),
      searchText: "",
      searchCriteria: [],
      searchResults: [],
      projectId: "",
      orgId: "",
      currentOrganization: null,
      currentProject: null,
      userType: ''
    };
  },

  setUserType: function(e) {
    console.log(e.target.value);
    this.setState( {userType: e.target.value });
    this.props.history.pushState(null, `/signup`);

  },

  updateAuth(loggedIn) {
    this.setState({
      loggedIn: !!loggedIn
    });
  },

  componentWillMount() {
    auth.onChange = this.updateAuth;
    auth.login();
  },

  componentDidMount: function () {
    if (this.state.searchText && window.location.pathname === "/search") {
      this.handleSearchSubmit();
    }
  },

  updateSearchCriteria: function(tags) {
    this.setState({
      searchCriteria: tags
    })
  },

  navigateToOrganizationPage: function () {
    this.props.history.pushState(null, `/organization`);
  },

  navigateToProjectPage: function () {
    this.props.history.pushState(null, `/project`);
  },

  updateInput: function (searchText) {
    this.setState({
      searchText: searchText
    });
  },

  removeBrowseTag: function(tagName) {
    var searchCriteria = this.state.searchCriteria.slice();
    var tagIdx = searchCriteria.indexOf(tagName);
    searchCriteria.splice(tagIdx, 1);
    this.setState({
      searchCriteria: searchCriteria
    });
  },

  removeSearchTag: function(tagName) {
    var searchCriteria = this.state.searchCriteria.slice();
    var tagIdx = searchCriteria.indexOf(tagName);
    searchCriteria.splice(tagIdx, 1);
    var searchText = "";
    console.log("/searchCriteria.length:",searchCriteria.length);
    if (searchCriteria.length > 0) {
      searchText = searchCriteria.join(" ");
    }
    this.setState({
      searchText: searchText,
      searchCriteria: searchCriteria
    });
    var self = this;
    var i = setInterval(function () {
      if (searchCriteria === self.state.searchCriteria) {
        clearInterval(i);
        console.log("App/rST/self.state.searchCriteria:",self.state.searchCriteria);
        console.log("App/rST/self.state.searchText:",self.state.searchText);
        self.handleSearchSubmit();
      }
    }, 100);
  },

  handleSearchButton: function (searchText) {
    console.log("App/hSS/searchText:",searchText);
    this.setState({
      searchText: searchText
    });
    var self = this;
    var i = setInterval(function () {
      if (searchText === self.state.searchText) {
        clearInterval(i);
        console.log("App/hSS/this.state.searchText:",self.state.searchText);
        self.handleSearchSubmit();
      }
    }, 100);
  },

  handleSearchSubmit: function () {
    if (this.state.searchText) {
      var searchCriteria = this.state.searchText.split(" ");
      console.log("App/hSS/: searchCriteria",searchCriteria);
      $.ajax({
        url: "/post_search",
        // dataType: 'json',
        method: "Post",
        data: {aofs: searchCriteria},
        success: function (data) {
          this.setState({
            searchText: this.state.searchText,
            searchCriteria: searchCriteria,
            searchResults: data.results
          });
          this.props.history.pushState(null, `/search`);

          // console.log('Testing success time. Inside of success to AJAX')
        }.bind(this),
        error: function (xhr, status, err) {
          console.error(xhr, status, err.toString());
        }.bind(this)
      });
    } else {
      this.setState({
        searchText: this.state.searchText,
        searchCriteria: [],
        searchResults: []
      });
    }
  },

  getProject: function(projectId) {
    this.setState({
      projectId: projectId
    });
    var self = this;
    var i = setInterval(function () {
      if (projectId === self.state.projectId) {
        clearInterval(i);
        console.log("App/gP/this.state.projectId:",self.state.projectId);
        self.props.history.pushState(null, `/project`);
      }
    }, 100);
  },

  setProject: function(project){
    this.setState({
      searchText: this.state.searchText,
      searchCriteria: this.state.searchCriteria,
      searchResults: this.state.searchResults,
      projectId: this.state.projectId,
      orgId: this.state.orgId,
      currentOrganization: this.state.currentOrganization,
      currentProject: project
    });
    this.navigateToProjectPage();
  },

  setOrganization: function(org){
    console.log("App/sO/org:",org);
    this.setState({
      searchText: this.state.searchText,
      searchCriteria: this.state.searchCriteria,
      searchResults: this.state.searchResults,
      projectId: this.state.projectId,
      orgId: this.state.orgId,
      currentOrganization: org
    });
    this.navigateToOrganizationPage();
  },

  render: function () {
    return (
      <div>
        <Navbar
          loggedIn={this.state.loggedIn}
          searchText={this.state.searchText}
          updateInput={this.updateInput}
          handleSearchSubmit={this.handleSearchSubmit}/>
        {this.props.children && React.cloneElement(this.props.children,
          {
            //State Props
            searchText: this.state.searchText,
            searchCriteria: this.state.searchCriteria,
            searchResults: this.state.searchResults,
            projectId: this.state.projectId,
            currentOrganization: this.state.currentOrganization,
            userType: this.state.userType,
            currentProject: this.state.currentProject,
            //Functions
            handleSearchButton: this.handleSearchButton,
            handleSearchSubmit: this.handleSearchSubmit,
            updateSearchCriteria: this.updateSearchCriteria,
            removeBrowseTag: this.removeBrowseTag,
            removeSearchTag: this.removeSearchTag,
            getProject: this.getProject,
            setProject: this.setProject,
            setOrganization: this.setOrganization,
            setUserType: this.setUserType
          }
        )}
      </div>
    );
  }
});
