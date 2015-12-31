"use strict";
var React = require('react');
import { History } from 'react-router';

exports.DonorFeed = React.createClass({
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
      <div className="container">
        <h4 className="center">Feed</h4>
        <div>
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
                  <tbody key={idx}>
                    <tr className="feed-row">
                      <td className="feed-username">
                        <strong>{item.user === this.props.user ? "You" : item.user}</strong>
                      </td>
                      <td className="feed-date">{item.created_date}</td>
                    </tr>
                    <tr>
                      <td className="feed-message" colSpan="2">{item.message}</td>
                    </tr>
                    <tr>
                      <td className="feed-attachment" colSpan="2">{attachment}</td>
                    </tr>
                  </tbody>
                )
              }.bind(this))}
          </table>
        </div>
      </div>
    )
  }
});
