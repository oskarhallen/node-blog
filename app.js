var express = require('express'),
    app = express.createServer(),
    blog = require('./routes/blog'),
    auth = require('./routes/auth');

app.configure(function() {
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.cookieParser());
  app.use(express.session({secret: 'sewkret'}));
  app.use(express.static(__dirname + '/public'));
});

app.use(function(req, res, done) {
  res.local('user', req.session.user || '');
  res.local('message', req.session.message || '');
  delete req.session.message;
  done();
});

app.get('/', blog.list);
app.get('/create', blog.createGet);
app.post('/create', blog.createPost);
app.get('/delete/:id', blog.deletePost);

app.get('/login', auth.loginGet);
app.post('/login', auth.loginPost);
app.get('/logout', auth.logout);

app.get('/:permalink', blog.single);

app.listen(3000);