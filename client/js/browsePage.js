//display list of areas of focus
import React from 'react';

var Browse = exports.Browse = React.createClass({

  loadAreasFromServer: function() {
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
  },
  render: function() {
  var self = this;
    console.log(self.props)
    var list = this.state.data.map(function(thumbnailProps) {
      return <Thumbnail header = {thumbnailProps.name} />
    })
    return <div>
      {list}
    </div>
  }
})

/*var Badge = React.createClass({
  render: function() {
    return <button className="btn btn-primary" type="button">
      {this.props.title} <span className="badge">{this.props.number}</span>
    </button>
  }
});*/


var Thumbnail = React.createClass({
  render: function() {
    return (<div>
          <div className="chip">
        {/*<img className = "image" src={this.props.imageUrl/>*/}
            {this.props.header}
          </div>
    </div>)
  }
})




var Options = exports.Options = {
  thumbnailData: [{
    title: "See tutorials",
    number: 12,
    header: 'Learn React',
    description: 'React is cool and fantastic React is cool and fantastic React is cool and fantastic React is cool and fantastic',
    imageUrl: 'https://facebook.github.io/react/img/logo.svg'
  },{
    title: "Show Courses",
    number: 25,
    header: 'Learn Gulp',
    description: 'Gulp is cool and fantastic Gulp is cool and fantastic Gulp is cool and fantastic React is cool and fantastic',
    imageUrl: 'https://raw.githubusercontent.com/gulpjs/artwork/master/gulp-2x.png'
  },{
    title: "hey",
    number: 99,
    header: 'Learn more gulp',
    description: 'Gulp is cool and fantastic Gulp is cool and fantastic Gulp is cool and fantastic React is cool and fantastic',
    imageUrl: 'https://raw.githubusercontent.com/gulpjs/artwork/master/gulp-2x.png'
  },{
    title: "See tutorials",
    number: 12,
    header: 'Learn React',
    description: 'React is cool and fantastic React is cool and fantastic React is cool and fantastic React is cool and fantastic',
    imageUrl: 'https://facebook.github.io/react/img/logo.svg'
  },{
    title: "Show Courses",
    number: 25,
    header: 'Learn Gulp',
    description: 'Gulp is cool and fantastic Gulp is cool and fantastic Gulp is cool and fantastic React is cool and fantastic',
    imageUrl: 'https://raw.githubusercontent.com/gulpjs/artwork/master/gulp-2x.png'
  },{
    title: "hey",
    number: 99,
    header: 'Learn more gulp',
    description: 'Gul,p is cool and fantastic Gulp is cool and fantastic Gulp is cool and fantastic React is cool and fantastic',
    imageUrl: 'https://raw.githubusercontent.com/gulpjs/artwork/master/gulp-2x.png'
  },{
    title: "See tutorials",
    number: 12,
    header: 'Learn React',
    description: 'React is cool and fantastic React is cool and fantastic React is cool and fantastic React is cool and fantastic',
    imageUrl: 'https://facebook.github.io/react/img/logo.svg'
  },{
    title: "Show Courses",
    number: 25,
    header: 'Learn Gulp',
    description: 'Gulp is cool and fantastic Gulp is cool and fantastic Gulp is cool and fantastic React is cool and fantastic',
    imageUrl: 'https://raw.githubusercontent.com/gulpjs/artwork/master/gulp-2x.png'
  },{
    title: "hey",
    number: 99,
    header: 'Learn more gulp',
    description: 'Gulp is cool and fantastic Gulp is cool and fantastic Gulp is cool and fantastic React is cool and fantastic',
    imageUrl: 'https://raw.githubusercontent.com/gulpjs/artwork/master/gulp-2x.png'
  },{
    title: "See tutorials",
    number: 12,
    header: 'Learn React',
    description: 'React is cool and fantastic React is cool and fantastic React is cool and fantastic React is cool and fantastic',
    imageUrl: 'https://facebook.github.io/react/img/logo.svg'
  },{
    title: "Show Courses",
    number: 25,
    header: 'Learn Gulp',
    description: 'Gulp is cool and fantastic Gulp is cool and fantastic Gulp is cool and fantastic React is cool and fantastic',
    imageUrl: 'https://raw.githubusercontent.com/gulpjs/artwork/master/gulp-2x.png'
  },{
    title: "hey",
    number: 99,
    header: 'Learn more gulp',
    description: 'Gulp is cool and fantastic Gulp is cool and fantastic Gulp is cool and fantastic React is cool and fantastic',
    imageUrl: 'https://raw.githubusercontent.com/gulpjs/artwork/master/gulp-2x.png'
  },{
    title: "See tutorials",
    number: 12,
    header: 'Learn React',
    description: 'React is cool and fantastic React is cool and fantastic React is cool and fantastic React is cool and fantastic',
    imageUrl: 'https://facebook.github.io/react/img/logo.svg'
  },{
    title: "Show Courses",
    number: 25,
    header: 'Learn Gulp',
    description: 'Gulp is cool and fantastic Gulp is cool and fantastic Gulp is cool and fantastic React is cool and fantastic',
    imageUrl: 'https://raw.githubusercontent.com/gulpjs/artwork/master/gulp-2x.png'
  },{
    title: "hey",
    number: 99,
    header: 'Learn more gulp',
    description: 'Gulp is cool and fantastic Gulp is cool and fantastic Gulp is cool and fantastic React is cool and fantastic',
    imageUrl: 'https://raw.githubusercontent.com/gulpjs/artwork/master/gulp-2x.png'
  },{
    title: "See tutorials",
    number: 12,
    header: 'Learn React',
    description: 'React is cool and fantastic React is cool and fantastic React is cool and fantastic React is cool and fantastic',
    imageUrl: 'https://facebook.github.io/react/img/logo.svg'
  },{
    title: "Show Courses",
    number: 25,
    header: 'Learn Gulp',
    description: 'Gulp is cool and fantastic Gulp is cool and fantastic Gulp is cool and fantastic React is cool and fantastic',
    imageUrl: 'https://raw.githubusercontent.com/gulpjs/artwork/master/gulp-2x.png'
  },{
    title: "hey",
    number: 99,
    header: 'Learn more gulp',
    description: 'Gulp is cool and fantastic Gulp is cool and fantastic Gulp is cool and fantastic React is cool and fantastic',
    imageUrl: 'https://raw.githubusercontent.com/gulpjs/artwork/master/gulp-2x.png'
  },{
    title: "See tutorials",
    number: 12,
    header: 'Learn React',
    description: 'React is cool and fantastic React is cool and fantastic React is cool and fantastic React is cool and fantastic',
    imageUrl: 'https://facebook.github.io/react/img/logo.svg'
  },{
    title: "Show Courses",
    number: 25,
    header: 'Learn Gulp',
    description: 'Gulp is cool and fantastic Gulp is cool and fantastic Gulp is cool and fantastic React is cool and fantastic',
    imageUrl: 'https://raw.githubusercontent.com/gulpjs/artwork/master/gulp-2x.png'
  },{
    title: "hey",
    number: 99,
    header: 'Learn more gulp',
    description: 'Gulp is cool and fantastic Gulp is cool and fantastic Gulp is cool and fantastic React is cool and fantastic',
    imageUrl: 'https://raw.githubusercontent.com/gulpjs/artwork/master/gulp-2x.png'
  },{
    title: "See tutorials",
    number: 12,
    header: 'Learn React',
    description: 'React is cool and fantastic React is cool and fantastic React is cool and fantastic React is cool and fantastic',
    imageUrl: 'https://facebook.github.io/react/img/logo.svg'
  },{
    title: "Show Courses",
    number: 25,
    header: 'Learn Gulp',
    description: 'Gulp is cool and fantastic Gulp is cool and fantastic Gulp is cool and fantastic React is cool and fantastic',
    imageUrl: 'https://raw.githubusercontent.com/gulpjs/artwork/master/gulp-2x.png'
  },{
    title: "hey",
    number: 99,
    header: 'Learn more gulp',
    description: 'Gulp is cool and fantastic Gulp is cool and fantastic Gulp is cool and fantastic React is cool and fantastic',
    imageUrl: 'https://raw.githubusercontent.com/gulpjs/artwork/master/gulp-2x.png'
  },{
    title: "See tutorials",
    number: 12,
    header: 'Learn React',
    description: 'React is cool and fantastic React is cool and fantastic React is cool and fantastic React is cool and fantastic',
    imageUrl: 'https://facebook.github.io/react/img/logo.svg'
  },{
    title: "Show Courses",
    number: 25,
    header: 'Learn Gulp',
    description: 'Gulp is cool and fantastic Gulp is cool and fantastic Gulp is cool and fantastic React is cool and fantastic',
    imageUrl: 'https://raw.githubusercontent.com/gulpjs/artwork/master/gulp-2x.png'
  },{
    title: "hey",
    number: 99,
    header: 'Learn more gulp',
    description: 'Gulp is cool and fantastic Gulp is cool and fantastic Gulp is cool and fantastic React is cool and fantastic',
    imageUrl: 'https://raw.githubusercontent.com/gulpjs/artwork/master/gulp-2x.png'
  }]
}


// var element = React.createElement(Browse, options);