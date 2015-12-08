var Donor = require('../models/donor.js');

module.exports = {
  retrieve: function(req, res, next, criteria, options, method) {
    var criteria = criteria || {}, method = method || '';
    var query = (Donor[method]) ? Donor[method](criteria) : Donor.find(criteria);

    if (options) {
      for (var key in options) {
        if (query[key]) {
          query[key](options[key]);
        }
      }
    }
    query.exec(function(err, donors) {
      if (err) handleError(req, res, "Controller: Donor, Method: Retrieve", err);
      res.send({ status: 200, results: donors });
    });
  },

  create: function(req, res, next, donorData) {
    Donor.findOne({name: donorData.name}, function(err, found) {
      if (err) handleError(req, res, "Controller create", err);
      if (!found) {
        Donor.create(donorData, function(err, donor) {
          if (err) handleError(req, res, "Controller create", err);
          res.send({ status: 201, results: donor });
        });
      } else {
          res.status(400).send({ status: 400, message: "We found an donor with this name." });
      }
    });
  },

  update: function(req, res, next, criteria, changes, method, options) {
    Donor.findOne(criteria, function(err, doc) {
      if (err) handleError(req, res, "Controller update", err);
      if (doc) {
        for (var key in changes) {
          if (doc[key]) {
            doc[key] = changes[key];
          }
        }
        doc.save(function(err, donor) {
          res.send({ status: 201, results: donor });
        });
      } else {
        res.status(400).send({ status: 400, message: "Donor not found." });
      }
    });
  },

  delete: function(req, res, next, criteria, options, method) {
    var criteria = criteria || {}, method = method || '';
    var query = (Donor[method]) ? Donor[method](criteria) : Donor.findOne(criteria);
    if (options) {
      for (var key in options) {
        if (query[key])
          query[key](options[key]);
      }
    }
    query.remove().exec(function(err, donor) {
      if (err)
        handleError(req, res, "Controller: Donor, Method: Delete", err);
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
