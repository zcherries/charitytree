"use strict";
var React = require('react');
import {Navbar} from './navbar.js';


var Search = exports.Search = React.createClass({
  render: function () {
    return (
      <div>
        <Navbar />
        <div className="row">
          <div className="col s5">
            Categories
            <Category />
          </div>

          <div className="col s7">
            Projects
          </div>

        </div>
      </div>
    );
  }
});

var Category = React.createClass({
  render: function () {
    return(
      <div> 
        <div className="row">
          <div className="col s5">
            Categories List
          </div>

          <div className="col s7">
            Category Cards
          </div>

        </div>
      </div>
    );
  }
});

var Project = React.createClass({
  render: function () {
    return(
      <div>
        Project Results
      </div>
    );
  }
});
