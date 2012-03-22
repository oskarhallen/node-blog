var db = require('mongojs').connect('mydb', ['blogposts']);

db.blogposts.remove({});