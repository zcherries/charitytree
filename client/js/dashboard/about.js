"use strict";
var React = require('react');
var ReactDOM = require('react-dom');

var About = exports.About = React.createClass({
  getInitialState: function() {
    return {
      editing: false,
      orgInfo: {}
    }
  },

  update: function(formData) {
    console.log("Form Data:", formData);
    $.ajax({
      method: 'POST',
      url: '/dashboard_data/about',
      data: formData,
      success:function(response) {
        console.log("Post Success: ", response.results);
        this.setState({ orgInfo: response.results, editing: false });
      }.bind(this),
      error: function(error){
        console.log(error);
      }
    });
  },

  editPage: function(e) {
    e.preventDefault();
    this.setState({ editing: true });
  },

  handleSubmit: function(e) {
    e.preventDefault();
    var formData = {
      about: ReactDOM.findDOMNode(this.refs.about).value,
      areas_of_focus: (ReactDOM.findDOMNode(this.refs.aofs).value).trim()
        .replace(/;\s*|\r\n|\r|\n/g,"/b$117/").split("/b$117/")
    }
    this.update(formData);
  },

  displayMode: function() {
    var orgInfo = Object.keys(this.state.orgInfo).length ? this.state.orgInfo : this.props.orgInfo;
    console.log(orgInfo.areas_of_focus.join("; "));
    return (
      <div className="float-left">
        <h3>{orgInfo.name}</h3>
        <h6>{orgInfo.username}</h6>
        <p>{orgInfo.about}</p>
        <ul>
          {orgInfo.areas_of_focus.map(function(aof, idx) {
            return <li key={idx}>{aof}</li>
          })}
        </ul>
        <button onClick={this.editPage}>Edit</button>
      </div>
    )
  },

  editMode: function() {
    var orgInfo = Object.keys(this.state.orgInfo).length ? this.state.orgInfo : this.props.orgInfo;
    return (
      <div className="float-left">
        <h3>{orgInfo.name}</h3>
        <h5>{orgInfo.username}</h5>
        <form onSubmit={this.handleSubmit}>
          <h5>About</h5>
          <textarea className="form-control" ref="about" defaultValue={orgInfo.about}></textarea>
          <h5>Areas of Focus</h5>
          <textarea className="form-control" ref="aofs" defaultValue={orgInfo.areas_of_focus.join("; ")}></textarea>
          <input type="submit" value="Submit" />
        </form>
      </div>
    )
  },

  render: function() {
    return (!this.state.editing) ? this.displayMode() : this.editMode()
  }
});
