//display list of areas of focus
import React from 'react';
import { Link } from 'react-router';

var Browse = exports.Browse = React.createClass({

/*  loadAreasFromServer: function() {
    $.ajax({
      url: '/aofs',
      method:'GET',
      dataType: 'json',
      cache: false,
      success: function(data) {
        console.log(data);
        this.setState({data: data.results});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  getInitialState: function() {
    return {data: []};
  },
  componentDidMount: function() {
    this.loadAreasFromServer();
  },*/
  render: function() {
/*  var self = this;
    console.log(self.props)
    var list = this.state.data.map(function(thumbnailProps) {
      return <Thumbnail header = {thumbnailProps.name} />
    })*/
    return <div>
    <div className="container">
      <div className="row">


        <div className="col s3">
          <div className="card">
            <div className="card-image waves-effect waves-block waves-light">
             <img className="activator" img className = "image" src="https://c2.staticflickr.com/6/5477/10570079866_b622f2a732_b.jpg" />
             <span className="card-title">Animals</span>
            </div>
          </div>
        </div>
        <div className="col s3">
          <div className="card">
            <div className="card-image">
             <img className="activator" img className = "image" src="https://c2.staticflickr.com/6/5477/10570079866_b622f2a732_b.jpg" />
              <span className="card-title">Arts, Culture, Humanities</span>
            </div>
          </div>
        </div>
              <div className="col s12">
          <div className="card">
            <div className="card-image">
             <img className="activator" img className = "image" src="https://c2.staticflickr.com/6/5477/10570079866_b622f2a732_b.jpg" />
              <span className="card-title">Card Title</span>
            </div>
          </div>
        </div>
                <div className="col s12">
          <div className="card">
            <div className="card-image">
             <img className="activator" img className = "image" src="https://c2.staticflickr.com/6/5477/10570079866_b622f2a732_b.jpg" />
              <span className="card-title">Card Title</span>
            </div>
          </div>
        </div>
                <div className="col s12">
          <div className="card">
            <div className="card-image">
             <img className="activator" img className = "image" src="https://c2.staticflickr.com/6/5477/10570079866_b622f2a732_b.jpg" />
              <span className="card-title">Card Title</span>
            </div>
          </div>
        </div>
                <div className="col s12">
          <div className="card">
            <div className="card-image">
             <img className="activator" img className = "image" src="https://c2.staticflickr.com/6/5477/10570079866_b622f2a732_b.jpg" />
              <span className="card-title">Card Title</span>
            </div>
          </div>
        </div>
                <div className="col s6">
          <div className="card">
            <div className="card-image">
             <img className="activator" img className = "image" src="https://c2.staticflickr.com/6/5477/10570079866_b622f2a732_b.jpg" />
              <span className="card-title">Card Title</span>
            </div>
          </div>
        </div>
                <div className="col s6">
          <div className="card small">
            <div className="card-image">
             <img className="activator" img className = "image" src="https://c2.staticflickr.com/6/5477/10570079866_b622f2a732_b.jpg" />
              <span className="card-title">Card Title</span>
            </div>
          </div>
        </div>


      </div>
      </div>

    </div>
  }
});

/*var Badge = React.createClass({
  render: function() {
    return <button className="btn btn-primary" type="button">
      {this.props.title} <span className="badge">{this.props.number}</span>
    </button>
  }
});*/

/*
var Thumbnail = React.createClass({
  render: function() {
    return   (
      <div>
        <div className="container">
          <div className="row">
            <div className="col s12">
              <div className="card small hoverable">
                <div className="card-image waves-effect waves-block waves-light">
                  <img className="activator" img className = "image" src={this.props.imageUrl} />
                </div>
                <div className="card-content">
                  <span className="card-title activator grey-text text-darken-4">{this.props.header}<i className="material-icons right">more_vert</i></span>
                  <p><a href="#">This is a link</a></p>
                </div>
                <div className="card-reveal">
                  <span className="card-title grey-text text-darken-4">{this.props.title}<i className="material-icons right">close</i></span>
                  <p>{this.props.description}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );*/

/*    (<div>
      <div className="row">
        <div className="col s12 m6">
          <div img className = "image" src={this.props.imageUrl}>
            <div className="card-content black-text">
              <span className="card-title">{this.props.header}</span>
              <p></p>
            </div>
            <div className="card-action">
              <a href="#">This is a link</a>

            </div>
          </div>
        </div>
      </div>
      </div>)*/


/*
  }
});*/

/*          <div className="chip">
            <img className = "image" src={this.props.imageUrl} />
            {this.props.header}
          </div>*/

