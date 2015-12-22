"use strict";
var React = require('react');
var ReactDOM = require('react-dom');
import { History } from 'react-router';
// var LocalStorageMixin = require('react-localstorage');
var feeder = io.connect('http://localhost:4000');
var feedData = [];

feeder.on('data', function(data) {
  feedData.push(data);
});

var Feed = exports.Feed = React.createClass({
  getInitialState: function() {
    return {
      feedItem: ''
    }
  },

  componentWillMount: function() {
    console.log('Feed Component is Mounting')
    feeder.emit('test', "Hello")
    this.updateFeed(feedData);
    // feeder.on('data', this.updateFeed);
  },

  componentWillUnmount: function(){
    console.log("Feed Component is unmounting")
    // feeder.removeListener('data', this.updateFeed);
  },

  getFeed: function() {

  },

  updateFeed: function(data) {
    console.log('About to update feed with: ', data)
    this.setState({ feedItem: data });
  },

  render: function() {
    return (
      <div>
        {this.state.feedItem}
        <ul>

        </ul>
      </div>
    )
  }
});
