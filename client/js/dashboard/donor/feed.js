"use strict";
var React = require('react');
var ReactDOM = require('react-dom');
import { History } from 'react-router';
var LocalStorageMixin = require('react-localstorage');

var Feed = exports.Feed = React.createClass({
  componentDidMount: function() {
    this.getFeed();
  },

  getFeed: function() {

  },

  render: function() {
    return (
      <div></div>
    )
  }
});
