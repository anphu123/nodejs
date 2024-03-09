const express = require('express');
const router = express.Router();

const users = [
  { id: 1, name: 'abc', email: 'abc@example.com', password: 'abc123' },
  { id: 2, name: 'abd', email: 'abd@example.com', password: 'abd123' },
  { id: 3, name: 'abb', email: 'abb@example.com', password: 'abb123' },
  { id: 4, name: 'ccv', email: 'ccv@example.com', password: 'ccv123' }
];

// Route for user registration
router.post('/', (req, res) => {
  const { name, email, password } = req.body;

  // Check if the email is already registered
  const existingUser = users.find((user) => user.email === email);
  if (existingUser) {
    return res.status(400).send('Email is already registered');
  }

  // Generate a new user object
  const newUser = {
    id: users.length + 1,
    name: name,
    email: email,
    password: password
  };

  // Add the new user to the array
  users.push(newUser);

  res.json({ message: 'Registration successful', user: newUser });
});

router.get('/', (req, res) => {
  // Handle other GET requests (e.g., show a registration form)
  res.send('Welcome to the registration page!');
});

module.exports = router;
