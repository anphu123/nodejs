const express = require('express');
const router = express.Router();

const users = [
  { id: 1, name: 'abc', email: 'abc@example.com', password: 'abc123' },
  { id: 2, name: 'abd', email: 'abd@example.com', password: 'abd123' },
  { id: 3, name: 'abb', email: 'abb@example.com', password: 'abb123' },
  { id: 4, name: 'ccv', email: 'ccv@example.com', password: 'ccv123' }
];

router.post('/', (req, res) => {
  const { email, password } = req.body;

  const user = users.find((user) => user.email === email);

  if (!user) {
    res.status(401).send('Invalid email or password');
  } else if (password === user.password) {
    res.send('Login successful');
  } else {
    res.status(401).send('Invalid email or password');
  }
});

module.exports = router;
