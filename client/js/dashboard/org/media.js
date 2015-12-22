"use strict";
var React = require('react');
var ReactDOM = require('react-dom');

var Media = exports.Media = React.createClass({

  getInitialState: function() {
    return {
      profile_img: {}
    }
  },

  upload_profile_img: function(e) {
    e.preventDefault();

    var $form = $('.' + e.target.className);
    var formData = new FormData($form.get(0));
    console.log("Form data: ", formData);
    $.ajax({
      method: 'POST',
      url: $form.attr('action'),
      dataType: 'json',
      contentType: false,
      cache: false,
      processData: false,
      data: formData,
      success:function(response) {
        console.log("Post Success: ", response.results);
        this.setState({ profile_img: response.results });
        this.props.update_db_state_prop('profile_img', response.results);
      }.bind(this),
      error: function(error){
        console.log(error);
      }
    });
  },

  profile_img_upload_form: function() {
    return (
      <form className="profile_img_frm" onSubmit={this.upload_profile_img} action="/dashboard/media/profile_img/upload" encType="multipart/form-data" accept="image/*">
        {/*<label htmlFor="profile_img">Choose profile image</label>*/}
        <input id="profile_img" type="file" name="profile_img" />
        <input type="submit" value="Upload" />
      </form>
    )
  },

  profile_and_banner_img: function() {
    var profile_img;
    if (this.state.profile_img.contentType && this.state.profile_img.path) {
      profile_img = "data:" + this.state.profile_img.contentType + ";base64," + this.state.profile_img.path
    } else if (this.props.media.profile_img) {
      profile_img = "data:" + this.props.media.profile_img.contentType + ";base64," + this.props.media.profile_img.path
    } else {
      profile_img = "http://previews.123rf.com/images/kritchanut/kritchanut1406/kritchanut140600093/29213195-Male-silhouette-avatar-profile-picture-Stock-Vector-profile.jpg";
    }
    return (
      <div className="row">
        <div className="float-left">
          <h5>Profile Image</h5>
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
        </div>

        <div>
          <h5>Videos</h5>
        </div>

        <div className="upload_assorted">
          <h5>Upload Media</h5>
          <Upload />
        </div>
      </div>
    )
  }
});


// ================================================================================
var Upload = exports.Upload = React.createClass({
    componentDidMount: function() {
      var isAdvancedUpload = function() {
        var div = document.createElement('div');
        return (('draggable' in div) || ('ondragstart' in div && 'ondrop' in div))
        && 'FormData' in window && 'FileReader' in window;
      }();

      var $form = $('.box');
      var $input = $form.find('input[type="file"]'), $label = $form.find('label'),
         showFiles = function(files) {
           $label.text(files.length > 1 ? ($input.attr('data-multiple-caption') || '').replace( '{count}', files.length ) : files[ 0 ].name);
         };

      if (isAdvancedUpload) { $form.addClass('has-advanced-upload'); }

      if (isAdvancedUpload) {
        var droppedFiles = false;

        $form.on('drag dragstart dragend dragover dragenter dragleave drop', function(e) {
          e.preventDefault();
          e.stopPropagation();
        })
        .on('dragover dragenter', function() {
          $form.addClass('is-dragover');
        })
        .on('dragleave dragend drop', function() {
          $form.removeClass('is-dragover');
        })
        .on('drop', function(e) {
          droppedFiles = e.originalEvent.dataTransfer.files;
          showFiles( droppedFiles );
        //   $form.trigger('submit');
        });
      }

      $input.on('change', function(e) {
        console.log('Here')
        console.log('Target Files: ', e.target.files)
        showFiles(e.target.files);
      });

      $form.on('submit', function(e) {
        console.log('Clicked Upload')
        if ($form.hasClass('is-uploading')) return false;

        $form.addClass('is-uploading').removeClass('is-error');

        if (isAdvancedUpload) {
          // ajax for modern browsers
          console.log('Advanced Upload')
          ajaxModern(e);
        } else {
          // ajax for legacy browsers
          nonModernAjax();
        }
      });

      var ajaxModern = function(e) {
        e.preventDefault();
        var ajaxData = new FormData($form[0]);

        if (droppedFiles) {
          console.log('Dropped Files Exist')
          $.each( droppedFiles, function(i, file) {
            ajaxData.append( $input.attr('name'), file );
            // sendFile(file);
          });
        }
        console.log('AJAX Data: ', ajaxData);
        $.ajax({
          url: $form.attr('action'),
          type: $form.attr('method'),
          data: ajaxData,
          // dataType: 'json',
          cache: false,
          contentType: false,
          processData: false,
          complete: function() {
            $form.removeClass('is-uploading');
          },
          success: function(data) {
            $form.addClass( data.success == true ? 'is-success' : 'is-error' );
            if (!data.success)
              console.log(data.error);
          },
          error: function() {
            // Log the error, show an alert, whatever works for you
          }
        });
      };

      var nonModernAjax = function() {
        var iframeName  = 'uploadiframe' + new Date().getTime();
          $iframe   = $('<iframe name="' + iframeName + '" style="display: none;"></iframe>');

        $('body').append($iframe);
        $form.attr('target', iframeName);

        $iframe.one('load', function() {
          var data = JSON.parse($iframe.contents().find('body' ).text());
          $form
            .removeClass('is-uploading')
            .addClass(data.success == true ? 'is-success' : 'is-error')
            .removeAttr('target');
          if (!data.success) $errorMsg.text(data.error);
          $form.removeAttr('target');
          $iframe.remove();
        });
      };
    },

    getInitialState: function () {
      return {
        files: []
      };
    },

    onOpenClick: function () {
      this.refs.dropzone.open();
    },

    render: function () {
      return (
        <div className="form-media-upload">
          <form className="box" method="post" action="/dashboard/media/upload" encType="multipart/form-data">
            <div className="box__input">
              <input className="box__file" type="file" name="media" id="file" data-multiple-caption="{count} files selected" multiple />
              <label htmlFor="file"><strong>Choose a file</strong><span className="box__dragndrop"> or drag it here</span>.</label>
              <button className="box__button" type="submit">Upload</button>
            </div>
            <div className="box__uploading">Uploading&hellip;</div>
            <div className="box__success">Done!</div>
            <div className="box__error">Error! <span></span>.</div>
          </form>
        </div>
      );
    }
});
