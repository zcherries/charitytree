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