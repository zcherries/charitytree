"use strict";

// Total Amount Donated
//Projects Sponsored

var React = require('react');

var Activity = exports.Activity = React.createClass({
  getInitialState: function() {
    return {
      action: '',
      org_to_endorse: ''
    }
  },

  endorse: function(org) {
    this.setState({ action: 'endorse', org_to_endorse: org });
  },

  endorsePage: function() {
    return <Endorsement org={this.state.org_to_endorse} />
  },

  defaultPage: function() {
    return (
      <div>
        <div>
          <h5>Total Amount Donated</h5>
        </div>
        <div>
          <h5>Projects Sponsored</h5>
          <ul>
            {this.props.sponsorships.map(function(project, idx) {
              return <li><ProjectBlurb project={project} /></li>
            })}
          </ul>
        </div>
        <div>
          <h5>Following</h5>
          <ul>
            {this.props.following.map(function(org, idx) {
              return <li><OrgBlurb org={org} endorse={this.endorse}/></li>
            })}
          </ul>
        </div>
      </div>
    )
  },

  render: function() {
    return (this.state.action === 'endorse') ? this.endorsePage() : this.defaultPage();
  }
});

var OrgBlurb = React.createClass({
  endorseOrg: function() {
    this.props.endorse(this.props.org._id);
  },

  render: function() {
    return (
      <div className="org-blurb card blue-grey darken-1">
        <div className="card-content white-text">
          <span className="card-title">{this.props.org.name}</span>
          <p>{"Description: " + this.props.org.about}</p>
          <p>{"Followers: " + this.props.org.followers.length}</p>
          <p>{"Endorsements: " + this.props.org.endorsements.length}</p>
          <p>{"Projects: " + this.props.org.projects.length}</p>
        </div>
        <button className="btn-endorse btn blue" onClick={this.endorseOrg}>Endorse</button>
      </div>
    )
  }
});

var ProjectBlurb = React.createClass({
  render: function() {
    return (
      <div className="project-blurb card blue-grey darken-1">
        <div className="card-content white-text">
          <span className="card-title">{this.props.project.title}</span>
          <p>{"Description: " + this.props.project.info}</p>
          <p>{"Start Date: " + this.props.project.start_date}</p>
          <p>{"End Date: " + this.props.project.end_date}</p>
          <p>{"Status: " + this.props.project.status}</p>
          <p>{"Amount Needed: " + this.props.project.amount.goal}</p>
          <p>{"Amount Raised: " + this.props.project.amount.current}</p>
          <p>{"Donors: " + this.props.project.total_donors_participating}</p>
          <p>{"Last Updated: " + this.props.project.last_updated}</p>
        </div>
      </div>
    )
  }
});

var Endorsement = exports.Endorsements = React.createClass({
  getInitialState: function() {
    return {
      title: '',
      review: ''
    }
  },

  updateTitle: function(e) {
    this.setState({ title: e.target.value });
  },

  updateReview: function(e) {
    this.setState({ review: e.target.value });
  },

  submitEndorsement: function() {
    var endorsement = {
      title: this.state.title,
      review: this.state.review,
      org: this.props.org,
      review_date: new Date()
    };

    console.log('Endorsement: ', endorsement);
    // $.ajax({
    //   method: 'POST',
    //   url: '/dashboard/donor/endorsement',
    //   data: endorsement,
    //   success: function(response) {
    //
    //   },
    //   error: function() {
    //
    //   }
    // });
  },

  render: function() {
    return (
      <div>
        <form className="">
          <input id="title" name="title" required onChange={this.updateTitle} />
          <textarea className="" onChange={this.updateReview} required></textarea>
          <button className="btn blue" onClick={this.submitEndorsement}>Submit</button>
        </form>
      </div>
    )
  }
});
