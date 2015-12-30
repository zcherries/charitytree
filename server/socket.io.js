var Model = require('./db/models');

var clients = {};

var union = function(/*arrays*/) {
  var args = [].slice.call(arguments), result = [];
  args.forEach(function(arg) {
    arg.forEach(function(e) {
      if (result.indexOf(e) === -1) { result.push(e); }
    });
  });
  return result;
};

var flatten = function(array, shallow) {
	var result = [];
	if (shallow) {
		array.forEach(function(e) {
			result = result.concat(e);
		});
	}
	else {
			array.forEach(function(e) {
			if (typeof e === 'object' && e.hasOwnProperty('length'))
				result = result.concat(flatten(e));
			else
				result = result.concat(e);
		});
	}
	return result;
}

module.exports = function(server) {
  var io = require('socket.io')(server);
  var feed = io.of('/feed');

  feed.on('connection', function(client) {

    client.on('feed_updates', function(time) {
      var feed_sources = [];
      Model.Donor.findById(clients[client.id], function(err, donor) {
        if (err) { throw err; }
        if (donor) {
          for (var i = 0; i < donor.following.length; i++) {
            (function(orgID, idx) {
              Model.Organization.findById(orgID, function(err, org) {
                feed_sources[idx] = org.feed.filter(function(item) {
                  return item.created_date > time;
                });
                if (feed_sources.length === donor.following.length) {
                  client.emit('updateFeed', flatten(feed_sources));
                }
              });
            })(donor.following[i], i)
          }
        }
        else {
          Model.Organization.findById(clients[client.id], function(err, org) {
            if (err) throw err;
            if (org) {
              for (var i = 0; i < org.followers.length; i++) {
                (function(donorID, idx) {
                  Model.Donor.findById(donorID, function(err, donor) {
                    feed_sources[idx] = donor.feed.filter(function(item) {
                      return item.created_date > time;
                    });
                    if (feed_sources.length === org.followers.length) {
                      client.emit('updateFeed', flatten(feed_sources));
                    }
                  });
                })(org.followers[i], i)
              }
            }
          });
        }
      });
    });

    client.on('getFeed', function(token) {
      clients[client.id] = token;
      var feed_sources = [];
      Model.Donor.findById(token, function(err, donor) {
        if (err) { throw err; }
        if (donor) {
          for (var i = 0; i < donor.following.length; i++) {
            (function(orgID, idx) {
              Model.Organization.findById(orgID, function(err, org) {
                feed_sources[idx] = org.feed;
                if (feed_sources.length === donor.following.length) {
                  client.emit('storeFeed', flatten(feed_sources));
                }
              });
            })(donor.following[i], i)
          }
        }
        else {
          Model.Organization.findById(token, function(err, org) {
            if (err) throw err;
            if (org) {
              for (var i = 0; i < org.followers.length; i++) {
                (function(donorID, idx) {
                  Model.Donor.findById(donorID, function(err, donor) {
                    feed_sources[idx] = donor.feed;
                    if (feed_sources.length === org.followers.length) {
                      client.emit('storeFeed', flatten(feed_sources));
                    }
                  });
                })(org.followers[i], i)
              }
            }
          });
        }
      });
    });

    //this is an organization or donor action
    client.on('disconnect', function() {
      console.log('Client has been disconnected');
      // clients.forEach(function(cl, idx) {
      //   if (cl['client_id'] === client.id) {
      //     clients.splice(idx, 1);
      //     console.log('Client with id: ' + client.id  + ' has logged out');
      //   }
      // })
      delete clients[client.id];
      console.log('Client with id: ' + client.id  + ' has logged out');
      client.emit('stopPolling');
    });

    //this is a donor action
    client.on('follow', function(donorID, orgID) {
      console.log('Follow Data: ', donorID, orgID);
      var now = new Date();
      Model.Organization.findById(orgID, function(err, org) {
        if (err) throw err;
        else {
          if (org.followers.indexOf(donorID) === -1) {
            Model.Donor.findById(donorID, function(err, donor) {
              if (err) throw err;
              if (donor) {
                if (donor.following.indexOf(orgID) === -1) {
                  org.followers.push(donorID);
                  org.feed.push({
                    user: donor.name.first + " " + donor.name.last,
                    message: "started following you",
                    created_date: now
                  });
                  donor.following.push(orgID);
                  donor.feed.push({
                    message: 'started following ' + org.name,
                    created_date: now
                  });
                  org.save(function(err) {
                    if (err) throw err;
                    donor.save(function(err, updatedDonor) {
                      if (err) throw err;
                      else {
                        console.log('Saving donor info')
                      }
                    });
                  });
                }
              }
            });
          }
        }
      });
    });

    //this is a donor action
    client.on('donation', function(donorID, projectID, amount) {
      var now = new Date();
      Model.Donor.findById(donorID, function(err, donor) {
        if (err) throw err;
        if (donor) {
          donor.feed.push({
            message: "donated " + amount + "to " + project.title,
            created_date: now
          });
          donor.save(function(err) {
            if (err) { console.error(err); }
            else {
              Model.Project.findById(projectID, function(err, project) {
                if (err) throw err;
                if (project) {
                  Model.Organization.findById(project._org, function(err, org) {
                    if (err) throw err;
                    if (org) {
                      org.feed.push({
                        user: donor.name.first + " " + donor.name.last,
                        message: "donated " + amount + "to " + project.title,
                        created_date: now
                      });
                      org.save();
                    }
                  });
                }
              });
            }
          });
        }
      });
    });

    //donor action
    client.on('endorsement', function(donorID, orgID) {
      var now = new Date();
      Model.Donor.findById(donorID, function(err, donor) {
        if (err) throw err;
        if (donor) {
          donor.feed.push({
            message: 'endorsed' + org.name,
            created_date: now
          });
          donor.save(function(err) {
            Model.Organization.findById(orgID, function(err, org) {
              if (err) throw err;
              if (org) {
                org.feed.push({
                  user: donor.name.first + " " + donor.name.last,
                  message: "endorsed you",
                  created_date: now
                });
                org.save();
              }
            });
          });
        }
      });
    });

    //this is an org action
    client.on('project update', function(orgID, projectID) {
      var now = new Date();
      //find all donors sponsoring this projectID and all donors following this Org
      Model.Organization.findById(orgID, function(err, org) {
        if (err) throw err;
        if (org) {
          Model.Project.findById(projectID, function(err, project) {
            if (err) throw err;
            if (project) {
              var donorIDs = union(org.followers, project.sponsors);
              donorIDs.forEach(function(donorID) {
                Model.Donor.findById(donorID, function(err, donor) {
                  //update donor feed
                  donor.feed.push({ message: 'Project: ' + project.title + 'has been updated', created_date: now });
                  donor.save(function(err) {
                    if (err) throw err;
                    clients.forEach(function(cl) {
                      if (cl['user'] === donor._id) { //if client is connected
                        feed.to(client[0]).emit('storeFeed', donor.feed);
                      }
                    });
                  });
                });
              });
            }
          });
        }
      });
    });

    feed.on('org_update', function(orgID, data) {
      Model.Organization.findById(orgID, function(err, org) {
        if (err) throw err;
        if (org) {
          org.followers.forEach(function(follower) {
            Model.Donor.findById(follower, function(err, donor) {
              //update donor feed
              donor.feed.push({ message: data.message, created_date: new Date() });
              donor.save(function(err) {
                if (err) throw err;
                console.log('Org has updated its about');
                clients.forEach(function(cl) {
                  // client.emit('action', data);
                  console.log('Org has updated an image');
                  if (cl['user'] === donor._id) { //if client is connected
                    feed.to(client[0]).emit('storeFeed', donor.feed);
                  }
                });
              });
            });
          });
        }
      });
    });
  });

  return feed;

};
