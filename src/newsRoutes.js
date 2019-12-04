const express = require('express');
const { getNewsItemById,  deleteNewsItemById, editNewsTitleById, getAllNews, postNewNewsItem } = require('./controllers/newsController');
const registerUser = require('./controllers/usersController');
const router = express.Router();
const passport = require('passport');

require('./config/basic');
require('./config/facebook');

router.route('/auth/facebook')
  .get(passport.authenticate('facebook'));

router.route('/auth/facebook/callback')
  .get(passport.authenticate("facebook", {
    successRedirect: "/",
    failureRedirect: "/fail"
  }));

router.route('/fail')
  .get((req, res) => {
    res.send("Failed attempt");
  });

router.route('/')
  .get((req, res) => {
    res.send("Success");
  });

router.route('/news')
  .get( getAllNews)
  .post(postNewNewsItem);

router.route('/news/:id')
  .get(getNewsItemById)
  .put(passport.authenticate('basic', {session: false}), editNewsTitleById)
  .delete(deleteNewsItemById); //passport.authenticate('facebook')

router.route('/register')
  .post(registerUser);

router.route('/auth/facebook/callback')
  .get((req, res) => {res.send('this check status of the request')});

module.exports = router;
