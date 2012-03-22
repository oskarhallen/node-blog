var db = require('mongojs').connect('mydb', ['blogposts']);

exports.list = function(req, res) {
  db.blogposts.find({}, function(err, docs) {
    docs = docs.reverse();
    res.render('blog/list', {posts: docs});
  });
};

exports.single = function(req, res) {
  var permalink = req.param('permalink');
  db.blogposts.find({permalink: permalink}, function(err, docs) {
    if (docs[0]) {
      res.render('blog/single', {post: docs[0]});
    } else {
      res.redirect('/');
    }
  });
};

exports.createGet = function(req, res) {
  if (req.session.user) {
    res.render('blog/create');
  } else {
    res.redirect('/login');
  }
};

exports.createPost = function(req, res) {
  var title = req.param('title');
  var content = req.param('content');
  var date = new Date();
  var permalink = req.param('permalink');

  db.blogposts.find({permalink: permalink}, function(err, docs) {
    if (docs[0]) {
      req.session.message = 'The permalink already exists.';
      res.redirect('/create');
    } else {
      db.blogposts.save({
        title: title,
        content: content,
        date: date.toDateString(),
        permalink: permalink
      }, function(err, saved) {
        if (err || !saved) console.log('Post NOT created');
        else console.log('Post created');
        res.redirect('/');
      });
    }
  });
};

exports.deletePost = function(req, res) {
  var id = req.param('id');
  db.blogposts.remove({_id: db.ObjectId(id)}, function(err, deleted) {
    if (err || !deleted) console.log('Post NOT deleted');
    else console.log('Post deleted');
    res.redirect('/');
  });
};