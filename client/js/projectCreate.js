import React from 'react';
import { CausesInfo } from './causesinfo.js';


var ProjectCreate = exports.ProjectCreate = React.createClass({
  render: function () {
    return(
      <div>
        <div className="row">

          <div className="col s12 m6">
            <h1>Create a new Project</h1>
          </div>


          <form className="col s12 m6">
            <div className="row">
              <div className="input-field col s6">
                <input placeholder="Project Title" id="first_name" type="text" className="validate" />
                  <label htmlFor="first_name">Project Title</label>
              </div>
              <div className="input-field col s6">
                <input placeholder="Last Name"  id="last_name" type="text" className="validate" />
                  <label htmlFor="last_name">Last Name</label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <input disabled value="I am not editable" id="disabled" type="text" className="validate" />
                  <label htmlFor="disabled">Disabled</label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <input id="password" type="password" className="validate" />
                  <label htmlFor="password">Password</label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <input id="email" type="email" className="validate" />
                  <label htmlFor="email">Email</label>
              </div>
              <div className="input-field col s12">
                <textarea id="textarea1" className="materialize-textarea"></textarea>
                <label htmlFor="textarea1">Textarea</label>
              </div>
            </div>
          </form>
          <CategorySelect

          />
        </div>
      </div>
    );
  }
});

var CategorySelect = React.createClass({
  render: function () {

    var majCats = CausesInfo.map(function (cause, index) {
      return (
        <MajCategory
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
      <form className="row" action="#">
        {majCats}
      </form>
    );
  }
});

var MajCategory = React.createClass({

  render: function () {

    var minCats = this.props.causeSubcauses.map(function (subcause, index) {
      return (
        <MinCategory
          key={index}
          subCauseID={subcause.id}
          title={subcause.title}
          tags={subcause.tags}
          addCriteria={this.props.addCriteria}
        />
      );
    }.bind(this));

    return(
      <div className="col s4">
        <div className="chip">
          <img src={this.props.causeImage} alt="" className="circle" />
          {this.props.causeTitle}
        </div>
        <p>
          <input type="checkbox" id={this.props.causeID} />
          <label htmlFor={this.props.causeID} >
            {this.props.causeTitle}
          </label>
        </p>
        {minCats}
      </div>
    );
  }
});

var MinCategory = React.createClass({
  render: function () {
    return(
      <p>
        <input type="checkbox" id={this.props.subCauseID} />
        <label htmlFor={this.props.subCauseID}>{this.props.tags}</label>
      </p>
    );
  }
});