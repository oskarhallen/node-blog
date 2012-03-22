var db = require('mongojs').connect('mydb', ['users']),
    crypto = require('crypto');

db.users.save({
  username: "nisse",
  password: hash("nisse", "pisse"),
  salt: "pisse"
});

function hash(msg, salt) {
  return crypto.createHmac('sha256', salt).update(msg).digest('hex');
}