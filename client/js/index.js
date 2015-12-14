"use strict";
import React from 'react';
import { render } from 'react-dom';
import { Router, Route, Link, IndexRoute, Navigation } from 'react-router';
import { createHistory, useBasename } from 'history';

/*local imports*/
import {Browse} from './browsePage.js';
import {Footer} from './footer.js';
import {Navbar} from './navbar.js';
import {Search} from './search.js';
import {Project} from './project.js';
import {ProjectCreate} from './projectCreate.js';
import {Upload} from './upload.js';
import {Signup} from './signup.js';
import {Login} from './login.js';
import {Organization} from './organizationpage.js';

const history = useBasename(createHistory)({
  basename: '/'
});

const App = React.createClass({

  getInitialState: function () {
    return {
      searchText: "",
      searchCriteria: [],
      searchResults: [],
      projectId: ""
    };
  },
  updateSearchCriteria: function(tags) {
    this.setState({
      searchCriteria: tags
    })
  },

  navigateToSearchPage: function () {
    this.props.history.pushState(null, `/search`);
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
    this.setState({
      searchText: searchCriteria.join(" "),
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
        this.navigateToSearchPage();
        // console.log('Testing success time. Inside of success to AJAX')
      }.bind(this),
      error: function (xhr, status, err) {
        console.error(xhr, status, err.toString());
      }.bind(this)
    })
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

  render: function () {
    return (
      <div>
        <Navbar
          searchText={this.state.searchText}
          updateInput={this.updateInput}
          handleSearchSubmit={this.handleSearchSubmit}
        />
        {React.cloneElement(this.props.children,
          {
            searchText: this.state.searchText,
            searchCriteria: this.state.searchCriteria,
            searchResults: this.state.searchResults,
            projectId: this.state.projectId,
            handleSearchButton: this.handleSearchButton,
            handleSearchSubmit: this.handleSearchSubmit,
            updateSearchCriteria: this.updateSearchCriteria,
            removeBrowseTag: this.removeBrowseTag,
            removeSearchTag: this.removeSearchTag,
            getProject: this.getProject,
          }
        )}
      </div>
    );
  }
});

var Index = React.createClass({
  componentDidMount: function () {
    $('.parallax').parallax();
    $(".button-collapse").sideNav();
  },

  render: function() {
    return(
      <div>

        {/*Parallax*/}
        <div className="parallax-container">
          <div className="parallax">
            <img src="https://c1.staticflickr.com/5/4142/4931601202_92f9bb7152_b.jpg" />
          </div>
          <div className="caption center-align shadow-white">
            <h3>See the lives changed by your donation!</h3>
            <h5 className="light grey-text text-lighten-3 shadow">Follow the impact of your money</h5>
          </div>
        </div>

        <div className="section white">
          <div className="row container">

          </div>
          <p className="grey-text text-darken-3 lighten-3">
                    </p>
            <div className="row">

            <div className="col s4">
            <i className="material-icons">flash_on</i>
            Promo Content 1 goes here
            </div>
            <div className="col s4">
            Promo Content 2 goes here
            </div>
            <div className="col s4">
            Promo Content 3 goes here
            </div>

            </div>

        </div>

        <div className="parallax-container">
          <div className="parallax">
            <img src="https://c2.staticflickr.com/6/5477/10570079866_b622f2a732_b.jpg" />
          </div>
        </div>

        {/*Footer*/}
        <Upload />
        <Footer />
      </div>
    );
  }
});

render((
  <Router history={history}>
    <Route path="/" component={App}>
      <IndexRoute component={Index} />
      <Route path="Login" component={Login} />
      <Route path="organization" component={organization} />
      <Route path="Signup" component={Signup} />
      <Route path="browse" component={Browse} />
      <Route path="search" component={Search} />
      <Route path="project" component={Project} />
      <Route path="projectCreate" component={ProjectCreate} />
      <Route path="organization" component={Organization} />
    </Route>
  </Router>
), document.getElementById('app'));
      // <Route path="organization" component={Organization} />
