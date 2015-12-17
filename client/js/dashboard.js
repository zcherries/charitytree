"use strict";
var React = require('react');

var Dashboard = exports.Dashboard = React.createClass({
  componentDidMount: function() {
    this.getData();
  },

  getInitialState: function() {
    return {
      orgData: [],
      view: 'about'
    }
  },

  getData: function() {
    var self = this;
    $.ajax({
      method: 'GET',
      url: '/dashboard',
      success:function(response){
        self.setState({ orgData: response.data });
      },
      error: function(error){
        console.log(error);
      }
    })
  },

  updatePageView: function(view) {
    this.setState({ view: view });
  },

  render: function() {
    if(this.state.view === 'about') {
      return (
        <div>
          <h2>{this.state.orgData.name}</h2>
          <h3>{this.state.orgData.username}</h3>
          <p>{this.state.orgData.about}</p>
        </div>
      );
      var orgInfo = {
        name: this.state.orgData.name,
        username: this.state.orgData.username,
        about: this.state.orgData.about,
        aofs: this.state.orgData.areas_of_focus,
        address: this.state.orgData.address
      }
      return ( <div><DashboardMenu updatePageView={this.updatePageView} /><About orgInfo={orgInfo} /></div> )
    } else  if (this.state.view === 'projects') {
      return ( <div><DashboardMenu updatePageView={this.updatePageView} /><Projects projects={this.state.orgData.projects} /></div> )
    } else if (this.state.view === 'media') {
      return ( <div><DashboardMenu updatePageView={this.updatePageView} /><Media media={this.state.orgData.media} /></div> )
    } else if (this.state.view === 'endorsements') {
      return ( <div><DashboardMenu updatePageView={this.updatePageView} /><Endorsements endorsements={this.state.orgData.endorsements} /></div> )
    }
    return <div><p>"Nothing to display"</p></div>
  }
});

var DashboardMenu = React.createClass({
  goToPage: function(e) {
    console.log("Clicked list item: ", e);
    this.props.updatePageView();
  },

  render: function() {
    return (
      <div>
        <ul>
          <li onClick={this.goToPage}>'About'</li>
          <li onClick={this.goToPage}>'Projects'</li>
          <li onClick={this.goToPage}>'Media'</li>
          <li onClick={this.goToPage}>'Endorsements'</li>
        </ul>
      </div>
    )
  }
});

var About = React.createClass({
  render: function() {
    return (
      <div>
        <h2>{this.props.orgInfo.name}</h2>
        <h3>{this.props.orgInfo.username}</h3>
        <p>{this.props.orgInfo.about}</p>
        <ul>
          {this.props.orgInfo.aofs.map(function(aof) {
            return <li>aof</li>
          })};
        </ul>
      </div>
    );
  }
});
