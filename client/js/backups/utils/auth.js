module.exports = {
  login(username, password, cb) {
    console.log("auth/login/username:",username,"localStorage.token",localStorage.token);
    cb = arguments[arguments.length - 1];
    if (localStorage.token) {
      if (cb) cb(true);
      this.onChange(true);
      return
    }
    authenticateLogin (username, password, (res) => {
      if (res.authenticated) {
        localStorage.token = res.token
        if (cb) cb(true);
        this.onChange(true)
      } else {
        if (cb) cb(false);
        this.onChange(false)
      }
    })
  },

  signup(username, responseToken, cb) {
    console.log("auth/signup/username:",username,"localStorage.token",localStorage.token);
    cb = arguments[arguments.length - 1];
    if (localStorage.token) {
      if (cb) cb(true);
      this.onChange(true);
      return
    }
    authenticateSignup (username, responseToken, (res) => {
      console.log("auth/aS/res:",res);
      if (res.authenticated) {
        localStorage.token = responseToken
        if (cb) cb(true);
        this.onChange(true)
      } else {
        if (cb) cb(false);
        this.onChange(false)
      }
    })
  },

  getToken: function () {
    return localStorage.token
  },

  logout: function (cb) {
    $.ajax({
      type: 'POST',
      url: '/logout_post',
      success: function (response) {
        // console.log(response);
        delete localStorage.token;
        if (cb) cb();
        this.onChange(false)
      }.bind(this),
      error: function (xhr, status, err) {
        console.log("Error posting to: " + xhr, status, err.toString());
      }.bind(this)
    });
  },

  loggedIn: function () {
    //console.log("auth/loggedIn/localStorage.token:",localStorage.token);
    return !!localStorage.token
  },

  onChange: function () {}
};

function authenticateLogin (username, password, cb) {
  if (username && password) {
    $.ajax({
      type: 'POST',
      url: '/login_post',
      data: {username: username, pwd: password},
      success: function (response) {
        console.log(response);
        cb({
          authenticated: true,
          token: response.token
        });
        //navigate to dashboard page
        //window.location.href = "http://127.0.0.1:4000/dashboard"
      }.bind(this),
      error: function (xhr, status, err) {
        console.log("Error posting to: " + xhr, status, err.toString());
      }.bind(this)
    });
  }else {
    cb({ authenticated: false })
  }
}

function authenticateSignup (username, responseToken, cb) {
  if (username) {
    cb({
      authenticated: true,
      token: responseToken
    })
  } else {
    cb({ authenticated: false });
  }
}
