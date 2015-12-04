"use strict";
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link } from 'react-router';
import { Search } from './search/search.js';

const App = React.createClass({
  render: function() {
    let date = new Date();
    return (
    <p>
    Hello, <input type="text" placeholder="Your name here" />!
        It is {date.toTimeString()}
    </p>
    );
  }
});

ReactDOM.render((
  <Router>
    <Route path="/" component={App}>
    </Route>
  </Router>
), document.getElementById('app'));