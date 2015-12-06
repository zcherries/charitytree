//display list of areas of focus
import React from 'react';
import { Link } from 'react-router';

var Browse = exports.Browse = React.createClass({
  render: function() {
  var self = this;
    console.log(self.props)
    var list = self.props.route.options.thumbnailData.map(function(thumbnailProps) {
      return <Thumbnail {...thumbnailProps}/>
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
    return   (<div>
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
  </div>)

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



  }
})
/*          <div className="chip">
            <img className = "image" src={this.props.imageUrl} />
            {this.props.header}
          </div>*/



var Options = exports.Options = {
  thumbnailData: [{
    title: "Animals",
    number: 12,
    header: 'Animals',
    description: 'Animal Rights, Welfare, and Services (296) Wildlife Conservation (82) Zoos and Aquariums (72)',
    imageUrl: 'https://pbs.twimg.com/profile_images/636592875418046464/392UXhOt_400x400.png'
  },{
    title: "Arts, Culture, Humanities",
    number: 25,
    header: 'Learn Gulp',
    description: 'Gulp is cool and fantastic Gulp is cool and fantastic Gulp is cool and fantastic React is cool and fantastic',
    imageUrl: 'https://raw.githubusercontent.com/gulpjs/artwork/master/gulp-2x.png'
  },{
    title: "Community Development",
    number: 99,
    header: 'Learn more gulp',
    description: 'Gulp is cool and fantastic Gulp is cool and fantastic Gulp is cool and fantastic React is cool and fantastic',
    imageUrl: 'https://raw.githubusercontent.com/gulpjs/artwork/master/gulp-2x.png'
  },{
    title: "Education",
    number: 12,
    header: 'Learn React',
    description: 'React is cool and fantastic React is cool and fantastic React is cool and fantastic React is cool and fantastic',
    imageUrl: 'https://pbs.twimg.com/profile_images/636592875418046464/392UXhOt_400x400.png'
  },{
    title: "Environment",
    number: 25,
    header: 'Learn Gulp',
    description: 'Gulp is cool and fantastic Gulp is cool and fantastic Gulp is cool and fantastic React is cool and fantastic',
    imageUrl: 'https://raw.githubusercontent.com/gulpjs/artwork/master/gulp-2x.png'
  },{
    title: "Health",
    number: 99,
    header: 'Learn more gulp',
    description: 'Gul,p is cool and fantastic Gulp is cool and fantastic Gulp is cool and fantastic React is cool and fantastic',
    imageUrl: 'https://raw.githubusercontent.com/gulpjs/artwork/master/gulp-2x.png'
  },{
    title: "Human Services",
    number: 12,
    header: 'Learn React',
    description: 'React is cool and fantastic React is cool and fantastic React is cool and fantastic React is cool and fantastic',
    imageUrl: 'https://pbs.twimg.com/profile_images/636592875418046464/392UXhOt_400x400.png'
  },{
    title: "Human and Civil Rights",
    number: 25,
    header: 'Learn Gulp',
    description: 'Gulp is cool and fantastic Gulp is cool and fantastic Gulp is cool and fantastic React is cool and fantastic',
    imageUrl: 'https://raw.githubusercontent.com/gulpjs/artwork/master/gulp-2x.png'
  },{
    title: "International",
    number: 99,
    header: 'Learn more gulp',
    description: 'Gulp is cool and fantastic Gulp is cool and fantastic Gulp is cool and fantastic React is cool and fantastic',
    imageUrl: 'https://raw.githubusercontent.com/gulpjs/artwork/master/gulp-2x.png'
  },{
    title: "Religion",
    number: 12,
    header: 'Learn React',
    description: 'React is cool and fantastic React is cool and fantastic React is cool and fantastic React is cool and fantastic',
    imageUrl: 'https://pbs.twimg.com/profile_images/636592875418046464/392UXhOt_400x400.png'
  },{
    title: "Research and Public Policy",
    number: 25,
    header: 'Learn Gulp',
    description: 'Gulp is cool and fantastic Gulp is cool and fantastic Gulp is cool and fantastic React is cool and fantastic',
    imageUrl: 'https://raw.githubusercontent.com/gulpjs/artwork/master/gulp-2x.png'
  }]
}


// var element = React.createElement(Browse, options);