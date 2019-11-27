const news = require('./news');

function getAllNews(req, res, next) {
  res.send(news);
}

function getNewsItemById(req, res, next) {
  const id = req.params.id;

  res.send(news.articles[id]);
}

function deleteNewsItemById(req, res, next) {
  const id = req.params.id;

  news.articles.splice(id, 1);
  res.json({ success: 'ok'});
}

function changeNewsTitle(req, res, next) {
  const id = req.params.id;

  news.articles[id].title = req.body.title;
  res.json({ success: 'ok'});
}

function hasTitle(req, res, next) {
  const newTitle = req.body.title;

  if(newTitle) {
    next()
  } else {
    res.send({ error: `There is no title value in request body!` });
  }
}

function checkId(req, res, next) {
  const id = req.params.id;

  if(news.articles[id]) {
    next();
  } else {
    res.send({ error: `There is no element with ${id} id!` });
  }
}

function postNewNewsItem(req, res, next) {
    news.articles.push(req.body);
    res.json({ success: 'ok'});
}

module.exports = { getNewsItemById,  deleteNewsItemById, changeNewsTitle, getAllNews, checkId, hasTitle, postNewNewsItem };