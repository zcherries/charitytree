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
          </div>

          <div className="col s7">
            Projects
          </div>

        </div>
      </div>
    );
  }
});
