const authService = {
  isAuthenticated: false,
  authenticate(username, password, cb) {
    window.fetch('/login', {
      method: 'POST',
      body: 'FAUX DATA',
      headers: { 'content-type': 'application/json' }
    })
    .then(res => res.json())
    .then(res => {
      this.isAuthenticated = true;
      cb()
    });
  },
  signout(cb) {
    this.isAuthenticated = false;
    cb()
  }
};

export default authService;
