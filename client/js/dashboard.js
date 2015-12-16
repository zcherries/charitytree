"use strict";
var React = require('react');
var ReactDOM = require('react-dom');

var Dashboard = exports.Dashboard = React.createClass({
  componentDidMount: function() {
    this.getData();
  },

  getInitialState: function() {
    return {
      orgData: {},
      view: ''
    }
  },

  postData: function(formData) {
    formData.view = this.state.view;
    console.log("Form Data:", formData);
    $.ajax({
      method: 'POST',
      url: '/dashboard_data',
      data: formData,
      success:function(response){
        console.log("Post Success: ", response.results);
        //should send back view information in order to keep current view intact
        this.setState({ orgData: response.results });
      }.bind(this),
      error: function(error){
        console.log(error);
      }
    });
  },

  getData: function() {
    $.ajax({
      method: 'GET',
      url: '/dashboard_data',
      success:function(response){
        console.log('Dashboard Data: ', response.results);
        this.setState({ view: 'about', orgData: response.results });
      }.bind(this),
      error: function(error){
        console.log(error);
      }
    })
  },

  showOrgDashboard: function() {
  },

  showDonorDashboard: function() {
  },

  updatePageView: function(view) {
    this.setState({ view: view });
  },

  render: function() {
    var view;
    switch (this.state.view) {
      case 'about':
        var orgInfo = {
          name: this.state.orgData.name,
          username: this.state.orgData.username,
          about: this.state.orgData.about,
          aofs: this.state.orgData.areas_of_focus,
          address: this.state.orgData.address
        }
        view = <About postData={this.postData} orgInfo={orgInfo} />
        break;
      case 'projects':
        view = <Projects postData={this.postData} projects={this.state.orgData.projects} />
        break;
      case 'media':
        view = <Media postData={this.postData} media={this.state.orgData.media} />
        break;
      case 'endorsements':
        view = <Endorsements postData={this.postData} endorsements={this.state.orgData.endorsements} />
        break;
      default:
        view = <div><p>"Nothing to display"</p></div>
    }
    return (
      <div>
        <div className="db_menu"><DashboardMenu updatePageView={this.updatePageView} /></div>
        <div className="view">{view}</div>
      </div>
    )
  }
});

var DashboardMenu = React.createClass({
  goToPage: function(e) {
    e.preventDefault();
    this.props.updatePageView(e.target.innerHTML.toLowerCase());
  },

  render: function() {
    return (
      <div>
        <ul>
          <li><a href="#" onClick={this.goToPage}>About</a></li>
          <li><a href="#" onClick={this.goToPage}>Projects</a></li>
          <li><a href="#" onClick={this.goToPage}>Media</a></li>
          <li><a href="#" onClick={this.goToPage}>Endorsements</a></li>
        </ul>
      </div>
    )
  }
});

var About = React.createClass({
  getInitialState: function() {
    return {
      editing: false
    }
  },

  editPage: function(e) {
    e.preventDefault();
    this.setState({ editing: true });
  },

  handleSubmit: function(e) {
    e.preventDefault();
    var formData = {
      about: ReactDOM.findDOMNode(this.refs.about).value,
      areas_of_focus: (ReactDOM.findDOMNode(this.refs.aofs).value)
        .replace(/;\s/g,"/b$117/").split("/b$117/")
    }
    this.props.postData(formData);
  },

  displayMode: function() {
    return (
      <div>
        <h3>{this.props.orgInfo.name}</h3>
        <h6>{this.props.orgInfo.username}</h6>
        <p>{this.props.orgInfo.about}</p>
        <button onClick={this.editPage}>Edit</button>
        <ul>
          {this.props.orgInfo.aofs.map(function(aof) {
            return <li>aof</li>
          })};
        </ul>
      </div>
    )
  },

  editMode: function() {
    return (
      <div>
        <h3>{this.props.orgInfo.name}</h3>
        <h5>{this.props.orgInfo.username}</h5>
        <form onSubmit={this.handleSubmit}>
          <h5>About</h5>
          <textarea className="form-control" ref="about" defaultValue={this.props.orgInfo.about}></textarea>
          <h5>Areas of Focus</h5>
          <textarea className="form-control" ref="aofs" defaultValue={this.props.orgInfo.aofs}></textarea>
          <input type="submit" value="Submit" />
        </form>
      </div>
    )
  },

  render: function() {
    return (!this.state.editing) ? this.displayMode() : this.editMode();
  }
});

var Projects = React.createClass({
  render: function() {
    return (
      <div>
        <h3>Projects</h3>
        <ul>
          {this.props.projects.map(function(project) {
            return <li>project</li>
          })};
        </ul>
      </div>
    );
  }
});
