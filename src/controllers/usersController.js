const User = require('../models/user');

function registerUser(req, res, next) {
  User.create(req.body)
    .then(() => res.json({ message: 'The user was added' }))
    .catch(() => res.status(422).send({ error: `User name and password are required, username should be unique!` }));
}

module.exports = registerUser;
