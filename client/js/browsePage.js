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
    console.log("this.state.searchCriteria",this.state.searchCriteria);
  },

  removeTag: function(tagText) {
    var searchCriteria = this.state.searchCriteria.slice();
    var tagIdx = searchCriteria.indexOf(tagText);
    searchCriteria.splice(tagIdx, 1);
    this.setState({
      searchCriteria: searchCriteria
    });
  },

  render: function() {

    return (
      <div>

        <div className="center flow-text">
          <h1> Find causes you care about the most </h1>
        </div>

        <div className="row">
          <div className="col s12 m2 l2">
            <div className="center-align pinned" style={{maxWidth: "16%"}}>
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
          <div className="col s12 m8 push-m2 l8 push-l2">
            <div className="row">

              <div id="animals" className="col s12 m6 l6 section scrollspy">
                <div className="card hoverable">
                  <div className="card-image waves-effect waves-block waves-light">
                    <img className="image activator" src="https://c1.staticflickr.com/5/4119/4931607222_92bf5fea5f_b.jpg" />
                    <span className="card-title activator white-text">Animals</span>
                  </div>
                  <div className="card-reveal">
                    <span className="card-title grey-text text-darken-4">Animals<i className="material-icons right">close</i></span>
                      <div
                        className="hoverable"
                        title="Animal Rights"
                        onClick={this.addCriteria}
                      >
                        Rights
                      </div>
                      <div
                        className="hoverable"
                        title="Animal Services"
                        onClick={this.addCriteria}
                      >
                        Services
                      </div>
                      <div
                        className="hoverable"
                        title="Animal Welfare"
                        onClick={this.addCriteria}
                      >
                        Welfare
                      </div>
                      <div
                        className="hoverable"
                        title="Wildlife Conservation"
                        onClick={this.addCriteria}
                      >
                        Wildlife Conservation
                      </div>
                      <div
                        className="hoverable"
                        title="Zoos & Aquariums"
                        onClick={this.addCriteria}
                      >
                        Zoos & Aquariums
                      </div>
                  </div>
                </div>
              </div>

              <div id="arts" className="col s12 m6 l6 section scrollspy">
                <div className="card hoverable">
                  <div className="card-image waves-effect waves-block waves-light">
                    <img className = "image activator" src="https://c1.staticflickr.com/5/4077/4931032081_9d5ca8cfff_b.jpg" />
                    <span className="card-title activator white-text">Arts, Culture, Humanities</span>
                  </div>
                  <div className="card-reveal">
                    <span className="card-title grey-text text-darken-4">Arts, Culture, Humanities<i className="material-icons right">close</i></span>
                    <div
                        className="hoverable"
                        title="Libraries"
                        onClick={this.addCriteria}
                      >
                        Libraries
                      </div>
                      <div
                        className="hoverable"
                        title="Historical Societies"
                        onClick={this.addCriteria}
                      >
                        Historical Societies
                      </div>
                      <div
                        className="hoverable"
                        title="Landmark Preservation"
                        onClick={this.addCriteria}
                      >
                        Landmark Preservation
                      </div>
                      <div
                        className="hoverable"
                        title="Museums"
                        onClick={this.addCriteria}
                      >
                        Museums
                      </div>
                      <div
                        className="hoverable"
                        title="Performing Arts"
                        onClick={this.addCriteria}
                      >
                        Performing Arts
                      </div>
                      <div
                        className="hoverable"
                        title="Public Broadcasting"
                        onClick={this.addCriteria}
                      >
                        Public Broadcasting
                      </div>
                  </div>
                </div>
              </div>
              <div id="community" className="col s12 m6 l6 section scrollspy">
                <div className="card hoverable">
                  <div className="card-image waves-effect waves-block waves-light">
                    <img className = "image activator" src="https://c1.staticflickr.com/9/8082/8380083742_098a5616b9_b.jpg" />
                    <span className="card-title activator white-text">Community Development</span>
                  </div>
                  <div className="card-reveal">
                    <span className="card-title grey-text text-darken-4">Community Development<i className="material-icons right">close</i></span>
                     <div
                        className="hoverable"
                        title="Fundraising"
                        onClick={this.addCriteria}
                        >
                        Fundraising
                      </div>
                       <div
                        className="hoverable"
                        title="Community Foundations"
                        onClick={this.addCriteria}
                        >
                        Community Foundations
                      </div>
                       <div
                        className="hoverable"
                        title="Housing Development"
                        onClick={this.addCriteria}
                        >
                        Housing Development
                      </div>
                  </div>
                </div>
              </div>
              <div id="education" className="col s12 m6 l6 section scrollspy">
                <div className="card hoverable">
                  <div className="card-image waves-effect waves-block waves-light">
                    <img className = "image activator" src="https://c1.staticflickr.com/5/4123/4931585570_d75507cee3_b.jpg" />
                    <span className="card-title activator white-text">Education</span>
                  </div>
                  <div className="card-reveal">
                    <span className="card-title grey-text text-darken-4">Education<i className="material-icons right">close</i></span>
                      <div
                        className="hoverable"
                        title="Universities & Institutes"
                        onClick={this.addCriteria}
                        >
                        Universities & Technological Institutes
                      </div>
                       <div
                        className="hoverable"
                        title="Elementary"
                        onClick={this.addCriteria}
                        >
                        Elementary Schools
                      </div>
                      <div
                        className="hoverable"
                        title="Secondary"
                        onClick={this.addCriteria}
                        >
                        Secondary Schools
                      </div>
                      <div
                        className="hoverable"
                        title="Liberal Arts"
                        onClick={this.addCriteria}
                        >
                        Liberal Arts Colleges
                      </div>
                  </div>
                </div>
              </div>
              <div id="environment" className="col s12 m6 l6 section scrollspy">
                <div className="card hoverable">
                  <div className="card-image waves-effect waves-block waves-light">
                    <img className = "image activator" src="https://c1.staticflickr.com/5/4099/4931030575_033fca9b28_b.jpg" />
                    <span className="card-title activator white-text">Environment</span>
                  </div>
                  <div className="card-reveal">
                    <span className="card-title grey-text text-darken-4">Environment<i className="material-icons right">close</i></span>
                      <div
                        className="hoverable"
                        title="Environmental Protection"
                        onClick={this.addCriteria}
                        >
                        Environmental Protection
                      </div>
                      <div
                        className="hoverable"
                        title="Conservation"
                        onClick={this.addCriteria}
                        >
                        Conservation
                      </div>
                      <div
                        className="hoverable"
                        title="Botanical Gardens"
                        onClick={this.addCriteria}
                        >
                        Botanical Gardens
                      </div>
                      <div
                        className="hoverable"
                        title="Parks & Nature"
                        onClick={this.addCriteria}
                        >
                        Parks & Nature Centers
                      </div>
                  </div>
                </div>
              </div>
              <div id="health" className="col s12 m6 l6 section scrollspy">
                <div className="card hoverable">
                  <div className="card-image waves-effect waves-block waves-light">
                    <img className = "image activator" src="https://c1.staticflickr.com/5/4119/4931607222_92bf5fea5f_b.jpg" />
                    <span className="card-title activator white-text">Health</span>
                  </div>
                  <div className="card-reveal">
                    <span className="card-title grey-text text-darken-4">Health<i className="material-icons right">close</i></span>
                     <div
                        className="hoverable"
                        title="Diseases"
                        onClick={this.addCriteria}
                        >
                        Diseases
                      </div>
                      <div
                        className="hoverable"
                        title="Disorders"
                        onClick={this.addCriteria}
                        >
                        Disorders
                      </div>
                      <div
                        className="hoverable"
                        title="Patient Support"
                        onClick={this.addCriteria}
                        >
                        Patient Support
                      </div>
                      <div
                        className="hoverable"
                        title="Family Support"
                        onClick={this.addCriteria}
                        >
                        Family Support
                      </div>
                      <div
                        className="hoverable"
                        title="Health Care"
                        onClick={this.addCriteria}
                        >
                        Health Care Facilities and Programs
                      </div>
                      <div
                        className="hoverable"
                        title="Mental Health"
                        onClick={this.addCriteria}
                        >
                        Mental Health
                      </div>
                      <div
                        className="hoverable"
                        title="Crisis Services"
                        onClick={this.addCriteria}
                        >
                        Crisis Services
                      </div>
                      <div
                        className="hoverable"
                        title="Treatment"
                        onClick={this.addCriteria}
                        >
                        Treatment
                      </div>
                      <div
                        className="hoverable"
                        title="Prevention"
                        onClick={this.addCriteria}
                        >
                        Prevention
                      </div>
                      <div
                        className="hoverable"
                        title="Medical Research"
                        onClick={this.addCriteria}
                        >
                        Medical Research
                      </div>
                  </div>
                </div>
              </div>

              <div id="services" className="col s12 m6 l6 section scrollspy">
                <div className="card hoverable">
                  <div className="card-image waves-effect waves-block waves-light">
                    <img className = "image activator" src="https://c1.staticflickr.com/5/4115/4931010827_98907c06c2_b.jpg" />
                    <span className="card-title activator white-text">Human Services</span>
                  </div>
                  <div className="card-reveal">
                    <span className="card-title grey-text text-darken-4">Human Services<i className="material-icons right">close</i></span>
                      <div
                        className="hoverable"
                        title="Children Services"
                        onClick={this.addCriteria}
                        >
                        Children Services
                      </div>
                      <div
                        className="hoverable"
                        title="Family Services"
                        onClick={this.addCriteria}
                        >
                        Family Services
                      </div>
                      <div
                        className="hoverable"
                        title="Crime and Legal"
                        onClick={this.addCriteria}
                        >
                        Crime and Legal
                      </div>
                      <div
                        className="hoverable"
                        title="Youth Development"
                        onClick={this.addCriteria}
                        >
                        Youth Development
                      </div>
                      <div
                        className="hoverable"
                        title="Shelter"
                        onClick={this.addCriteria}
                        >
                        Shelter
                      </div>
                      <div
                        className="hoverable"
                        title="Crisis Services"
                        onClick={this.addCriteria}
                        >
                        Crisis Services
                      </div>
                      <div
                        className="hoverable"
                        title="Food Banks"
                        onClick={this.addCriteria}
                        >
                        Food Banks
                      </div>
                      <div
                        className="hoverable"
                        title="Food Distribution"
                        onClick={this.addCriteria}
                        >
                        Food Distribution
                      </div>
                      <div
                        className="hoverable"
                        title="Disaster Preparedness"
                        onClick={this.addCriteria}
                        >
                        Disaster Preparedness
                      </div>
                      <div
                        className="hoverable"
                        title="Homeless Services"
                        onClick={this.addCriteria}
                        >
                        Homeless Services
                      </div>
                      <div
                        className="hoverable"
                        title="Social Services"
                        onClick={this.addCriteria}
                        >
                        Social Services
                      </div>
                  </div>
                </div>
              </div>

              <div id="rights" className="col s12 m6 l6 section scrollspy">
                <div className="card hoverable">
                  <div className="card-image waves-effect waves-block waves-light">
                    <img className = "image activator" src="https://c1.staticflickr.com/5/4099/4931620392_e3654db7dd_b.jpg" />
                    <span className="card-title activator white-text">Human and Civil Rights</span>
                  </div>
                  <div className="card-reveal">
                    <span className="card-title grey-text text-darken-4">Human and Civil Rights<i className="material-icons right">close</i></span>
                    <div
                        className="hoverable"
                        title="Rights Advocacy"
                        onClick={this.addCriteria}
                        >
                        Advocacy and Education
                      </div>
                      <div
                        className="hoverable"
                        title="Social Services"
                        onClick={this.addCriteria}
                        >
                        Social Services
                      </div>
                      <div
                        className="hoverable"
                        title="Human Trafficking"
                        onClick={this.addCriteria}
                        >
                        Human Trafficking
                      </div>
                  </div>
                </div>
              </div>

              <div id="international" className="col s12 m6 l6 section scrollspy">
                <div className="card hoverable">
                  <div className="card-image waves-effect waves-block waves-light">
                    <img className = "image activator" src="https://c2.staticflickr.com/4/3793/10569512605_3815d5c4f2_b.jpg" />
                    <span className="card-title activator white-text">International</span>
                  </div>
                  <div className="card-reveal">
                    <span className="card-title grey-text text-darken-4">International<i className="material-icons right">close</i></span>
                                          <div
                        className="hoverable"
                        title="Development & Relief"
                        onClick={this.addCriteria}
                        >
                        Development & Relief Services
                      </div>
                      <div
                        className="hoverable"
                        title="International Peace"
                        onClick={this.addCriteria}
                        >
                        International Peace
                      </div>
                      <div
                        className="hoverable"
                        title="Security"
                        onClick={this.addCriteria}
                        >
                        Security
                      </div>
                      <div
                        className="hoverable"
                        title="Humanitarian Relief"
                        onClick={this.addCriteria}
                        >
                        Humanitarian Relief Supplies
                      </div>
                  </div>
                </div>
              </div>

              <div id="religion" className="col s12 m6 l6 section scrollspy">
                <div className="card hoverable">
                  <div className="card-image waves-effect waves-block waves-light">
                    <img className = "image activator" src="https://c1.staticflickr.com/5/4073/4931004261_af5c021afb_b.jpg" />
                    <span className="card-title activator white-text">Religion</span>
                  </div>
                  <div className="card-reveal">
                    <span className="card-title grey-text text-darken-4">Religion<i className="material-icons right">close</i></span>
                       <div
                        className="hoverable"
                        title="Religious Activities"
                        onClick={this.addCriteria}
                        >
                        Religious Activities
                      </div>
                      <div
                        className="hoverable"
                        title="Religious Media"
                        onClick={this.addCriteria}
                        >
                        Religious Media & Broadcasting
                      </div>
                  </div>
                </div>
              </div>

              <div id="research" className="col s12 m6 l6 section scrollspy">
                <div className="card hoverable">
                  <div className="card-image waves-effect waves-block waves-light">
                    <img className = "image activator" src="https://c1.staticflickr.com/5/4073/4931004261_af5c021afb_b.jpg" />
                    <span className="card-title activator white-text">Research and Public Policy</span>
                  </div>
                  <div className="card-reveal">
                    <span className="card-title grey-text text-darken-4">Research and Public Policy<i className="material-icons right">close</i></span>
                    <div
                        className="hoverable"
                        title="Non-Medical Science"
                        onClick={this.addCriteria}
                        >
                        Non-Medical Science
                      </div>
                      <div
                        className="hoverable"
                        title="Technology Research"
                        onClick={this.addCriteria}
                        >
                        Technology Research
                      </div>
                      <div
                        className="hoverable"
                        title="Public Policy Research"
                        onClick={this.addCriteria}
                        >
                        Public Policy Research
                      </div>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/*ScrollSpy*/}
          <div className="col hide-on-small-only m2 push-m2 l2 push-l2">
            <div className="toc-wrapper pinned" >
              <ul className="section table-of-contents">
                <li><a href="#animals">Animals</a></li>
                <li><a href="#arts">Arts, Culture, Humanities</a></li>
                <li><a href="#community">Community Development</a></li>
                <li><a href="#education">Education</a></li>
                <li><a href="#environment">Environment</a></li>
                <li><a href="#health">Health</a></li>
                <li><a href="#services">Human Services</a></li>
                <li><a href="#rights">Human & Civil Right</a></li>
                <li><a href="#international">International</a></li>
                <li><a href="#religion">Religion</a></li>
                <li><a href="#research">Research & Public Policy</a></li>
              </ul>
            </div>
          </div>

        </div>

      </div>
    );
  }
});

var TagContainer = React.createClass({
  render: function () {
    console.log("this.props.searchCriteria",this.props.searchCriteria);
    var tagNodes = this.props.searchCriteria.map(function(tag, idx) {
      console.log("tag",tag,"idx",idx);
      return (
        <Tag
          text={ tag }
          removeTag={ this.props.removeTag }
          key={ idx }
        />
      );
    }.bind(this))
    return (
      <div className="taglist">
        { tagNodes }
      </div>
    );
  }
});