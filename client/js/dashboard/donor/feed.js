"use strict";
var React = require('react');
import { History } from 'react-router';
import moment from 'moment';
moment().format();

exports.DonorFeed = React.createClass({
  getInitialState: function () {
    return {
      feedContent: feedData
    }
  },

  componentWillMount: function () {
    console.log('Feed Component is Mounting')
    this.setState({feedContent: feedData});
  },

  render: function () {
    return (
      <div className="container center-align">
        <h3>Feed</h3>
        <div>
          {this.state.feedContent.map(function (item, idx) {
            var attachment = '';
            if (item.attachment_type === 'image') {
              attachment = <img className="materialboxed responsive-img" src={item.attachment}/>;
              $('.feed-attachment').addClass('img');
            } else if (item.attachment_type === 'video') {
              attachment = <video className="responsive-video" src={item.attachment} controls/>;
              $('.feed-attachment').addClass('vid');
            }

            return (
              <ul className="collection with-header left-align" key={idx}>
                <li className="collection-header">
                  <div className="row">
                    <div className="col s12">
                      <h4>{item.user === this.props.user ? "You" : item.user}</h4>
                    </div>
                    <div className="col s8">
                      <p>{item.message}</p>
                    </div>
                    <div className="col s4">
                      <p><strong>{moment(item.created_date).format('MMMM D, YYYY - hh:mm A')}</strong></p>
                    </div>
                  </div>
                </li>
                <li className="collection-item">
                  <div>{attachment}</div>
                </li>
              </ul>
            )
          }.bind(this))}
        </div>
      </div>
    )
  }
});
