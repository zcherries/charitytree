"use strict";
import React from 'react';
import { History } from 'react-router';
import moment from 'moment';
moment().format();
var LocalStorageMixin = require('react-localstorage');

var Organization = exports.Organization = React.createClass({
  displayName: 'Organization',
  mixins: [ History, LocalStorageMixin ],

  handleClick: function(project){
    console.log('inside of project handleClick');
    console.log('inside of handleClick project is', project);
    // console.log('inside of handleClick index is', index);
    localStorage.setItem('currProjObj', project._id);
    console.log('Project._id is ', project._id);
    this.props.navigateToProjectPage();
  },

  getInitialState: function(){
    return {
      org: null,
      following: false
    };
  },

  componentDidMount: function() {
    $.ajax({
        url:'/organization_get/' + localStorage.currentOrganization,
        method: "GET",
        success: function (data) {
          this.setState({
            org: data.results
          });

          //Initialize Materialize Components
          $('.materialboxed').materialbox();
          $('.tooltipped').tooltip({delay: 50});
          $('.scrollspy').scrollSpy();

        }.bind(this),
        error: function (xhr, status, err) {
          console.error(xhr, status, err.toString());
        }.bind(this)
      });
  },

  componentWillMount: function() {
    console.log('CWM fires: ', this.props.currentOrganization);
  },

  followOrg: function(e) {
    e.preventDefault();
    var org = this.state.org._id || this.props.currentOrganization._id;
    // feeder.emit('follow', localStorage.token, org);
    $.ajax({
      method: 'POST',
      url: '/organization/follow/' + org,
      success: function(response) {
        this.setState({ following: true });
      }.bind(this),
      error: function(xhr, status) {
        console.log("Error:", xhr, status);
      }.bind(this)
    });
  },

  render: function () {
    console.log('Token: ', localStorage.token);
    console.log('Org: ', this.state.org);
    if(this.state.org){
      var today = new Date();
      moment(this.state.org.projects[0].end_date).diff(today);

      var aofs = this.state.org.areas_of_focus.map(function (aof, index) {
        return (
          <div key={index} className="chip">
            <h6>{aof}</h6>
          </div>
        );
      }.bind(this));

      var currentProjects = this.state.org.projects.filter(function (project) {
        return moment(project.end_date).diff(today) > 0;
      }).map(function (project, index) {
        return (
          <li className="collection-item avatar" key={index} onClick={this.handleClick}>
            <img src={project.images[0] || "./images/FEATURE-Leaf-300_tcm18-150961.jpg"} className="circlex"/>
            <span className="title"><h5>{project.title}</h5></span>
            <div className="line-clamp line-clamp-2">{project.info}</div>

            <div className="row">
              <div className="col s6 space-above">
                <p><strong>Start Date:</strong></p><br/><p>{moment(project.start_date).format('MMMM D, YYYY')}</p></div>
              <div className="col s6 space-above">
                <p><strong>End Date:</strong></p><br/><p>{moment(project.end_date).format('MMMM D, YYYY')}</p></div>
            </div>
          </li>
        );
      }.bind(this));

      var pastProjects = this.state.org.projects.filter(function (project) {
        return moment(project.end_date).diff(today) < 0;
      }).map(function (project, index) {
        return (
          <li className="collection-item avatar" key={index} onClick={this.handleClick}>
            <img src={project.images[0] || "./images/FEATURE-Leaf-300_tcm18-150961.jpg"} className="circlex"/>
            <span className="title"><h5>{project.title}</h5></span>
            <div className="line-clamp line-clamp-2">{project.info}</div>

            <div className="row">
              <div className="col s6 space-above">
                <p><strong>Start Date:</strong></p><br/><p>{moment(project.start_date).format('MMMM D, YYYY')}</p></div>
              <div className="col s6 space-above">
                <p><strong>End Date:</strong></p><br/><p>{moment(project.end_date).format('MMMM D, YYYY')}</p></div>
            </div>
          </li>
        );
      }.bind(this));

      return (
        <div className="container">
          {/*Header*/}
          <div id="location" className="center-align section scrollspy">
            <h1>
              {this.state.org.name}
            </h1>
            {this.state.org.address ?
              <div>
                <i className="medium material-icons">room</i>
                <h5>{this.state.org.address}</h5>
              </div> : ""
            }
          </div>
          <div className="row">
            {/*Follow Button*/}
            <div className="col s2 push-s10 pinned" style={{top: "110px", zIndex: "1"}}>
              {
                !localStorage.token || this.state.org.followers.indexOf(localStorage.token) === -1
                  ? <a className="btn-floating btn-large btn tooltipped waves-effect waves-light light-blue darken-3" onClick={this.followOrg} data-position="left" data-delay="50" data-tooltip="Follow Organization"><i className="material-icons">group_add</i></a>
                  : <span className="btn blue">Following</span>
              }
            </div>

            <div className="col s12 m10 l11">
              <div className="row">

                {/*Image 1*/}
                <div className="col s12">
                  {/*<img className="image" src={this.state.org.profile_img.filename} />*/}
                </div>

                {/*Org Description*/}
                <div id="description" className="col s12 m10 push-m1 center-align section scrollspy flow-text">
                  <i className="medium material-icons space-above">description</i>
                  <h5> Description</h5>
                  <p>{this.state.org.about}</p>
                </div>

                {/*Additional Info*/}
                <div className="col s12 m5 l6">
                  <blockquote>Additional info here about what the Org Cares about. Boom and there goes the dynamite</blockquote>
                </div>

                {/*Image 2*/}
                <div className="col s12 m7 l6">
                  <img className="responsive-img materialboxed circle" src="https://c1.staticflickr.com/5/4116/4931019303_2f386bffb7_z.jpg"/>
                </div>
              </div>

              <div className="row">
                {/*Areas of Focus*/}
                <div id="aofs" className="col s12 m10 push-m1 pull-m1 center-align section scrollspy">
                  <i className="medium material-icons space-above">location_searching</i>
                  <h4> Areas of focus:</h4>
                  {aofs}
                </div>

                {/*Current Project*/}
                <div id="current-projects" className="col s12 center-align section scrollspy">
                  <i className="medium material-icons space-above">assignment_late</i>
                  <h2>Our Current Projects:</h2>
                  <ul className="collection">
                    {currentProjects.length > 0 ? currentProjects : <div>No projects to display</div>}
                  </ul>
                </div>

                {/*Past Projects*/}
                {pastProjects.length > 0 ?
                  (<div id="past-projects" className="col s12 center-align section scrollspy">
                    <i className="medium material-icons space-above">assignment_turned_in</i>
                    <h2>Our Past Projects:</h2>
                    <ul className="collection">
                      {pastProjects}
                    </ul>
                  </div>) : ""}

                {/*Endorsements*/}
                <div id="endorsements" className="col s12 center-align section scrollspy">
                  <i className="medium material-icons space-above">verified_user</i>
                  <h2>Endorsements:</h2>
                  <div className="left-align">Various Endorsements</div>
                </div>

              </div>
            </div>

            {/*ScrollSpy*/}
            <div className="col hide-on-small-only m2 l1">
              <ScrollSpyListItems
                address={this.state.org.address}
              />
            </div>
          </div>
        </div>
      );
    } else {
      return(
        <div>nothing to display</div>
        )
    }
  }
});

var ScrollSpyListItems = React.createClass({
  render: function () {
    return(
      <div className="toc-wrapper pinned" >
        <div>
          <ul className="section table-of-contents">
            {this.props.address ?
              <li>
                <a href="#location">
                  Location
                </a>
              </li> : ""
            }

            <li>
              <a href="#description">
                Description
              </a>
            </li>
            <li>
              <a href="#aofs">
                Areas of Focus
              </a>
            </li>
            <li>
              <a href="#current-projects">
                Current Projects
              </a>
            </li>
            <li>
              <a href="#past-projects">
                Past Projects
              </a>
            </li>
            <li>
              <a href="#endorsements">
                Endorsements
              </a>
            </li>
          </ul>
        </div>
      </div>
    );
  }
});
