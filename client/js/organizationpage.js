"use strict";

var React = require('react');
import { History } from 'react-router';
var LocalStorageMixin = require('react-localstorage');

var Organization = exports.Organization = React.createClass({
  displayName: 'Organization',
  mixins: [ History, LocalStorageMixin ],
  componentDidMount: function() {
    $('.scrollspy').scrollSpy();
    $('.materialboxed').materialbox();
    $('.tabs-wrapper .row').pushpin({ top: $('.tabs-wrapper').offset(1000).top });
  },

  projects: {
    past: [{
      org: "Test Project Org",
      info: "Info testing part",
      start_date: "new years",
      end_date: "halloween",
      status: "Pending",
      areas_of_focus: [],
      amount: {
        goal: 3000,
        current: 1500
      }
    }, {
      org: "Test Project Org",
      info: "Info testing part",
      start_date: "new years",
      end_date: "halloween",
      status: "Pending",
      areas_of_focus: [],
      amount: {
        goal: 3000,
        current: 1500
      }
    }, {
      org: "Test Project Org",
      info: "Info testing part",
      start_date: "new years",
      end_date: "halloween",
      status: "Pending",
      areas_of_focus: [],
      amount: {
        goal: 3000,
        current: 1500
      }
    }],
    current: [{
      org: "Test Project Org",
      info: "Info testing part",
      start_date: "new years",
      end_date: "halloween",
      status: "Pending",
      areas_of_focus: [],
      amount: {
        goal: 3000,
        current: 1500
      }
    }, {
      org: "Test Project Org",
      info: "Info testing part",
      start_date: "new years",
      end_date: "halloween",
      status: "Pending",
      areas_of_focus: [],
      amount: {
        goal: 3000,
        current: 1500
      }
    }, {
      org: "Test Project Org",
      info: "Info testing part",
      start_date: "new years",
      end_date: "halloween",
      status: "Pending",
      areas_of_focus: [],
      amount: {
        goal: 3000,
        current: 1500
      }
    }]
  },

  render: function () {
    var aofs = this.props.currentOrganization.areas_of_focus.map(function (aof, index) {
      return (
        <div key={index} className="chip">
          <h6>{aof}</h6>
        </div>
      );
    });

    var pastProject = this.projects.past.map(function (project, index) {
      return (
        <div key={index}>
          <div>the org is {project.org}</div>
          <div>the info is {project.info}</div>
          <div>this is the start_date {project.start_date}</div>
          <div>the end_date {project.end_date}</div>
        </div>
      );
    });


    var currentProjects = this.projects.current.map(function (project, index) {
      return (
        <div key={index}>
          <div>the org is {project.org}</div>
          <div>the info is {project.info}</div>
          <div>this is the start_date {project.start_date}</div>
          <div>the end_date {project.end_date}</div>
        </div>
      );
    });

    return (
      <div className="container">
        <h1 className="center-align">
          {this.props.currentOrganization.name}
        </h1>
        <div className="row">
          <div className="col s12 m10 l10">
            <div className="row">
              <div className="col s12 m7">
                <img className="responsive-img materialboxed" src="https://c1.staticflickr.com/5/4140/4930996357_8c6f018343_z.jpg"/>
              </div>

              {/*Org Description*/}
              <div id="description" className="col s12 m5 center-align section scrollspy">
                <h6><i className="material-icons">location_on</i><pre>{this.props.currentOrganization.address}</pre></h6>
                <i className="material-icons">description</i>
                <h5> Description: {this.props.currentOrganization.about}</h5>
              </div>
            </div>

            {/*Additional Info*/}
            <div className="row">
              <div className="col s6 valign-wrapper">
                <h3 className="valign">
                  Additional info here about what the Org Cares about
                  Boom and there goes the dynamite
                </h3>
              </div>

              {/*Image 2*/}
              <div className="col s6">
                <img className="responsive-img materialboxed" src="https://c1.staticflickr.com/5/4116/4931019303_2f386bffb7_z.jpg"/>
              </div>

              {/*Areas of Focus*/}
              <div id="aofs" className="section scrollspy">
                <h4>Areas of focus:</h4>
                {aofs}
              </div>

              {/*Current Project*/}
              <div id="current-projects" className="section scrollspy">
                <h2>Our Current Projects:</h2>
                {currentProjects}
              </div>

              {/*Past Projects*/}
              <div id="past-projects" className="section scrollspy">
                <h2>Our Past Projects:</h2>
                <div>{pastProject}</div>
              </div>

              {/*Endorsements*/}
              <div id="endorsements" className="section scrollspy">
                <h2>Endorsements:</h2>
                <div>Various Endorsements</div>
              </div>

            </div>
          </div>
          <div className="col hide-on-small-only m2 l2">
            {/*ScrollSpy*/}
            <ScrollSpyListItems />
          </div>
        </div>
      </div>
    );
  }
});

var ScrollSpyListItems = React.createClass({
  render: function () {
    return(
      <div className="toc-wrapper pinned" >
        <div>
          <ul className="section table-of-contents">
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
