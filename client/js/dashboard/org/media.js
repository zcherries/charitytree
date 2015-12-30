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

  componentDidMount: function() {
    $('.materialboxed').materialbox();
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
    return ( <div className="container">
        <form
          className="center-align col s9"
          onSubmit={this.upload_profile_img}
          action="/dashboard/profile_img/upload"
          encType="multipart/form-data"
          accept="image/*">
            <div className="file-field input-field">
              <div className="btn blue">
                <span>File</span>
                <input type="file" />
              </div>
              <div className="file-path-wrapper">
                <input className="file-path validate" type="text" />
              </div>
            </div>
        </form>

        <input className="row marginTop center-align btn blue col s3" type="submit" value="Upload" />
    </div>
    );
  },

  profile_and_banner_img: function() {
    var profile_img = (this.state.profile_img['filename'] === undefined && this.props.media.profile_img === undefined)
      ? "http://previews.123rf.com/images/kritchanut/kritchanut1406/kritchanut140600093/29213195-Male-silhouette-avatar-profile-picture-Stock-Vector-profile.jpg"
      : (this.state.username) ? 'http://localhost:4000/dashboard_data/profile_img/'+ this.props.username + '/' + this.state.profile_img.filename
      : 'http://localhost:4000/dashboard_data/profile_img/'+ this.props.username + '/' + this.props.media.profile_img.filename;
    return (
      <div className="row">
        <div className="col s12 center-align">
          <h4>Profile Image</h4>
          <div>
            {this.profile_img_upload_form()}
          </div>
          <img className="materialboxed responsive-img center-image" src={profile_img} />
        </div>
        {/*<div className="col s12">
          <h5>Banner Image</h5>
        </div>*/}
      </div>
    )
  },

  render: function() {
    return (
      <div className="container">
        {this.profile_and_banner_img()}

        <div className="center-align">
          <h4>Pictures</h4>
          <div className="row">
            {this.props.media.images.map(function(file, idx) {
              return (
                <div key={idx} className="col s12 m6 l4">
                  <img className="materialboxed responsive-img" src={'http://localhost:4000/dashboard_data/media/'+file} />
                </div>
              );
            })}
          </div>
        </div>

        <div className="center-align">
          <h4>Videos</h4>
          <div className="row">
          {this.props.media.videos.map(function(file, idx) {
            return (
              <div key={idx} className="col s12 m6 l4">
                <video className="responsive-video" controls >
                  <source src={'http://localhost:4000/dashboard_data/media/'+file}/>
                </video>
              </div>
            );
          })}
          </div>
        </div>

        <div className="row center-align">
          <h4>Upload Picture or Video</h4>
          <MediaUpload action={"/dashboard/org/media/upload"} />
        </div>
      </div>
    )
  }
});
