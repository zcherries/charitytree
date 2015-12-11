import React from 'react';
import { Link } from 'react-router';
import { TagContainer, Tag } from './tag_container.js';
import { CausesInfo } from './causesinfo.js';

var Project = exports.Project = React.createClass ({

  render: function() {

    return (
      <div>
        <div className="center-align">
          <h2>Water Project</h2>
          <h4>World of Good Ethiopia</h4>
        </div>

        <div className="row">
          <div className="col s12 m8">
            <img className="responsive-img materialboxed" src="http://worldofgoodethiopia.org/yahoo_site_admin/assets/images/30050052.182123348_std.jpg" />
          </div>
          <div className="col s12 m4">
            <h3>Goal: $10,000</h3>
            <h4>Progress: 1000</h4>
            <div className="progress">
              <div className="determinate" style={{width: "10%"}}>
              </div>
            </div>
            <h5>Number of donors: 25</h5>
            <h6>Status: In Progress</h6>
          </div>
        </div>

        <div className="row">
          <div className="col s12 m8">
            <div className="row">
              <div className="col s12">
                <ul className="tabs">
                  <li className="tab col s3"><a className="active" href="#test1">Description</a></li>
                  <li className="tab col s3"><a href="#test2">FAQ</a></li>
                  <li className="tab col s3"><a href="#test3">Comments</a></li>
                </ul>
              </div>
              <div id="test1" className="col s12">Description</div>
              <div id="test2" className="col s12">FAQ</div>
              <div id="test3" className="col s12">Comments</div>
            </div>
          </div>
          <div className="col s12 m4">
            <div className="card blue-grey darken-1">
              <div className="card-content white-text">
                <span className="card-title">Need</span>
                <p>We need 10,000 pairs of shoes</p>
              </div>
              <div className="card-action">
                <a href="#">Buy Shoes for Kids</a>
              </div>
            </div>
          </div>
        </div>


      </div>
    );
  }
});

