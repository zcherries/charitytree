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

    <div className="center">
    <h1> Browse Page Fun </h1>
    </div>

    <div className="row">
    <div className="col s12 m9 l10">


      <div id="structure" className="section scrollspy">
        <p>Content </p>
      </div>

      <div id="initialization" className="section scrollspy">
        <p>Content </p>
      </div>
    </div>

  </div>


    <div className="container">
      <div className="row">



      <div className="col s4">
        <div className="card hoverable">
          <div className="card-image waves-effect waves-block waves-light">
            <img img className = "image activator" src="https://c1.staticflickr.com/5/4119/4931607222_92bf5fea5f_b.jpg" />
            <span className="card-title activator white-text">Animals</span>
          </div>
          <div className="card-reveal">
            <span className="card-title grey-text text-darken-4">Card Title<i className="material-icons right">close</i></span>
            <p>Animal Rights, Welfare, and Services <br/>
            Wildlife Conservation<br/>
            Zoos and Aquariums</p>
          </div>
        </div>
      </div>

      <div className="col s8">
        <div className="card hoverable">
          <div className="card-image waves-effect waves-block waves-light">
            <img img className = "image activator" src="https://c1.staticflickr.com/5/4077/4931032081_9d5ca8cfff_b.jpg" />
            <span className="card-title activator white-text">Arts, Culture, Humanities</span>
          </div>
          <div className="card-reveal">
            <span className="card-title grey-text text-darken-4">Card Title<i className="material-icons right">close</i></span>
            <p>Animal Rights, Welfare, and Services <br/>
            Wildlife Conservation<br/>
            Zoos and Aquariums</p>
          </div>
        </div>
      </div>
      <div className="col s9">
        <div className="card hoverable">
          <div className="card-image waves-effect waves-block waves-light">
            <img img className = "image activator" src="https://c1.staticflickr.com/9/8082/8380083742_098a5616b9_b.jpg" />
            <span className="card-title activator white-text">Community Development</span>
          </div>
          <div className="card-reveal">
            <span className="card-title grey-text text-darken-4">Card Title<i className="material-icons right">close</i></span>
            <p>Animal Rights, Welfare, and Services <br/>
            Wildlife Conservation<br/>
            Zoos and Aquariums</p>
          </div>
        </div>
      </div>
      <div className="col s3">
        <div className="card hoverable">
          <div className="card-image waves-effect waves-block waves-light">
            <img img className = "image activator" src="https://c1.staticflickr.com/5/4123/4931585570_d75507cee3_b.jpg" />
            <span className="card-title activator white-text">Education</span>
          </div>
          <div className="card-reveal">
            <span className="card-title grey-text text-darken-4">Card Title<i className="material-icons right">close</i></span>
            <p>Animal Rights, Welfare, and Services <br/>
            Wildlife Conservation<br/>
            Zoos and Aquariums</p>
          </div>
        </div>
      </div>
      <div className="col s6">
        <div className="card hoverable">
          <div className="card-image waves-effect waves-block waves-light">
            <img img className = "image activator" src="https://c1.staticflickr.com/5/4099/4931030575_033fca9b28_b.jpg" />
            <span className="card-title activator white-text">Environment</span>
          </div>
          <div className="card-reveal">
            <span className="card-title grey-text text-darken-4">Card Title<i className="material-icons right">close</i></span>
            <p>Animal Rights, Welfare, and Services <br/>
            Wildlife Conservation<br/>
            Zoos and Aquariums</p>
          </div>
        </div>
      </div>
      <div className="col s6">
        <div className="card hoverable">
          <div className="card-image waves-effect waves-block waves-light">
            <img img className = "image activator" src="https://c1.staticflickr.com/5/4119/4931607222_92bf5fea5f_b.jpg" />
            <span className="card-title activator white-text">Health</span>
          </div>
          <div className="card-reveal">
            <span className="card-title grey-text text-darken-4">Card Title<i className="material-icons right">close</i></span>
            <p>Animal Rights, Welfare, and Services <br/>
            Wildlife Conservation<br/>
            Zoos and Aquariums</p>
          </div>
        </div>
      </div>

      <div className="col s6">
        <div className="card hoverable">
          <div className="card-image waves-effect waves-block waves-light">
            <img img className = "image activator" src="https://c1.staticflickr.com/5/4115/4931010827_98907c06c2_b.jpg" />
            <span className="card-title activator white-text">Human Services</span>
          </div>
          <div className="card-reveal">
            <span className="card-title grey-text text-darken-4">Card Title<i className="material-icons right">close</i></span>
            <p>Animal Rights, Welfare, and Services <br/>
            Wildlife Conservation<br/>
            Zoos and Aquariums</p>
          </div>
        </div>
      </div>

      <div className="col s6">
        <div className="card hoverable">
          <div className="card-image waves-effect waves-block waves-light">
            <img img className = "image activator" src="https://c1.staticflickr.com/5/4099/4931620392_e3654db7dd_b.jpg" />
            <span className="card-title activator white-text">Human and Civil Rights</span>
          </div>
          <div className="card-reveal">
            <span className="card-title grey-text text-darken-4">Card Title<i className="material-icons right">close</i></span>
            <p>Animal Rights, Welfare, and Services <br/>
            Wildlife Conservation<br/>
            Zoos and Aquariums</p>
          </div>
        </div>
      </div>

      <div className="col s6">
        <div className="card hoverable">
          <div className="card-image waves-effect waves-block waves-light">
            <img img className = "image activator" src="https://c2.staticflickr.com/4/3793/10569512605_3815d5c4f2_b.jpg" />
            <span className="card-title activator white-text">International</span>
          </div>
          <div className="card-reveal">
            <span className="card-title grey-text text-darken-4">Card Title<i className="material-icons right">close</i></span>
            <p>Animal Rights, Welfare, and Services <br/>
            Wildlife Conservation<br/>
            Zoos and Aquariums</p>
          </div>
        </div>
      </div>

      <div className="col s6">
        <div className="card hoverable">
          <div className="card-image waves-effect waves-block waves-light">
            <img img className = "image activator" src="https://c1.staticflickr.com/5/4073/4931004261_af5c021afb_b.jpg" />
            <span className="card-title activator white-text">Religion</span>
          </div>
          <div className="card-reveal">
            <span className="card-title grey-text text-darken-4">Card Title<i className="material-icons right">close</i></span>
            <p>Animal Rights, Welfare, and Services <br/>
            Wildlife Conservation<br/>
            Zoos and Aquariums</p>
          </div>
        </div>
      </div>



      </div>
      </div>
    <div className="col l2 table-of-contents">
      <ul className="section table-of-contents">
        <li><a href="#introduction">Introduction</a></li>
        <li><a href="#structure">Structure</a></li>
        <li><a href="#initialization">Intialization</a></li>
      </ul>
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
    return (
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

