"use strict";
import React from 'react';
import { render } from 'react-dom';
import { Router, Route, Link, IndexRoute } from 'react-router';
import { createHistory, useBasename } from 'history';

/*local imports*/
import {Browse} from './browsePage.js';
import {Options} from './browsePage.js';
import {Footer} from './footer.js';
import {Navbar} from './navbar.js';
import {Search} from './search.js';


const history = useBasename(createHistory)({
  basename: '/'
});

const App = React.createClass({

  test: 'testing',

  getInitialState: function () {
    return {
      searchText: "",
      searchResults: {text:"we have data"}
    };
  },

  handleInput: function (searchText) {
    this.setState({
      searchText: searchText
    });
  },

  handleSearch: function () {
    var searchArr = this.state.searchText.split(" ");
    console.log("searchArr",searchArr);
    $.ajax({
      url: 'search',
      method: 'POST',
      dataType: 'json',
      data: searchArr,
      success: function (data) {
        console.log("search results:",data);
        this.setState({
          searchText: this.state.searchText,
          searchResults: data.results
        });

        console.log("DB Search response data",data.results);
      }.bind(this),
      error: function (xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    })
  },

  render: function () {
    return (
      <div>
    {/*Navbar was here*/}
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
          <div className="parallax"><img src="http://www.muslimpress.com/wp-content/uploads/2015/09/45.jpg" /></div>
        </div>
        <div className="section white">
          <div className="row container">
            <h2 className="header">Parallax</h2>
            <p className="grey-text text-darken-3 lighten-3">Parallax is an effect where the background content or image in this case, is moved at a different speed than the foreground content while scrolling.</p>
          </div>
        </div>
        <div className="parallax-container">
          <div className="parallax"><img src="http://117.240.88.108/rockys/wp-content/uploads/2012/05/charity-day.jpg" /></div>
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
      <Route path="browse" component={Browse} options = {Options} />
      <Route path="search" component={Search}
      />
    </Route>
  </Router>
), document.getElementById('app'));
