import React from 'react';
import { Link } from 'react-router';
import { TagContainer, Tag } from './tag_container.js';
import { CausesInfo } from './causesinfo.js';

var Project = exports.Project = React.createClass ({

  render: function() {
    console.log("1: ", this.props)
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
          <div className="col s12 m4 push-m8">
            <Needs
              searchResultsProjects={this.props.searchResults.projects}
              projectId={this.props.projectId}
            />
          </div>
          <div className="col s12 m8 pull-m4">
            <div className="row">
              <div className="col s12">
                <ul className="tabs">
                  <li className="tab col s3"><a className="active" href="#description">Description</a></li>
                  <li className="tab col s3"><a href="#faq">FAQ</a></li>
                  <li className="tab col s3"><a href="#comments">Comments</a></li>
                </ul>
              </div>
              <div id="description" className="col s12">Description</div>
              <div id="faq" className="col s12">FAQ</div>
              <div id="comments" className="col s12">Comments</div>
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

var Needs = exports.Needs = React.createClass({

  render: function() {
    var id = this.props.projectId;
    console.log(this.props)
    // var needs = this.props.searchResultsProjects.filter(function(id){
    //   if(this._id === id) {
    //     return this;
    //   }
    // }).needs_list.map(function(need, index) {
    //   return (
    //     <div className="card blue-grey darken-1">
    //       <div className="card-content white-text">
    //         <span className="card-title">{need.title}</span>
    //         <p>description: {need.description}</p>
    //         <p>cost: {need.cost}</p>
    //         <p>needed: {need.quantity_needed}</p>
    //         <p>purchased: {need.number_purchased}</p>
    //       </div>
    //       <div className="card-action">
    //         <a href="#">Buy Shoes for Kids</a>
    //       </div>
    //     </div>
    //   )
    // })

  return <div></div>
  }



})

