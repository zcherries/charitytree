import { History } from 'react-router';
import React from 'react';
import auth from '../utils/auth';


const Logout = React.createClass({
  mixins: [ History ],
  componentDidMount() {
    auth.logout();
    localStorage.clear();
    setTimeout(function () {
      this.props.history.pushState(null, `/`);
    }.bind(this), 1000);
  },

  render() {
    return <p>You are now logged out</p>
  }
});

export default Logout
