import React from 'react';
import { Link, History } from 'react-router';

import { DonateNeeds } from './needs.js';

exports.Donate = React.createClass({
  getInitialState: function () {
    return {
      project: {},
      needs_list: [],
      quantityTotal: 0,
      donationTotal: 0
    };
  },

  updateNumberPurchased: function (need) {
    var needs = this.state.needs_list;
    var originalQuantityNeeded = this.state.project.needs_list[need.arrIndex].quantity_needed;

    needs[need.arrIndex].number_purchased = Number(need.number_purchased);
    needs[need.arrIndex].quantity_needed = originalQuantityNeeded - need.number_purchased;

    this.setState({
      needs_list: needs
    });
    this.updateTotals();
  },

  updateTotals: function () {
    var quantityTotal = this.state.needs_list.map(function (need) {
      return need.number_purchased || 0;
    }).reduce(function (previous, current) {
      return previous += current;
    }, 0);

    var donationTotal = this.state.needs_list.map(function (need) {
      return need.cost * need.number_purchased || 0;
    }).reduce(function (previous, current) {
      return previous += current;
    }, 0);
    this.setState({
      quantityTotal: quantityTotal,
      donationTotal: donationTotal
    });
  },

  componentDidMount: function () {
    $.ajax({
      url:'/project_get/'+localStorage.currentProjID,
      method: "GET",
      success: function (data) {
        console.log("on success in projdid with params.id and data.results.needs_list:", data.results.needs_list);
        var needs_list = JSON.parse(JSON.stringify(data.results.needs_list));
        needs_list = needs_list.map(function (need) {
          need.number_purchased = 0;
          return need;
        });

        this.setState({
          project: data.results,
          needs_list: needs_list
        });
        console.log('inside of success of projdid and needs_list ', needs_list);
        $('select').material_select();
      }.bind(this),
      error: function (xhr, status, err) {
        console.error(xhr, status, err.toString());
      }.bind(this)
    });
  },

  render: function () {
    if(this.state.project) {
      if (this.state.needs_list.length > 0) {
        var needs = this.state.needs_list.map(function (need, index) {
          return (
            <DonateNeeds
              key={index}
              arrIndex={index}
              title={need.title}
              description={need.description}
              cost={need.cost}
              originalQuantityNeeded={this.state.project.needs_list[index].quantity_needed}
              quantity_needed={need.quantity_needed}
              number_purchased={need.number_purchased}
              updateNumberPurchased={this.updateNumberPurchased}
            />
          );
        }.bind(this));
      }
    }
    return(
      <div className="container">
        <h4 className="center-align">Select the quantity of each need you'd like to contribute to:</h4>

        {/*Totals*/}
        <div className="row">
          <div className="col s4">
            <h4>{this.state.project.title}</h4>
          </div>
          <div className="col s4">
            <h5>Total Quantity: {this.state.quantityTotal}</h5>
          </div>
          <div className="col s4 right-align">
            <h5>Total Donation: ${this.state.donationTotal}</h5>
          </div>
        </div>

        {/*Needs Form*/}
        <form action="">
          {needs ? needs : <div>Nothing to display</div>}
        </form>

        {/*Totals*/}
        <div className="row">
          <div className="col s4">
            <h4>{this.state.project.title}</h4>
          </div>
          <div className="col s4">
            <h5>Total Quantity: {this.state.quantityTotal}</h5>
          </div>
          <div className="col s4 right-align">
            <h5>Total Donation: ${this.state.donationTotal}</h5>
          </div>
        </div>

        {/*Payment Form*/}

      </div>
    );
  }
});
