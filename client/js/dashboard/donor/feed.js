"use strict";
var React = require('react');
import { History } from 'react-router';

exports.Feed = React.createClass({
  getInitialState: function() {
    return {
      feedContent: feedData
    }
  },

  componentWillMount: function() {
    console.log('Feed Component is Mounting')
    this.setState({ feedContent: feedData });
  },

  render: function() {
    return (
      <div>
        <h5>Feed</h5>
        <table className="feed">
            {this.state.feedContent.map(function(item, idx) {
              var attachment = '';
              if (item.attachment_type === 'image') {
                attachment = <img src={item.attachment} />
                $('.feed-attachment').addClass('img')
              }
              else if (item.attachment_type === 'video') {
                attachment = <video src={item.attachment} controls />
                $('.feed-attachment').addClass('vid')
              }

              return (
                <tbody>
                  <tr key={idx} className="feed-row">
                    <td className="feed-username">
                      <strong>{this.props.username !== item.user ? item.user : "You"}</strong>
                    </td>
                    <td className="feed-date">{item.created_date}</td>
                  </tr>
                  <tr>
                    <td className="feed-message" colspan="2">{item.message}</td>
                  </tr>
                  <tr>
                    <td className="feed-attachment" colspan="2">{attachment}</td>
                  </tr>
                </tbody>
              )
            }.bind(this))}
        </table>
      </div>
    )
  }
});
