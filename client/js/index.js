"use strict";
import React from 'react';
import { render } from 'react-dom';
import { Router } from 'react-router';
import { createHistory, useBasename } from 'history';

/*local imports*/
//============Unauthenticated Routes===============/
import {App} from './App';
import {Navbar} from './navbar';
import {Footer} from './footer.js';
import {Home} from './Home';
import {Browse} from './browsePage.js';
import {Search} from './search.js';
import {Project} from './project.js';
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
      projectId: "",
      orgId: "",
      currentOrganization: null,
      currentProject: null
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



//============Authenticated Routes===============/
import {Dashboard} from './dashboard.js';
import {ProjectCreate} from './dashboard/projectCreate.js';
import {Upload} from './upload.js';
import auth from '../utils/auth';
import routes from '../config/routes';
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
    console.log('inside of setOrganization fcn in index.js');
    this.setState({
      searchText: this.state.searchText,
      searchCriteria: this.state.searchCriteria,
      searchResults: this.state.searchResults,
      projectId: this.state.projectId,
      orgId: this.state.orgId,
      currentOrganization: org,
      currentProject: this.state.currentProject
    });
    this.navigateToOrganizationPage();
  },

  render: function () {
    return (
      <div>
        <Navbar
          searchText={this.state.searchText}
          updateInput={this.updateInput}
          handleSearchSubmit={this.handleSearchSubmit}/>
        {React.cloneElement(this.props.children,
          {
            searchText: this.state.searchText,
            searchCriteria: this.state.searchCriteria,
            searchResults: this.state.searchResults,
            projectId: this.state.projectId,
            handleSearchButton: this.handleSearchButton,
            handleSearchSubmit: this.handleSearchSubmit,
            currentProject: this.state.currentProject,
            updateSearchCriteria: this.updateSearchCriteria,
            removeBrowseTag: this.removeBrowseTag,
            removeSearchTag: this.removeSearchTag,
            getProject: this.getProject,
            setProject: this.setProject,
            setOrganization: this.setOrganization,
            currentOrganization: this.state.currentOrganization
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
          <p className="grey-text text-darken-3 lighten-3"></p>
          <div className="container">

            <div className="row">

            <div className="col s4">
            <i className="material-icons">flash_on</i>
              Whatever plaid four loko, pabst roof party bitters irony williamsburg twee. Franzen lomo gentrify schlitz twee authentic migas brooklyn. Four dollar toast banh mi crucifix, mlkshk aesthetic chartreuse yuccie disrupt PBR&B knausgaard hella tofu vegan ramps. Neutra affogato sriracha ugh photo booth. Before they sold out keytar taxidermy, aesthetic raw denim truffaut austin readymade semiotics salvia brunch mumblecore celiac kickstarter. Marfa hashtag kogi whatever, heirloom schlitz ramps four dollar toast kickstarter portland vegan cliche +1 occupy. Before they sold out roof party cred neutra church-key, truffaut chillwave farm-to-table marfa cold-pressed.
            </div>
            <div className="col s4">
              Aesthetic tumblr lomo, banh mi squid williamsburg typewriter blog plaid. Wayfarers blue bottle chillwave direct trade plaid semiotics, bespoke skateboard authentic kombucha sustainable flannel deep v. Sustainable craft beer bicycle rights ramps kombucha poutine. Listicle bushwick hella normcore. Irony austin paleo, street art iPhone venmo PBR&B meggings readymade 3 wolf moon. Four dollar toast portland echo park marfa, blog distillery keytar. Migas organic health goth affogato cornhole, leggings cold-pressed put a bird on it keytar sriracha pinterest wayfarers.
            </div>
            <div className="col s4">
              Knausgaard PBR&B organic, pickled skateboard etsy freegan vice green juice tacos. Small batch YOLO gluten-free humblebrag etsy skateboard. Freegan normcore selvage stumptown williamsburg pinterest marfa. 90s ramps aesthetic, cliche farm-to-table kickstarter narwhal YOLO whatever small batch mustache. Schlitz mlkshk yr, etsy craft beer keffiyeh single-origin coffee. XOXO kickstarter flannel, fingerstache PBR&B tousled wayfarers kale chips ramps kitsch craft beer. Blue bottle put a bird on it deep v DIY, four loko retro distillery.
            </div>

            </div>
          </div>
        </div>

        <div className="parallax-container">
          <div className="parallax">
            <img src="https://c2.staticflickr.com/6/5477/10570079866_b622f2a732_b.jpg" />
          </div>
        </div>

const history = useBasename(createHistory)({
  basename: '/'
});

render(<Router history={history} routes={routes}/>, document.getElementById('app'));
