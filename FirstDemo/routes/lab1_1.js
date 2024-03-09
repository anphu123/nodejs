var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  const username = req.query.username;
  const password = req.query.password;

  if (username === 'huongtt' && password === '123456') {
    res.send('Login successful!');
  } else {
    res.send('Login failed. Please check your username and password.');
  }
});

module.exports = router;

