/**
 * Created by Zach on 12/2/15.
 */
"use strict";
const React = require('react');
const ReactDOM = require('react-dom');

var HelloWorld = React.createClass({
  render: function() {
    return (
    <p>
    Hello, <input type="text" placeholder="Your name here" />!
        It is {this.props.date.toTimeString()}
    </p>
    );
  }
});


ReactDOM.render(
  <HelloWorld date={new Date()} />,
  document.getElementById('container')
);
//const RaisedButton = require('material-ui/lib/raised-button');
//let injectTapEventPlugin = require("react-tap-event-plugin");
//injectTapEventPlugin();
//
//const MyAwesomeReactComponent = React.createClass({
//  render() {
//    return (
//      <RaisedButton label="Default" />
//  );
//  },
//});