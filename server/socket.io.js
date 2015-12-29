var Model = require('./db/models');

module.exports = function(server) {
  var io = require('socket.io')(server);
  var clients = [];

  var feed = io.of('/feed').on('connection', function(client) {
    // console.log('client is connected');

    client.on('connection', function() {
      console.log('A client is connected');
    });

    //this is an organization or donor action
    client.on('login', function(token) {
      console.log('Client token: ' + token);
      clients.push({ client_id: client.id, user: token });
      console.log('Clients: ', clients);
      console.log('Got here');
      Model.Donor.findById(token, function(err, donor) {
        if (err) { throw err; }
        if (donor) {
          console.log('Donor: About to getFeed');
          client.emit('getFeed', donor.feed);
        } else {
          Model.Organization.findById(token, function(err, org) {
            if (err) throw err;
            if (org) {
              console.log('Org: About to getFeed');
              client.emit('getFeed', org.feed);
            }
          });
        }
      });
    });

    //this is an organization or donor action
    client.on('disconnect', function() {
      console.log('Client has been disconnected');
      clients.forEach(function(cl, idx) {
        if (cl['client_id'] === client.id) {
          clients.splice(idx, 1);
          console.log('Client with id: ' + client.id  + ' has logged out');
        }
      })
    });

    //this is a donor action
    client.on('follow', function(donorID, orgID) {
      console.log('Follow Data: ', donorID, orgID);
      var now = Date.now();
      Model.Organization.findById(orgID, function(err, org) {
        if (err) throw err;
        else {
          if (org.followers.indexOf(donorID) === -1) {
            Model.Donor.findById(donorID, function(err, donor) {
              if (err) throw err;
              if (donor) {
                if (donor.following.indexOf(orgID) === -1) {
                  org.followers.push(donorID);
                  org.feed.push({ message: donor.username + ' started following you', created_date: now });
                  donor.following.push(orgID);
                  donor.feed.push({ message: 'You started following ' + org.name, created_date: now });
                  org.save(function(err) {
                    if (err) throw err;
                    donor.save(function(err) {
                      if (err) throw err;
                      else {
                        console.log('Saving to donor')
                        client.emit('getFeed', donor.feed);
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

    var union = function(/*arrays*/) {
      var args = [].slice.call(arguments), result = [];
      args.forEach(function(arg) {
        arg.forEach(function(e) {
          if (result.indexOf(e) === -1) { result.push(e); }
        });
      });
      return result;
    };

    //this is an org action
    client.on('project update', function(orgID, projectID) {
      var now = Date.now();
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
                        feed.to(client[0]).emit('getFeed', donor.feed);
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

    client.on('org_update', function(orgID, data) {
      Model.Organization.findById(orgID, function(err, org) {
        if (err) throw err;
        if (org) {
          org.followers.forEach(function(follower) {
            Model.Donor.findById(follower, function(err, donor) {
              //update donor feed
              donor.feed.push({ message: data.message, created_date: new Date() });
              donor.save(function(err) {
                if (err) throw err;
                clients.forEach(function(cl) {
                  // client.emit('action', data);
                  if (cl['user'] === donor._id) { //if client is connected
                    feed.to(client[0]).emit('getFeed', donor.feed);
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
