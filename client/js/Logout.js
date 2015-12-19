import { History } from 'react-router';
import React from 'react';
import auth from '../utils/auth';


const Logout = React.createClass({
  mixins: [ History ],
  componentDidMount() {
    auth.logout()
  },

  render() {
    return <p>You are now logged out</p>
  }
});

export default Logout
