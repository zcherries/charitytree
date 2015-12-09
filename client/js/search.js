"use strict";
var React = require('react');

import { Link } from 'react-router';

var Search = exports.Search = React.createClass({

  render: function () {
    return (
      <div>
        <div className="row">
          <div className="col s12 m7 push-m5">
            <h5 className="center-align">Projects</h5>
            <h6>Search Tags</h6>
            <div style={{minHeight: 32 + 'px'}}>
              <pre>Search Results: {this.props.searchResults.text}</pre>
              <Tag />
            </div>
            <ProjectResults />
          </div>
          <div className="col s12 m5 pull-m7">
            <h5 className="center-align">Organizations</h5>
            <OrganizationResults />
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
        <div>
          <h6>Organization Results</h6>
          <ul className="collection hoverable">
            <Organization />
          </ul>
        </div>
      </div>
    );
  }
});

var Tag = exports.Tag = React.createClass({
  removeSelf: function(e) {
    console.log("e.target.textContent:",e.target.textContent);
    this.props.removeTag(e.target.textContent);
  },
  render: function () {
    return(
        <div
          className="chipx"
          textContent={this.props.text}
          onClick={this.removeSelf}
        > {/*custom chip*/}
          {this.props.text}
          <i className="material-icons">close</i>
        </div>
    );
  }
});

var Organization = React.createClass({
  render: function () {
    return(
      <div>
        <li className="collection-item avatar">
          <img src="http://worldofgoodethiopia.org/yahoo_site_admin/assets/images/30050007_0001.182123902_std.jpg" alt="" className="circle" />
          <span className="title right-align"><h4>World of Good Ethiopia</h4></span>
          <p>World of Good is a small non-profit organization headquartered in Junction City, Oregon dedicated to our mission:  "To improve the health, education and quality of life of impoverished individuals around the world - most specifically, but not limited to children, seniors and individuals with disabilities.
          </p>
        </li>
      </div>
    );
  }
});

var ProjectResults = React.createClass({
  render: function () {
    return(
      <div>
        <h6>Project Search Results</h6>
        <Project />
      </div>
    );
  }
});

var Project = React.createClass({
  render: function () {
    return(
      <div>
        <div className="card small hoverable">
          <div className="card-image waves-effect waves-block waves-light">
            <img className="activator" src="http://worldofgoodethiopia.org/yahoo_site_admin/assets/images/30050052.182123348_std.jpg" />
          </div>
          <div className="card-content">
            <span className="card-title activator grey-text text-darken-4">World of Good Ethiopia<i className="material-icons right">more_vert</i></span>
            <p><Link className="waves-effect waves-light" to="#">Go to Organization Page</Link></p>
          </div>
          <div className="card-reveal">
            <span className="card-title grey-text text-darken-4">World of Good Ethiopia<i className="material-icons right">close</i></span>
            <h5>Water</h5>
            <p>One of the greatest caues of ill health in the third world continues to be caused by the lack of sanitary water sources. World of Good has put the improvement of water accessibility and sanitation high on our list, supporting water sanitation needs within our project area as we are able.</p>

            <p>Your donation designated to water sanitation will assist with both small scale plans such as hygiene courses to larger scale improvements such as community wells and well repairs - all beneficial in lessening the spread of disease.</p>
          </div>
        </div>
      </div>
    );
  }
});

