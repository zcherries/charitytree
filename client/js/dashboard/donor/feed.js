"use strict";
var React = require('react');
var ReactDOM = require('react-dom');
import { History } from 'react-router';
// var LocalStorageMixin = require('react-localstorage');
var feedData = [];
feeder.on('action', function(data) {
  console.log('Action triggered: ', data);
  feedData.push({ message: data.message, attachment: data.attachment });
});

feeder.on('getFeed', function(arrFeed) {
  console.log('Get Feed triggered: ', arrFeed);
  feedData = arrFeed || [];
});

var Feed = exports.Feed = React.createClass({
  getInitialState: function() {
    return {
      feedContent: []
    }
  },

  componentWillMount: function() {
    console.log('Feed Component is Mounting')
    this.updateFeed(feedData);
    // feeder.on('data', this.updateFeed);
  },

  componentWillUnmount: function(){
    console.log("Feed Component is unmounting")
    feeder.removeListener('action', this.updateFeed);
  },

  getFeed: function() {

  },

  updateFeed: function(data) {
    console.log('About to update feed with: ', data)
    this.setState({ feedContent: data });
  },

  render: function() {
    return (
      <div>
        <h5>Feed</h5>
        <ul>
          {this.state.feedContent.map(function(item, idx) {
            return <li key={idx}><span>{item.message}</span><span>{item.created_date}</span></li>
          })}
        </ul>
      </div>
    )
  }
});
