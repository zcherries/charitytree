"use strict";
var React = require('react');
var ReactDOM = require('react-dom');
import { History } from 'react-router';
// var LocalStorageMixin = require('react-localstorage');

var Feed = exports.Feed = React.createClass({
  getInitialState: function() {
    return {
      feedContent: feedData
    }
  },

  componentWillMount: function() {
    console.log('Feed Component is Mounting')
    this.setState({ feedContent: feedData });
  },

  render: function() {
    return (
      <div>
        <h5>Feed</h5>
        <ul className="feed">
          {this.state.feedContent.map(function(item, idx) {
            return <li key={idx}>
              <span>{this.props.username !== item.user ? item.user : "You"}</span>
              <span>{item.message}</span>
              <span>{item.created_date}</span>
              <span>{item.attachment}</span>
              </li>
          }.bind(this))}
        </ul>
      </div>
    )
  }
});
