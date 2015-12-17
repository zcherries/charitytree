module.exports = {
  login(username, password, cb) {
    console.log("auth/login/username:",username,"password",password,"localStorage.token",localStorage.token);
    cb = arguments[arguments.length - 1];
    if (localStorage.token) {
      if (cb) cb(true);
      this.onChange(true);
      return
    }
    pretendRequest(username, password, (res) => {
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

  getToken: function () {
    return localStorage.token
  },

  logout: function (cb) {
    delete localStorage.token;
    if (cb) cb();
    this.onChange(false)
  },

  loggedIn: function () {
    console.log("auth/loggedIn/localStorage.token:",localStorage.token);
    return !!localStorage.token
  },

  onChange: function () {}
};

function pretendRequest(username, password, cb) {
  /*$.ajax({
   type: 'POST',
   url: '/login',
   data: this.state,
   success: function(response) {
   console.log(response)
   //navigate to dashboard page
   window.location.href = "http://127.0.0.1:4000/dashboard"
   }.bind(this),
   error: function(xhr, status, err) {
   console.log("Error posting to: " + xhr, status, err.toString());
   }.bind(this)
   });*/
  setTimeout(() => {
    if (username === 'joe@example.com' && password === 'password1') {
      cb({
        authenticated: true,
        token: Math.random().toString(36).substring(7)
      })
    } else {
      cb({ authenticated: false })
    }
  }, 0)
}
