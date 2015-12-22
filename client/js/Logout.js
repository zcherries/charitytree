import { History } from 'react-router';
import React from 'react';
// import auth from '../utils/auth';

const Logout = React.createClass({
  mixins: [ History ],
  componentDidMount() {
    $.ajax({
      type: 'POST',
      url: '/logout_post',
      success: function (response) {
        localStorage.clear();
        this.props.isLoggedIn();
        this.props.history.pushState(null, `/`);
        // }.bind(this), 1000);
      }.bind(this),
      error: function (xhr, status, err) {
        console.log("Error posting to: " + xhr, status, err.toString());
      }.bind(this)
    });
  },

  render() {
    return <div></div>
  }
});

export default Logout
