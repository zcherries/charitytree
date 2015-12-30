"use strict";
var React = require('react');

import {MediaUpload} from '../media_upload.js'

exports.Media = React.createClass({
  componentWillReceiveProps: function(nextProps) {
    console.log("CWRP is firing", nextProps);
    if (nextProps.media.profile_img) {
      this.setState({ profile_img: nextProps.media.profile_img })
    }
  },

  getInitialState: function() {
    return {
      profile_img: {}
    }
  },

  upload_profile_img: function(e) {
    e.preventDefault();
    this.setState({ editing: true });
    var $form = $('.' + e.target.className);
    var formData = new FormData($form.get(0));
    // console.log("Form data: ", formData);
    $.ajax({
      method: 'POST',
      url: $form.attr('action'),
      // dataType: 'json',
      contentType: false,
      cache: false,
      processData: false,
      data: formData,
      success:function(response) {
        console.log("Post Success: ", response);
        // this.setState({ profile_img: response.results });
        this.props.update_db_state_prop({'profile_img': response.results});
      }.bind(this),
      error: function(error){
        console.log(error);
      }
    });
  },

  profile_img_upload_form: function() {
    return (
      <form className="profile_img_frm" onSubmit={this.upload_profile_img} action="/dashboard/profile_img/upload" encType="multipart/form-data" accept="image/*">
        {/*<label htmlFor="profile_img">Choose profile image</label>*/}
          <input className="file-field" id="profile_img" type="file" name="profile_img" />
          <input className="btn blue" type="submit" value="Upload" />
      </form>
    );
  },

  profile_and_banner_img: function() {
    var profile_img = (this.state.profile_img['filename'] === undefined && this.props.media.profile_img === undefined)
      ? "http://previews.123rf.com/images/kritchanut/kritchanut1406/kritchanut140600093/29213195-Male-silhouette-avatar-profile-picture-Stock-Vector-profile.jpg"
      : (this.state.username) ? 'http://localhost:4000/dashboard_data/profile_img/'+ this.props.username + '/' + this.state.profile_img.filename
      : 'http://localhost:4000/dashboard_data/profile_img/'+ this.props.username + '/' + this.props.media.profile_img.filename;
    return (
      <div className="row">
        <div className="float-left">
          <h5>Profile Image</h5>
          {/*<img className="profile_img" src={profile_img} />*/}
          <img className="profile_img" src={profile_img} />
          {this.profile_img_upload_form()}
        </div>
        <div className="float-left">
          <h5>Banner Image</h5>
        </div>
      </div>
    )
  },

  render: function() {
    return (
      <div className="media-content">
        {this.profile_and_banner_img()}

        <div>
          <h5>Pictures</h5>
          <div className="media-pg-images">
            {this.props.media.images.map(function(file, idx) {
              return (
                <div key={idx} className="media-pg-image">
                  <img className="media-pg-img" src={'http://localhost:4000/dashboard_data/media/'+file} />
                </div>
              )
            })}
          </div>
        </div>

        <div>
          <h5>Videos</h5>
          <div className="media-pg-videos">
          {this.props.media.videos.map(function(file, idx) {
            return (
              <div key={idx} className="media-pg-video">
                <video className="media-pg-vid" src={'http://localhost:4000/dashboard_data/media/'+file} controls />
              </div>
            )
          })}
          </div>
        </div>

        <div className="upload_assorted">
          <h5>Upload Media</h5>
          <MediaUpload action={"/dashboard/org/media/upload"} />
        </div>
      </div>
    )
  }
});
