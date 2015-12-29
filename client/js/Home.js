import React from 'react';
import { Link, History } from 'react-router';

import {Footer} from './footer.js';

exports.Home = React.createClass({
  updateInput: function (e) {
    this.props.updateInput(e.target.value);
  },

  clearInput: function (e) {
    this.props.updateInput("");
  },

  handleSearchSubmit: function (e) {
    e.preventDefault();
    this.props.handleSearchSubmit();
  },

  componentDidMount: function () {
    $('.parallax').parallax();
    $(".button-collapse").sideNav();
  },

  render: function () {
    return (
      <div>

        {/*Parallax*/}
        <div className="parallax-container">
          <div className="parallax">
            <img src="https://c1.staticflickr.com/5/4142/4931601202_92f9bb7152_b.jpg"/>
          </div>
          <div className="caption center-align ">
            <h3 className="shadow-white">See the lives changed by your donation!</h3>
            <h5 className="light grey-text text-lighten-3 shadow">Follow the impact of your money</h5>
            <Link className="waves-effect waves-light btn light-blue darken-3" to="/browse">Browse Categories</Link>
          </div>
        </div>

        <div className="section white">
          <p className="grey-text text-darken-3 lighten-3" />
          <div className="container">
            <div className="center-align">
              <h4> Search for a cause or Organization </h4>
            </div>
            <div className="center-align col s4">
              <form onSubmit={this.handleSearchSubmit} className="center-align col s4">
                <div className="center-align input-field col s4">
                  <input
                    id="search"
                    type="search"
                    placeholder="Search..."
                    value={this.props.searchText}
                    onChange={this.updateInput}
                    required />
                  {this.props.searchText ? <i className="material-icons black-text" onClick={this.clearInput}>close</i> : "" }
                </div>
              </form>
            </div>

            <div className="row center-align">

              <h1 className="center-align"> Make Giving Personal! </h1>

              <div className="col s4">
                <i className="material-icons large center blue-text accent-3">lock_outline</i>
                <h4>Find Organizations you can trust!</h4>
                <h6>Each organization on Charity tree is vetted and required to show you where your money is spent!</h6>
              </div>
              <div className="col s4">
                <i className="material-icons large center blue-text accent-3">toc</i>
                <h4>Be a part of a project!</h4>
                <h6>Donate to specific needs on projects locally and around the world!</h6>
              </div>
              <div className="col s4">
                <i className="material-icons large center blue-text accent-3">supervisor_account</i>
                <h4>Contribute in a meaningful way!</h4>
                <h6>See what your donation does through updates, pictures, video and more! No more wondering if your donation did any real good!</h6>
              </div>

            </div>
          </div>
        </div>

        <div className="parallax-container">
          <div className="parallax">
            <img src="https://c1.staticflickr.com/5/4073/4931587174_a40ebdf2f5_b.jpg"/>
          </div>
          <div className="caption left-align shadow-white">
            <h3 className="">“Real change, inspiring results!”</h3>
            <h5 className="valign left-align light grey-text text-lighten-3 shadow">Be a part of something great</h5>
          </div>
        </div>

        <div className="section grey lighten-4">
          <p className="grey-text text-darken-3 lighten-3" />
          <div className="container">
            <div className="row center-align">
              <h1 className="left-align"> What can YOU give?! </h1>
              <div className="col s6">
                <i className="material-icons large center">toc</i>
                <h4>Featured Projects!</h4>
                <h6>list ones here</h6>
              </div>
              {/*<div className="row">
                <div className="col s12 m2 l2">
                  <div className="center-align pinned" style={{maxWidth: "16%", zIndex: "100"}}>
                    <img className="materialboxed" src="http://labs.qnimate.com/portfolio-materialize/images/project.png" />
                    <img className="materialboxed" src="http://labs.qnimate.com/portfolio-materialize/images/project.png" />
                    <img className="materialboxed" src="http://labs.qnimate.com/portfolio-materialize/images/project.png" />
                  </div>
                  </div>
                </div>*/}
            </div>
          </div>
        </div>

        <div className="parallax-container">
          <div className="parallax">
            <img src="https://c1.staticflickr.com/5/4116/4931019303_2f386bffb7_b.jpg"/>
          </div>
          <div className="caption left-align shadow-white">
            <h3>Know where your money is going!</h3>
            <h5 className="light grey-text text-lighten-3 shadow">See the impact!</h5>
          </div>
        </div>

        {/*Footer*/}
        <Footer />
      </div>
    );
  }
});
