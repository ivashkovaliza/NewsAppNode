const mongoose = require('mongoose');

//Article Schema
var articleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title field is required']
  }
});

const Article = module.exports = mongoose.model('Article', articleSchema);
