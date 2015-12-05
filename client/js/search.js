"use strict";
var React = require('react');
import {Navbar} from './navbar.js';
import { Link } from 'react-router';

var Search = exports.Search = React.createClass({
  render: function () {
    return (
      <div>
        <Navbar />
        <div className="row">
          <div className="col s5">
            Organization by Categories Selected
            <OrganizationResults />
          </div>

          <div className="col s7">
            Projects
          </div>

        </div>
      </div>
    );
  }
});

var OrganizationResults = React.createClass({
  render: function () {
    return(
      <div> 
        <div className="row">
          <div className="col s3">
            Search Tags
            <Tag />
          </div>

          <div className="col s9">
            Organization Cards
            <Organization />
          </div>

        </div>
      </div>
    );
  }
});

var Tag = React.createClass({
  render: function () {
    return(
      <div>
        <div className="chip">
          Tag
          <i className="material-icons">close</i>
        </div>
      </div>
    );
  }
});

var Organization = React.createClass({
  render: function () {
    return(
      <div>
        <div className="card small">
          <div className="card-image waves-effect waves-block waves-light">
            <img className="activator" src="http://worldofgoodethiopia.org/yahoo_site_admin/assets/images/30050052.182123348_std.jpg" />
          </div>
          <div className="card-content">
            <span className="card-title activator grey-text text-darken-4">World of Good Ehtiopia<i className="material-icons right">more_vert</i></span>
            <p><Link className="waves-effect waves-light" to="#">Go to Organization Page</Link></p>
          </div>
          <div className="card-reveal">
            <span className="card-title grey-text text-darken-4">World of Good Ethiopia<i className="material-icons right">close</i></span>
            <p>World of Good is a small non-profit organization headquartered in Junction City, Oregon dedicated to our mission:  "To improve the health, education and quality of life of impoverished individuals around the world - most specifically, but not limited to children, seniors and individuals with disabilities."</p>
          </div>
        </div>
      </div>
    );
  }
});

var Project = React.createClass({
  render: function () {
    return(
      <div>
        Project Results
      </div>
    );
  }
});
