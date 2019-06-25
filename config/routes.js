const axios = require('axios');
const usersDb = require('../database/users/users-model.js');
const bcrypt = require('bcryptjs');
const { generateToken, authenticate } = require('../auth/authenticate');

module.exports = server => {
  server.post('/api/register', register);
  server.post('/api/login', login);
  server.get('/api/jokes', authenticate, getJokes);
  server.get('/api/chuck', authenticate, getChuck);
};

function register(req, res) {
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 8);
  user.password = hash;

  usersDb.add(user)
  .then(saved => {
    const token = generateToken(user);
    return res.status(201).json({ message: 'This user is now registered' });
  })
  .catch(err => {
    res.status(500).json(`${err}`);
  });
}

function login(req, res) {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400).json({ message: 'Please provide username and password and try again!'});
  } else {
    usersDb.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user);
        res.status(200).json({ message: `Welcome to the party ${user.username}, take this token...`, token, user });
      } else {
        res.status(401).json({ message: 'Invalid Credentials' });
      }
    })
    .catch(err => {
      res.status(500).json(`${err}`);
    });
  }
}

function getJokes(req, res) {
  const requestOptions = {
    headers: { accept: 'application/json' },
  };

  axios
    .get('https://icanhazdadjoke.com/search', requestOptions)
    .then(response => {
      res.status(200).json(response.data.results);
    })
    .catch(err => {
      res.status(500).json({ message: 'Error Fetching Jokes', error: err });
    });
}
function getChuck(req, res) {
  const requestOptions = {
    headers: { accept: 'application/json' },
  };

  axios
    .get('https://api.chucknorris.io/jokes/random', requestOptions)
    .then(response => {
      res.status(200).json(response.data.value);
    })
    .catch(err => {
      res.status(500).json({ message: 'Error Fetching Jokes', error: err });
    });
}