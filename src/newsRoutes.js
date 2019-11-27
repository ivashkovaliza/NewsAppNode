const express = require('express');
const { getNewsItemById,  deleteNewsItemById, changeNewsTitle, getAllNews, checkId, hasTitle, postNewNewsItem} = require('./newsController');
const router = express.Router();

router.route('/news')
  .get(getAllNews)
  .post(hasTitle, postNewNewsItem);

router.route('/news/:id')
  .get(checkId, getNewsItemById)
  .put(checkId, hasTitle, changeNewsTitle)
  .delete(checkId, deleteNewsItemById);

module.exports = router;