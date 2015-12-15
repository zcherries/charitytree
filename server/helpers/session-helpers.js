module.exports = {
  validateSession: function(req, res, next) {
    console.log('Validation Starts')
    console.log('Req.Path: ', req)
    // if (req.path === '/') {
    //   return next();
    // }
    if (req.session.uid != null) {
      return next();
    } else {
      res.redirect('/');
    }
  }
}
