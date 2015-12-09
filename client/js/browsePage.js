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
                      <div className="hoverable" value="Animal Services">
                        Services
                      </div>
                      <div className="hoverable" value="Animal Welfare">
                        Welfare
                      </div>
                      <div className="hoverable" value="Animal Wildlife Conservation">
                        Wildlife Conservation
                      </div>
                      <div className="hoverable" value="Animal Zoos Aquariums">
                        Zoos and Aquariums
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
                    <p>Libraries <br/>
                      Historical Societies<br/>
                      Landmark Preservation<br/>
                      Museums<br/>
                      Performing Arts<br/>
                      Public Broadcasting and Media</p>
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
                    <p>Fundraising<br/>
                      Community Foundations
                      Housing and Neighborhood Development</p>
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
                    <p>Universities, Graduate Schools, and Technological Institutes
                      Private Elementary and Secondary Schools
                      Private Liberal Arts Colleges
                      Other Education Programs and Services</p>
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
                    <p>Environmental Protection and Conservation
                      Botanical Gardens, Parks, and Nature Centers</p>
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
                    <p>Diseases, Disorders, and Disciplines
                      Patient and Family Support
                      Health Care Facilities and Programs
                      Mental Health and Crisis Services
                      Treatment and Prevention Services
                      Medical Research</p>
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
                    <p>Children's and Family Services
                      Crime and Legal Related
                      Youth Development, Shelter, and Crisis Services
                      Food Banks, Food Pantries, and Food Distribution
                      Multipurpose Human Service Organizations
                      Public Safety, Disaster Preparedness, and Relief
                      Homeless Services
                      Social Services</p>
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
                    <p>Advocacy and Education</p>
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
                    <p>Development and Relief Services
                      International Peace, Security, and Affairs
                      Humanitarian Relief Supplies
                      Foreign Charity Support Organizations</p>
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
                    <p>Religious Activities
                      Religious Media and Broadcasting</p>
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
                    <p>Non-Medical Science & Technology Research
                      Social and Public Policy Research</p>
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