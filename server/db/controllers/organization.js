var Org = require('../models/organization.js');

module.exports = {
  retrieve: function(req, res, next, criteria, options, method) {
    var criteria = criteria || {}, method = method || '';
    var query = (Org[method]) ? Org[method](criteria) : Org.find(criteria);

    if (options) {
      for (var key in options) {
        if (query[key]) {
          query[key](options[key]);
        }
      }
    }
    query.exec(function(err, orgs) {
      if (err) handleError(req, res, "Controller: Organization, Method: Retrieve", err);
      res.send({ status: 200, results: orgs });
    });
  },

  create: function(req, res, next, orgData) {
    Org.findOne({name: orgData.name}, function(err, found) {
      if (err) handleError(req, res, "Controller create", err);
      if (!found) {
        Org.create(orgData, function(err, org) {
          if (err)
            handleError(req, res, "Controller create", err);
          else
            res.send({ status: 201, results: org });
        });
      } else {
          res.status(400).send({ status: 400, message: "We found an organization with this name." });
      }
    });
  },

  update: function(req, res, next, criteria, changes, method, options) {
    Org.findOne(criteria, function(err, doc) {
      if (err) handleError(req, res, "Controller update", err);
      if (doc) {
        for (var key in changes) {
          if (doc[key]) {
            doc[key] = changes[key];
          }
        }
        doc.save(function(err, org) {
          res.send({ status: 201, results: org });
        });
      } else {
        res.status(400).send({ status: 400, message: "Organization not found." });
      }
    });
  },

  delete: function(req, res, next, criteria, options, method) {
    var criteria = criteria || {}, method = method || '';
    var query = (Org[method]) ? Org[method](criteria) : Org.findOne(criteria);
    if (options) {
      for (var key in options) {
        if (query[key])
          query[key](options[key]);
      }
    }
    query.remove().exec(function(err, org) {
      if (err)
        handleError(req, res, "Controller: Organization, Method: Delete", err);
      else
        res.send({ status: 201, message: "Delete was successful" });
    });
  }
};

var handleError = function(req, res, source, err, message) {
  if (req.method === 'GET')
    res.status(400).send({ status: 400, message: message });
  if (req.method === 'POST')
    res.status(400).send({ status: 400, results: null, message: message });
};
