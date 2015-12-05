//display list of areas of focus
import React from 'react';

var Badge = React.createClass({
  render: function() {
    return <button className="btn btn-primary" type="button">
      {this.props.title} <span className="badge">{this.props.number}</span>
    </button>
  }
});


var Thumbnail = React.createClass({
  render: function() {
    return <div className="col-sm-6 col-md-6">
      <div className="thumbnail">
        <img src={this.props.imageUrl} />
          <div className="caption">
            <h3>{this.props.header}</h3>
            <p>{this.props.description}</p>
            <p>
              <Badge title={this.props.title} number={this.props.number}  />
            </p>
          </div>
      </div>
    </div>
  }
})


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
  }]
}


// var element = React.createElement(Browse, options);