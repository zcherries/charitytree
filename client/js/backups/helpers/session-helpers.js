module.exports = {
  validateSession: function(req, res, next) {
    console.log('Validation Starts')
    console.log('Req.Path: ', req)
    if (req.session && req.session.user && req.session.user.uid != null) {
      next();
    } else {
      res.redirect('/');
    }
  }
}
