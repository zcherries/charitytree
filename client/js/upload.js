"use strict";
var React = require('react');
import { Router, Route, Link, IndexRoute } from 'react-router';

var Upload = React.createClass({
  render: function() {
    return (
      <form className="box" method="post" action="/upload">
        <div className="box__input">
          <input className="box__file" type="file" name="files[]" id="file" data-multiple-caption="{count} files selected" multiple />
          <input name='org_id' type="hidden" className="org" value={} />
          <label htmlFor="file"><strong>Choose a file</strong><span className="box__dragndrop"> or drag it here</span>.</label>
          <button className="box__button" type="submit">Upload</button>
        </div>
        <div className="box__uploading">Uploading&hellip;</div>
        <div className="box__success">Done!</div>
        <div className="box__error">Error! <span></span>.</div>
      </form>
    )
  }
});
