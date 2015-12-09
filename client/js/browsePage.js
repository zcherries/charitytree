//display list of areas of focus
import React from 'react';
import { Link } from 'react-router';
import { Tag } from './search.js';

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

var CausesInfo = [
  {
    id: "animals",
    title: "Animals",
    img: "https://c1.staticflickr.com/5/4119/4931607222_92bf5fea5f_b.jpg",
    subcauses: [
      {title: "Right", tags: "Animal Rights"},
      {title: "Services", tags: "Animal Services"},
      {title: "Welfare", tags: "Animal Welfare"},
      {title: "Wildlife Conservation", tags: "Wildlife Conservation"},
      {title: "Zoos & Aquariums", tags: "Zoos Aquariums"} ]
  },
  {
    id: "arts",
    title: "Arts, Culture, Humanitites",
    img: "https://c1.staticflickr.com/5/4077/4931032081_9d5ca8cfff_b.jpg",
    subcauses: [
      {title: "Libraries", tags: "Libraries"},
      {title: "Historical Societies", tags: "Historical Societies"},
      {title: "Landmark Preservation", tags: "Landmark Preservation"},
      {title: "Museums", tags: "Museums"},
      {title: "Performing Arts", tags: "Performing Arts"},
      {title: "Public Broadcasting and Media", tags: "Public Broadcasting Media"} ]
  },
  { 
    id: "community",
    title: "Community Development",
    img: "https://c1.staticflickr.com/9/8082/8380083742_098a5616b9_b.jpg",
    subcauses: [
      {title: "Fundraising", tags: "Fundraising"},
      {title: "Community Foundations", tags: "Community Foundations"},
      {title: "Housing and Neighborhood Development", tags: "Housing Development"} ]
    },
  { 
    id: "education",
    title: "Education",
    img: "https://c1.staticflickr.com/5/4123/4931585570_d75507cee3_b.jpg",
    subcauses: [
      {title: "Universities, Graduate Schools, and Technological Institutes", tags: "Universities Graduate Technological"},
      {title: "Private Elementary and Secondary Schools", tags: "Private Elementary Secondary Schools"},
      {title: "Private Liberal Arts Colleges", tags: "Private Liberal Arts Colleges"},
      {title: "Other Education Programs and Services", tags: "Other Education"} ]
    },
  { 
    id: "environment",
    title: "Environment",
    img: "https://c1.staticflickr.com/5/4099/4931030575_033fca9b28_b.jpg",
    subcauses: [
      {title: "Environmental Protection and Conservation", tags: "Environment Protection Conservation"},
      {title: "Botanical Gardens, Parks, and Nature Centers", tags: "Parks Nature Botanical Gardens"} ]
    },
  { 
    id: "health",
    title: "Health",
    img: "https://c1.staticflickr.com/5/4119/4931607222_92bf5fea5f_b.jpg",
    subcauses: [
      {title: "Diseases, Disorders, and Disciplines", tags: "Diseases Disorders Disciplines"},
      {title: "Patient and Family Support", tags: "Patient Family Support"},
      {title: "Health Care Facilities and Programs", tags: "Health Care"},
      {title: "Mental Health and Crisis Services", tags: "Mental Health Crisis"},
      {title: "Treatment Services", tags: "Health Treatment"},
      {title: "Prevention Services", tags: "Health Prevention"},
      {title: "Medical Research", tags: "Medical Research"} ]
    },
  { 
    id: "services",
    title: "Human Services",
    img: "https://c1.staticflickr.com/5/4115/4931010827_98907c06c2_b.jpg",
    subcauses: [
      {title: "Children's and Family Services", tags: "Children Family"},
      {title: "Crime and Legal Related", tags: "Crime Legal"},
      {title: "Youth Development", tags: "Youth Development"},
      {title: "Shelter", tags: "Shelter"},
      {title: "Crisis Services", tags: "Crisis"},
      {title: "Food Distribution", tags: "Food Distribution"},
      {title: "Food Banks, and Food Pantries", tags: "Food Banks Pantries"},
      {title: "Multipurpose Human Service Organizations", tags: "Multipurpose"},
      {title: "Public Safety, Disaster Preparedness, and Relief", tags: "Disaster Preparedness Safety Relief"},
      {title: "Homeless Services", tags: "Homeless"},
      {title: "Social Services", tags: "Social"} ]
    },
  { 
    id: "rights",
    title: "Human and Civil Rights",
    img: "https://c1.staticflickr.com/5/4099/4931620392_e3654db7dd_b.jpg",
    subcauses: [
      {title: "Advocacy and Education", tags: "Rights Advocacy"},
      {title: "Social Services", tags: "Social Services"},
      {title: "Human Trafficking", tags: "Human Trafficking"} ]
    },
  { 
    id: "international",
    title: "International",
    img: "https://c2.staticflickr.com/4/3793/10569512605_3815d5c4f2_b.jpg",
    subcauses: [
      {title: "Development and Relief Services", tags: "Development Relief"},
      {title: "International Peace", tags: "International Peace"},
      {title: "Security, and Affairs", tags: "Security Affairs"},
      {title: "Humanitarian Relief Supplies", tags: "Humanitarian Relief Supplies"},
      {title: "Foreign Charity Support Organizations", tags: "Foreign"} ]
    },
  { 
    id: "religion",
    title: "Religion",
    img: "https://c1.staticflickr.com/5/4073/4931004261_af5c021afb_b.jpg",
    subcauses: [
      {title: "Religious Activities", tags: "Religious Activities"},
      {title: "Religious Media & Broadcasting", tags: "Religious Media Broadcasting"} ]
    },
  { 
    id: "research",
    title: "Research and Public Policy",
    img: "https://c1.staticflickr.com/5/4073/4931004261_af5c021afb_b.jpg",
    subcauses: [
      {title: "Non-Medical Science & Technology Research", tags: "Science Technology Research"},
      {title: "Medical Research", tags: "Medical Research"},
      {title: "Social and Public Policy Research", tags: "Social Public Policy Research"} ]
    }
];

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
