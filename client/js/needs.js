import React from 'react';
import { Link, History } from 'react-router';

exports.Needs = React.createClass({
  navigateToDonate: function () {
    this.props.navigateToDonate();
  },

  render: function() {
    console.log("Needs/render/this.props:",this.props);
    return (
      <div className="card blue-grey darken-1" onClick={this.navigateToDonate}>
        <div className="card-content white-text">
          <span className="card-title">{this.props.title}</span>
          <p>description: {this.props.description}</p>
          <p>cost: {this.props.cost}</p>
          <p>needed: {this.props.quantity_needed}</p>
          <p>purchased: {this.props.number_purchased}</p>
        </div>
        <div className="card-action">
          <a href="#">Buy Shoes for Kids</a>
        </div>
      </div>
    );
  }
});

exports.DonateNeeds = React.createClass({
  updateNumberPurchased: function (e) {
    //console.log("DonateNeeds/uNP/this.props.arrIndex:",this.props.arrIndex);
    var need = {
      arrIndex: this.props.arrIndex,
      number_purchased: e.target.value
    };
    this.props.updateNumberPurchased(need);
  },

  render: function() {
    var subTotal = this.props.cost * this.props.number_purchased;
    //console.log("Needs/render/this.props.quantity_needed:",this.props.quantity_needed);
    return (
      <div className="row valign-wrapper">
        <div className="col s4">
          <div className="card blue-grey darken-1" onClick={this.navigateToDonate}>
            <div className="card-content white-text">
              <span className="card-title">{this.props.title}</span>
              <p>description: {this.props.description}</p>
              <p>cost: {this.props.cost}</p>
              <p>needed: {this.props.quantity_needed}</p>
              <p>purchased: {this.props.number_purchased}</p>
            </div>
          </div>
        </div>
        <div className="col s4 valign">
          <label htmlFor="quantity">Quantity</label>
          <div className="input-field col s12">
            <input
              id="quantity"
              type="number"
              className="validate"
              min="0"
              max={this.props.originalQuantityNeeded}
              value={this.props.number_purchased ? this.props.number_purchased : 0}
              onChange={this.updateNumberPurchased}
            />
          </div>
        </div>
        <div className="col s4 valign right-align">
          <div>Total</div>
          <h5>${this.props.number_purchased ? (subTotal) : 0}</h5>
        </div>
      </div>
    );
  }
});