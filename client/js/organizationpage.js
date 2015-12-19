"use strict";

var React = require('react');
import { History } from 'react-router';
var LocalStorageMixin = require('react-localstorage');

var Organization = exports.Organization = React.createClass({
  displayName: 'Organization',
  mixins: [ History, LocalStorageMixin ],
  componentDidMount: function() {
    $('.materialboxed').materialbox();
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

    var aofs = this.props.currentOrganization.areas_of_focus.map(function (aof, index) {
      return (
        <div key={index} className="chip">
          <h6>{aof}</h6>
        </div>
      );
    });

    return (
      <div className="container">
        <h1 className="center-align">
          {this.props.currentOrganization.name}
        </h1>
        <div className="row">
          <div className="col s12 m7">
            <img className="responsive-img materialboxed" src="https://c1.staticflickr.com/5/4140/4930996357_8c6f018343_z.jpg"/>
          </div>
          <div className="col s12 m5 center-align">
            <i className="material-icons">description</i>
            <h5> Description: {this.props.currentOrganization.about}</h5>
            <h6><i className="material-icons">location_on</i><pre>{this.props.currentOrganization.address}</pre></h6>
          </div>
        </div>

        <div className="row">
          <div className="col s6 valign-wrapper">
            <h3 className="valign">
              Additional info here about what the Org Cares about
              Boom and there goes the dynamite
            </h3>
          </div>

          <div className="col s6">
            <img className="responsive-img materialboxed" src="https://c1.staticflickr.com/5/4116/4931019303_2f386bffb7_z.jpg"/>
          </div>
        </div>


        <div className="container">
          <h4>
            Areas of focus:
            {aofs}
          </h4>
        </div>

        <div className="row">
          <h2>Our currrent Projects are</h2>
          {currentProjects}
        </div>
        <div>
          <h2>Our Past Projects</h2>
          <div>{pastProject}</div>
        </div>

        <div>
          <h2>Endorsements</h2>
          <div>Various Endorsements</div>
        </div>
      </div>
    );
  }
});
