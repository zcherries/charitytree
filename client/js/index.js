"use strict";
import React from 'react';
import { render } from 'react-dom';
import { Router, Route, Link, IndexRoute, Navigation } from 'react-router';
import { createHistory, useBasename } from 'history';

/*local imports*/
import {Browse} from './browsePage.js';
import {Footer} from './footer.js';
import {Navbar} from './navbar.js';
import {Search} from './search.js';


const history = useBasename(createHistory)({
  basename: '/'
});

const App = React.createClass({

  navigateToSearchPage () {
    this.props.history.pushState(null, `/search`);
  },

  getInitialState: function () {
    return {
      searchText: "",
      searchResults: []
    };
  },

  handleInput: function (searchText) {
    this.setState({
      searchText: searchText
    });
  },

  handleSearch: function () {
    var searchArr = this.state.searchText.split(" ");
    console.log("handleSearch: searchArr",searchArr);
    $.ajax({
      url: "/post_search",
      dataType: 'json',
      method: "Post",
      data: {aofs: searchArr},
      success: function (data) {
        console.log("DB Search response data",data);
        this.setState({
          searchText: this.state.searchText,
          searchResults: data.results
        });
          this.navigateToSearchPage();
      }.bind(this),
      error: function (xhr, status, err) {
        console.error(xhr, status, err.toString());
      }.bind(this)
    })
  },

  render: function () {
    return (
      <div>
        <Navbar
          searchText={this.state.searchText}
          onSearchInput={this.handleInput}
          onSearchSubmit={this.handleSearch}
        />
        {React.cloneElement(this.props.children, {searchResults: this.state.searchResults})}
      </div>
    );
  }
});

var Index = React.createClass({
  render: function() {
    return(
      <div>

        {/*Parallax*/}
        <div className="parallax-container">
          <div className="parallax">
            <img src="https://c1.staticflickr.com/5/4142/4931601202_92f9bb7152_b.jpg" />
          </div>
          <div className="caption center-align">
            <h3>See the lives changed by your donation!</h3>
            <h5 className="light grey-text text-lighten-3">Follow the impact of your money</h5>
          </div>
        </div>

        <div className="section white">
          <div className="row container">

          </div>
          <p className="grey-text text-darken-3 lighten-3">
                    </p>
            <div className="row">

            <div className="col s4">
            <i className="material-icons">flash_on</i>
            Promo Content 1 goes here
            Promo Content 1 goes here
            Promo Content 1 goes here
            Promo Content 1 goes here
            Promo Content 1 goes here
            Promo Content 1 goes here
            Promo Content 1 goes here
            Promo Content 1 goes here
            Promo Content 1 goes here
            </div>
            <div className="col s4">
            Promo Content 2 goes here
            </div>
            <div className="col s4">
            Promo Content 3 goes here
            </div>

            </div>

        </div>

        <div className="parallax-container">
          <div className="parallax">
            <img src="https://c2.staticflickr.com/6/5477/10570079866_b622f2a732_b.jpg" />
          </div>
        </div>

        {/*Footer*/}
        <Footer />
      </div>
    );
  }
});

render((
  <Router history={history}>
    <Route path="/" component={App}>
      <IndexRoute component={Index} />
      <Route path="browse" component={Browse} />
      <Route path="search" component={Search}
      />
    </Route>
  </Router>
), document.getElementById('app'));
