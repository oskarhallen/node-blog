var db = require('mongojs').connect('mydb', ['users']),
    crypto = require('crypto');

exports.loginGet = function(req, res) {
  if (req.session.user) {
    res.redirect('/create');
  } else {
    res.render('auth/login');
  }
};

exports.loginPost = function(req, res) {
  var username = req.param('username');
  var password = req.param('password');

  db.users.find({username: username}, function(err, user) {
    if (user[0] && user[0].password == hash(password, user[0].salt)) {
      console.log('Login success');
      req.session.user = user[0];
      res.redirect('/create');
    } else {
      console.log('Login failed');
      req.session.message = 'Username or password incorrect.';
      res.redirect('/login');
    }
  });
};

exports.logout = function(req, res) {
  req.session.destroy();
  res.redirect('/');
};

function hash(msg, salt) {
  return crypto.createHmac('sha256', salt).update(msg).digest('hex');
}