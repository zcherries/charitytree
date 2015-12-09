//display list of areas of focus
import React from 'react';
import { Link } from 'react-router';
import { Tag } from './search.js';
import { CausesInfo } from './causesinfo.js';

var Browse = exports.Browse = React.createClass({
  getInitialState: function () {
    return {
      searchCriteria: []
    };
  },

  addCriteria: function (e) {
    var tags = this.state.searchCriteria;
    if (this.state.searchCriteria.indexOf(e.target.title) === -1) {
      tags.push(e.target.title);
    }
    this.setState({
      searchCriteria: tags
    });
    console.log("addCriteria/this.state.searchCriteria",this.state.searchCriteria);
  },

  removeTag: function(tagName) {
    var searchCriteria = this.state.searchCriteria.slice();
    var tagIdx = searchCriteria.indexOf(tagName);
    searchCriteria.splice(tagIdx, 1);
    this.setState({
      searchCriteria: searchCriteria
    });
    console.log("removeTag/searchCriteria:",searchCriteria);
  },

  render: function() {
    return (
      <div>
        <div className="center flow-text">
          <h3>Find causes you care about the most</h3>
        </div>

        <div className="row">
          <div className="col s12 m2 l2">
            <div className="center-align pinned" style={{maxWidth: "16%", zIndex: "100"}}>
              <button className="btn waves-effect waves-light" type="submit" name="action">Submit Search
                <i className="material-icons right">send</i>
              </button>
              <h6>Search Criterion</h6>
              <TagContainer
                searchCriteria={this.state.searchCriteria}
                removeTag={this.removeTag}
              />
            </div>
          </div>

          {/*Causes*/}
          <Causes addCriteria={this.addCriteria} />

          {/*ScrollSpy*/}
          <ScrollSpyListItems />
        </div>
      </div>
    );
  }
});

var TagContainer = React.createClass({
  render: function () {
    console.log("TagContainer/this.props.searchCriteria",this.props.searchCriteria);
    var tagNodes = this.props.searchCriteria.map(function(tag, idx) {
      console.log("TagContainer/tagNodes/tag",tag,"idx",idx);
      return (
        <Tag
          text={ tag }
          removeTag={ this.props.removeTag }
          key={idx}
        />
      );
    }.bind(this));
    return (
      <div className="taglist">
        { tagNodes }
      </div>
    );
  }
});



var Causes = React.createClass({
  render: function () {
    var causeCards = CausesInfo.map(function (cause, index) {
      return (
        <Cause
          key={index}
          causeID={cause.id}
          causeTitle={cause.title}
          causeImage={cause.img}
          causeSubcauses={cause.subcauses}
          addCriteria={this.props.addCriteria}
        />
      );
    }.bind(this));
    return(
      <div className="col s9 push-s3 m8 push-m2 l8 push-l2">
        <div className="row">
          {causeCards}
        </div>
      </div>
    );
  }
});

var Cause = React.createClass({
  render: function () {
    var causeCardReveals = this.props.causeSubcauses.map(function (subcause, index) {
      return (
        <CauseCriteria
          key={index}
          title={subcause.title}
          tags={subcause.tags}
          addCriteria={this.props.addCriteria}
        />
      );
      }.bind(this));

    return (
      <div id={this.props.causeID} className="col s12 m6 l6 section scrollspy">
        <div className="cardx hoverable">
          <div className="card-image waves-effect waves-block waves-light">
            <img className="image activator" src={this.props.causeImage} />
            <span className="card-title activator white-text z-depth-5">{this.props.causeTitle}</span>
          </div>
          <div className="card-reveal">
            <span className="card-title grey-text text-darken-4">{this.props.causeTitle}</span>
            {causeCardReveals}
          </div>
        </div>
      </div>
    );
  }
});

var CauseCriteria = React.createClass({
  render: function () {
    return(
      <div
        className="hoverable"
        title={this.props.tags}
        onClick={this.props.addCriteria}
      >
        {this.props.title}
      </div>
    );
  }
});

var ScrollSpyListItems = React.createClass({
  render: function () {
    var items = CausesInfo.map(function (cause, index) {
      return <li key={index}>
        <a href={"#" + cause.id}>
          {cause.title}
        </a>
      </li>
    });
    return(
    <div className="col hide-on-small-only m2 push-m2 l2 push-l2">
      <div className="toc-wrapper pinned" >
        <ul className="section table-of-contents">
          {items}
        </ul>
      </div>
    </div>
    );
  }
});
