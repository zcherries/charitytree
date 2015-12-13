import React from 'react';
import { Link } from 'react-router';
import { TagContainer, Tag } from './tag_container.js';
import { CausesInfo } from './causesinfo.js';
//var ReactIntl = require('react-intl');
//
//var IntlMixin       = ReactIntl.IntlMixin;
//var FormattedNumber = ReactIntl.FormattedNumber;

var Project = exports.Project = React.createClass ({
  //mixins: [IntlMixin],

  componentDidMount: function () {
    $('.materialboxed').materialbox();
    $('ul.tabs').tabs();
    $('ul.tabs').tabs('select_tab', 'tab_id');
  },

  render: function() {
    //console.log("Project/this.props.searchResults.projects: ", this.props.searchResults.projects);
    var project = this.props.searchResults.projects.filter(function(project){
      if(project._id === this.props.projectId) {
        return project;
      }
    }.bind(this));
    project = project[0];

    var needs;

    console.log("Project/render/project.needs_list:",project.needs_list);
    if (project.needs_list.length > 0) {
      needs = project.needs_list.map(function (need, index) {
        console.log("Project/render/needs/need:", need);
        return (
          <Needs
            key={index}
            title={need.title}
            description={need.description}
            cost={need.cost}
            quantity_needed={need.quantity_needed}
            number_purchased={need.number_purchased}
          />
        );
      }.bind(this));
    }

    var percentRaised = {width: (project.amount.current / project.amount.goal * 100) + "%"};

    return (
      <div>
        <div className="center-align">
          <h3>{project.title}</h3>
          <h4>{project.org}</h4>
        </div>

        <div className="row">
          <div className="col s12 m8">
            <img className="responsive-img materialboxed" src="http://worldofgoodethiopia.org/yahoo_site_admin/assets/images/30050052.182123348_std.jpg" />
          </div>
          <div className="col s12 m4">
            <h3>Goal: ${project.amount.goal}</h3>
            <h4>Progress: ${project.amount.current}</h4>
            <div className="progress">
              <div className="determinate" style={percentRaised}>
              </div>
            </div>
            <h5>Number of donors: {project.total_donors_participating}</h5>
            <h6>Status: {project.status}</h6>
          </div>
        </div>


        <div className="row">
          <div className="col s12 m4 push-m8">
            {needs ? needs : "No needs to display"}
          </div>
          <div className="col s12 m8 pull-m4">

            <div className="row">
              <div className="col s12">
                <ul className="tabs">
                  <li className="tab col s3"><a href="#description">Description</a></li>
                  <li className="tab col s3"><a href="#updates">Updates</a></li>
                  <li className="tab col s3"><a href="#comments">Comments</a></li>
                </ul>
              </div>
              <div id="description" className="col s12">{project.info}</div>
              <div id="updates" className="col s12">Updates</div>

              <div id="comments" className="col s12">Comments</div>
            </div>
          </div>
        </div>
     </div>
    );
  }
});

var Needs = React.createClass({

  render: function() {
    console.log("Needs/render/this.props:",this.props);
    return (
      <div className="card blue-grey darken-1">
        <div className="card-content white-text">
          <span className="card-title">{this.props.title}</span>
          <p>description: {this.props.description}</p>
          <p>cost: {this.props.cost}</p>
          <p>needed: {this.props.quantity_needed}</p>
          <p>purchased: {this.props.number_purchased}</p>
        </div>
        <div className="card-action">
          <a href="#">Buy Shoes for Kids</a>
        </div>
      </div>
    );
  }
});

