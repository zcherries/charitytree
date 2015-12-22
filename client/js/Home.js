import React from 'react';

import {Footer} from './footer.js';

exports.Home = React.createClass({
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
          <div className="caption center-align shadow-white">
            <h3>See the lives changed by your donation!</h3>
            <h5 className="light grey-text text-lighten-3 shadow">Follow the impact of your money</h5>
          </div>
        </div>

        <div className="section white">
          <p className="grey-text text-darken-3 lighten-3" />
          <div className="container">

            <div className="row">
              <a className="waves-effect waves-light btn light-blue darken-3" onClick={this.props.navigateToBrowsePage}><i
                className="material-icons left">cloud</i>Find a Cause Now</a>

              <h1 className="center-align"> Making Giving Personal! </h1>

              <div className="col s4">
                <i className="material-icons large center">lock_outline</i>
                <h4>Find Organizations you can trust!</h4>
                <h6>Each organization on Charity tree is vetted and required to show you where your money is spent!</h6>

              </div>
              <div className="col s4">
                <i className="material-icons large center">toc</i>
                <h4>Be a part of a project!</h4>
                <h6>Donate specific needs on a project!</h6>
              </div>
              <div className="col s4">
                <i className="material-icons large center">supervisor_account</i>
                <h4>Contribute in a meaningful way!</h4>
                <h6>Charity tree is the closest thing to being there in person with the ability to see the impact of
                  your donation!</h6>
              </div>

            </div>
          </div>
        </div>

        <div className="parallax-container">
          <div className="parallax">
            <img src="https://c1.staticflickr.com/5/4073/4931587174_a40ebdf2f5_b.jpg"/>
          </div>
        </div>

        <div className="section grey">
          <p className="grey-text text-darken-3 lighten-3" />
          <div className="container">

            <div className="row">
              <a className="waves-effect waves-light btn light-blue darken-3" onClick={this.props.navigateToBrowsePage}><i
                className="material-icons left">cloud</i>Find a Cause</a>

              <h1 className="left-align"> What can YOU give?! </h1>


              <div className="col s6">
                <i className="material-icons large center">toc</i>
                <h4>Featured Projects!</h4>
                <h6>list ones here</h6>
              </div>
              <div className="col s4">
              </div>

            </div>
          </div>
        </div>

        <div className="parallax-container">
          <div className="parallax">
            <img src="https://c1.staticflickr.com/5/4116/4931019303_2f386bffb7_b.jpg"/>
          </div>
        </div>

        {/*Footer*/}
        <Footer />
      </div>
    );
  }
});
