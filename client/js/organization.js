"use strict";

var React = require('react');
import { History } from 'react-router';
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
      org: null
    };
  },

  componentDidMount: function() {
    console.log('inside of orgpage at beg of cdm');
    $.ajax({
        url:'/organization_get/'+localStorage.currentOrganization,
        method: "GET",
        success: function (data) {
          console.log("on success in did with params.id and res.data is ", data.results);

          this.setState({
            org: data.results
          });
          console.log('inside of success of did and this.state.org ', this.state.org);

          //Initialize Materialize Components
          $('.materialboxed').materialbox();
          $('.tooltipped').tooltip({delay: 50});
          $('.scrollspy').scrollSpy();

        }.bind(this),
        error: function (xhr, status, err) {
          console.error(xhr, status, err.toString());
        }.bind(this)
      });

    console.log('inside of componentDidMount and state.org is ', this.state.org);

  },



  followOrg: function(e) {
    e.preventDefault();
    console.log('donor: ' + localStorage.token, 'org: ' + localStorage.currentOrgID);
    feeder.emit('follow', localStorage.token, localStorage.currentOrgID);
  },

  render: function () {

    if(this.state.org){
      {console.log('inside render of orgpage and this.state.org is', this.state.org);}

    var aofs = this.state.org.areas_of_focus.map(function (aof, index) {
      return (
        <div key={index} className="chip">
          <h6>{aof}</h6>
        </div>
      );
    });

    var pastProject = this.state.org.projects.map(function (project, index) {
      return (
        <div key={index}>
          <div>the org is {project._org}</div>
          <div>the info is {project.info}</div>
        </div>
      );
    });


    var currentProjects = this.state.org.projects.map(function (project, index) {
      var handleClickInside = this.handleClick.bind(this, project);
      return (
        <div key={index} onClick={handleClickInside}>
          <div>the org is {project.org}</div>
          <div>the info is {project.info}</div>
          <div>this is the start_date {project.start_date}</div>
          <div>the end_date {project.end_date}</div>
        </div>
      );
    },this);

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
            <a className="btn-floating btn-large btn tooltipped waves-effect waves-light light-blue darken-3" onClick={this.followOrg} data-position="left" data-delay="50" data-tooltip="Follow Organization"><i className="material-icons">group_add</i></a>
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
                <h2> Our Current Projects:</h2>
                <div className="left-align">{currentProjects}</div>
              </div>

              {/*Past Projects*/}
              <div id="past-projects" className="col s12 center-align section scrollspy">
                <i className="medium material-icons space-above">assignment_turned_in</i>
                <h2>Our Past Projects:</h2>
                <div className="left-align">{pastProject}</div>
              </div>

              {/*Endorsements*/}
              <div id="endorsements" className="col s12 center-align section scrollspy">
                <i className="medium material-icons space-above">verified_user</i>
                <h2> Endorsements:</h2>
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
    }else{
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
