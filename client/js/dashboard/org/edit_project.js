import React from 'react';
import { CausesInfo } from '../../causesInfo.js';

exports.ProjectEdit = React.createClass({
  getInitialState: function () {
    return {
      title: "",
      start_date: null,
      end_date: null,
      amount: {
        goal: null,
        current: 0
      },
      info: "",
      areas_of_focus: [],
      needs_list: [{
        arrIndex: 0,
        title: "",
        description: "",
        cost: null,
        quantity_needed: null,
        active: "active"
      }],
      total_donors_participating: 0,
      updates: [],
      status: "In Progress",
      is_complete: false,
      endDateText: ""
    }
  },

  componentDidMount: function() {
    //$('.datepicker').pickadate('clear');
    $('.collapsible').collapsible({
      accordion: true // A setting that changes the collapsible behavior to expandable instead of the default accordion style
    });
  },

  updateNeedTitle: function (need) {
    //console.log("Needs/updateNeedTitle/need:",need);
    var needs = this.state.needs_list;
    needs[need.arrIndex].title = need.title;

    this.setState({
      needs_list: needs
    });
  },

  updateNeedDescription: function (need) {
    var needs = this.state.needs_list;
    needs[need.arrIndex].description = need.description;

    this.setState({
      needs_list: needs
    });
  },

  updateNeedCost: function (need) {
    var needs = this.state.needs_list;
    needs[need.arrIndex].cost = need.cost;

    this.setState({
      needs_list: needs
    });
  },

  updateNeedQuantity: function (need) {
    var needs = this.state.needs_list;
    needs[need.arrIndex].quantity_needed = need.quantity_needed;

    this.setState({
      needs_list: needs
    });
  },

  addNeed: function () {
    var arrIndex = this.state.needs_list.length;
    var needs = this.state.needs_list.slice();
    console.log("addNeed:before/needs:",needs);
    if (needs[needs.length - 1].title !== "" &&
      needs[needs.length - 1].description !== "" &&
      needs[needs.length - 1].cost !== null &&
      needs[needs.length - 1].quantity_needed !== null) {
      needs[needs.length - 1].active = "";
      needs.push({
        arrIndex: arrIndex,
        title: "",
        description: "",
        cost: null,
        quantity_needed: null,
        active: "active"
      });
      this.setState({
        needs_list: needs
      });
    } else {
      Materialize.toast('Oops please fill in all fields', 2000, 'rounded'); // 'rounded' is the class I'm applying to the toast
    }
    console.log("addNeed:after/needs:",needs);
  },

  addRemoveCat: function (e) {
    //console.log("project/e.target.checked/:",e.target.checked);
    var aof = this.state.areas_of_focus;
    if (e.target.checked) {
      if(aof.indexOf(e.target.value) === -1) {
        aof.push(e.target.value)
      }
    } else {
      if (aof.indexOf(e.target.value)) {
        aof.splice(aof.indexOf(e.target.value), 1);
      }
    }
    //console.log("ProjectCreate/addRemoveCat/aof:",aof);
    this.setState({
      areas_of_focus: aof
    });
  },

  updateTitle: function (e) {
    console.log("ProjectCreate/updateTitle/e.target.value:",e.target.value);
    this.setState({
      title: e.target.value
    })
  },

  updateEndDate: function () {
    var self = this;
    $('.datepicker').pickadate({
      selectMonths: true, // Creates a dropdown to control month
      selectYears: 5, // Creates a dropdown of 15 years to control year
      closeOnSelect: true,
      onStart: function () {
        console.log('Hello there :)')
      },
      onRender: function () {
        console.log('Whoa.. rendered anew')
      },
      onOpen: function () {
        console.log('Opened up')
      },
      onClose: function () {
        console.log('Closed now')
      },
      onStop: function () {
        console.log('See ya.')
      },
      onSet: function (e) {
        //console.log("onset/e.select:",e.select);
        var endDate = new Date(e.select);
        var endDateText = endDate.toDateString();
        console.log("endDate", endDate);

        self.setState({
          end_date: endDate,
          endDateText: endDateText
        });
        console.log("onset/this.state.end_date:", self.state.end_date);
        this.close();
      }
    });
    //console.log("ProjectCreate/updateEndDate/endDate:",endDate[0]);
  },

  updateGoalAmount: function (e) {
    console.log("ProjectCreate/updateGoalAmound/e.target.value:",e.target.value);
    this.setState({
      amount: {goal: e.target.value}
    })
  },

  updateInfo: function (e) {
    console.log("ProjectCreate/updateInfo/e.target.value:",e.target.value);
    this.setState({
      info: e.target.value
    })
  },

  submitForm: function () {
    $.ajax({
      url: "/dashboard/project/update",
      method: "POST",
      data: {projectData: this.state},
      success: function (response) {
        console.log(response);
        this.props.submitHandler(); //from projects component
      }.bind(this),
      error: function (xhr, status, err) {
        console.error(xhr, status, err.toString());
      }.bind(this)
    });
  },

  render: function () {
    return (
      <div>
        <div className="container">
          <div className="row">
            <fieldset>
              <legend>
                <h1>{this.props.project.title}</h1>
              </legend>
              <form className="col s12">
                <div className="row">
                  {/*Project Title*/}
                  <div className="input-field col s12 m6">
                    <input id="project_title" type="text" className="validate" required defaultValue={this.props.project.title} onChange={this.updateTitle} />
                    <label htmlFor="project_title">Project Title</label>
                  </div>
                  {/*Target Funding Amount*/}
                  <div className="input-field col s12 m6">
                    <input id="goal" type="number" className="validate" defaultValue={this.props.project.amount.goal} onChange={this.updateGoalAmount} />
                    <label htmlFor="goal">Target Funding Amount</label>
                  </div>
                  {/*End Date*/}
                  <div className="input-field col s12">
                    <input id="end_date" type="date" className="datepicker" defaultValue={this.props.project.end_date} onClick={this.updateEndDate} />
                    <label htmlFor="end_date">Projected End Date</label>
                  </div>
                  {/*Project Info*/}
                  <div className="input-field col s12">
                    <textarea id="info" className="materialize-textarea" defaultValue={this.props.project.info} onChange={this.updateInfo} />
                    <label htmlFor="info">Info</label>
                  </div>
                </div>
              </form>
            </fieldset>

            <h3>Areas of Focus</h3>
            <CategorySelect addRemoveCat={this.addRemoveCat} aofs={this.props.project.areas_of_focus} />

            <h3>Project Needs</h3>
            <Needs
              needs={this.props.project.needs_list}
              addNeed={this.addNeed}
              updateNeedTitle={this.updateNeedTitle}
              updateNeedDescription={this.updateNeedDescription}
              updateNeedCost={this.updateNeedCost}
              updateNeedQuantity={this.updateNeedQuantity}
            />
            <button className="waves-effect waves-light btn float right" onClick={this.submitForm}><i className="material-icons right">label_outline</i>Submit</button>
          </div>

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
          tags={cause.tags}
          addRemoveCat={this.props.addRemoveCat}
          aofs={this.props.aofs}
        />
      );
    }.bind(this));

    return(
      <form className="row" action="#">
        <ul className="collapsible popout collection" data-collapsible="accordion">
          {majCats}
        </ul>
      </form>
    );
  }
});

//<ul class="collapsible popout" data-collapsible="accordion">
//  <li>
//    <div class="collapsible-header"><i class="material-icons">filter_drama</i>First</div>
//    <div class="collapsible-body"><p>Lorem ipsum dolor sit amet.</p></div>
//  </li>
//  <li>
//    <div class="collapsible-header"><i class="material-icons">place</i>Second</div>
//    <div class="collapsible-body"><p>Lorem ipsum dolor sit amet.</p></div>
//  </li>
//  <li>
//    <div class="collapsible-header"><i class="material-icons">whatshot</i>Third</div>
//    <div class="collapsible-body"><p>Lorem ipsum dolor sit amet.</p></div>
//  </li>
//</ul>

var MajCategory = React.createClass({

  render: function () {
    var minCats = this.props.causeSubcauses.map(function (subcause, index) {
      return (
        <MinCategory
          key={index}
          subCauseID={subcause.id}
          title={subcause.title}
          tags={subcause.tags}
          addRemoveCat={this.props.addRemoveCat}
          aofs={this.props.aofs}
        />
      );
    }.bind(this));

    return(
    <li className="collection-item avatar white black-text">
      <div className="collapsible-header center-align">
        <img src={this.props.causeImage} alt={this.props.causeTitle} className="circle" />
        <h5>{this.props.causeTitle}</h5>
      </div>
      <div className="collapsible-body row white black-text">
        <div className="col s12 m4">
          <p>
            <input
              type="checkbox"
              id={this.props.causeID}
              onChange={this.props.addRemoveCat}
              value={this.props.tags}
            />
            <label htmlFor={this.props.causeID} >
              {this.props.causeTitle}
            </label>
          </p>
        </div>
        {minCats}
      </div>
    </li>
    );
  }
});

var MinCategory = React.createClass({
  render: function () {
    var minCat = (this.props.aofs.indexOf(this.props.tags) > -1) ? (
      <input type="checkbox" id={this.props.subCauseID}
        onChange={this.props.addRemoveCat}
        value={this.props.tags} defaultChecked
      />
    ) : (
      <input type="checkbox" id={this.props.subCauseID}
        onChange={this.props.addRemoveCat}
        value={this.props.tags}
      />
    );
    return (
      <div className="col s12 m4">
        <p>
          {minCat}
          <label htmlFor={this.props.subCauseID}>{this.props.title}</label>
        </p>
      </div>
    );
  }
});

var Needs = React.createClass({
  getInitialState: function () {
    return {
      needs: [{
        arrIndex: 0,
        title: "",
        description: "",
        cost: null,
        quantity_needed: null,
        active: "active"
      }]
    };
  },

  render: function () {
    let needs = this.props.needs.map(function(need, index) {
      return (
        <Need
          key={index}
          arrIndex={need.arrIndex}
          needTitle={need.title}
          needDescription={need.description}
          needCost={need.cost}
          needQuantityNeeded={need.quantity_needed}
          active={need.active}
          addNeed={this.props.addNeed}
          updateNeedTitle={this.props.updateNeedTitle}
          updateNeedDescription={this.props.updateNeedDescription}
          updateNeedCost={this.props.updateNeedCost}
          updateNeedQuantity={this.props.updateNeedQuantity}
        />
      );
    }.bind(this));

    //console.log("projectCreate/Needs/render/needs:",needs);

    return(
      <ul className="collapsible popout" data-collapsible="accordion">
        {needs}
      </ul>
    );
  }
});

var Need = React.createClass({
  updateNeedTitle: function (e) {
    var need = {
      arrIndex: this.props.arrIndex,
      title: e.target.value
    };
    this.props.updateNeedTitle(need);
  },

  updateNeedDescription: function (e) {
    var need = {
      arrIndex: this.props.arrIndex,
      description: e.target.value
    };
    this.props.updateNeedDescription(need);
  },

  updateNeedCost: function (e) {
    var need = {
      arrIndex: this.props.arrIndex,
      cost: e.target.value
    };
    this.props.updateNeedCost(need);
  },

  updateNeedQuantity: function (e) {
    var need = {
      arrIndex: this.props.arrIndex,
      quantity_needed: e.target.value
    };
    this.props.updateNeedQuantity(need);
  },

  componentWillMount: function() {
    $('.tooltipped').tooltip('remove');
  },

  componentDidMount: function () {
    $('.tooltipped').tooltip({delay: 20});
    $('input#need_description ').characterCounter();
  },

  render: function () {
    return(
      <li className={this.props.active}>
        {/*Form Header*/}
        <div className={"collapsible-header " + this.props.active}>
          <i className="material-icons">filter_drama</i>
          <strong>{this.props.needTitle !== "" ? this.props.needTitle : "Create a Need"}</strong>
          {this.props.active === "active" ?  <a className="btn-flat waves-effect waves-light right tooltipped" data-position="top" data-delay="20" data-tooltip="Add another need" onClick={this.props.addNeed}><i className="material-icons">library_add</i></a> : ""}

        </div>

        {/*Form Body*/}
        <div className="collapsible-body">
          <div className="row">
            <form className="container">

              {/*Need Title*/}
              <div className="row">
                <div className="input-field col s12">
                  <input
                    value={this.props.needTitle}
                    onChange={this.updateNeedTitle}
                    id="need_title"
                    type="text"
                    className="validate"
                    maxLength="20"
                  />
                    <label htmlFor="need_title">Need Title</label>
                </div>
              </div>

              {/*Need Description*/}
              <div className="row">
                <div className="input-field col s12">
                  <input
                    value={this.props.needDescription}
                    onChange={this.updateNeedDescription}
                    id="need_description"
                    type="text"
                    maxLength="120"/>
                  <label htmlFor="need_description">Need Description</label>
                </div>
              </div>

              {/*Need Cost*/}
              <div className="row">
                <div className="input-field col s12">
                  <input
                    value={this.props.needCost}
                    onChange={this.updateNeedCost}
                    id="need_cost"
                    type="number"
                    className="validate"
                    maxLength="6"
                  />
                  <label htmlFor="need_cost">Need Cost</label>
                </div>
              </div>

              {/*Need Quantity*/}
              <div className="row">
                <div className="input-field col s12">
                  <input
                    value={this.props.needQuantityNeeded}
                    onChange={this.updateNeedQuantity}
                    id="need_quantity"
                    type="number"
                    className="validate"
                    maxLength="5"
                  />
                  <label htmlFor="need_quantity">Need Quantity</label>
                </div>
              </div>

            </form>
          </div>
        </div>
      </li>
    );
  }
});
