const mongoose = require('mongoose');

//User Schema
const facebookUserSchema = new mongoose.Schema({
  id: String,
  token: String,
  name: String,
});

const facebookUser = mongoose.model('facebookUser', facebookUserSchema);
module.exports = facebookUser;
