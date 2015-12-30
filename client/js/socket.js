var feeder = io('http://localhost:4000/feed');

var feedData = [];

feeder.on('storeFeed', function(arrFeed) {
  console.log('Get Feed triggered: ', arrFeed);
  feedData = arrFeed || [];
  var i = setInterval(function() {
    feeder.emit('feed_updates', new Date())
  }, 10000)
});

feeder.on('updateFeed', function(arrFeed) {
  console.log('Being called')
  if (arrFeed.length) {
    console.log('Got new updates')
    feedData = feedData.concat(arrFeed);
  }
});
