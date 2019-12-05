const Article = require('../models/article');

function getAllNews(req, res, next) {
  Article.find()
    .then(articles => {res.send(articles)});
}

function postNewNewsItem(req, res, next) {
  Article.create(req.body)
    .then(() => res.json({ message: 'The news item was added' }))
    .catch(() => res.status(422).send({ error: `There is no title value in request body!` }));
}

function getNewsItemById(req, res) {
  const id = req.params.id;

  Article.findById({_id: id})
    .then(article => res.send(article))
    .catch(() => res.status(404).send({ error: `Element with ${id} id couldn't be found!` }));
}

function deleteNewsItemById(req, res, next) {
  const id = req.params.id;

  Article.findByIdAndRemove({_id: req.params.id})
    .then(() => res.json({ message: 'The news item was deleted' }))
    .catch(() => res.status(404).send({ error: `Element with ${id} id couldn't be found!` }));
}

function editNewsTitleById(req, res, next) {
  const id = req.params.id;

  Article.findByIdAndUpdate({_id: req.params.id}, { title: req.body.title })
    .then(() => {
      if(req.body.title) {
        res.json({ message: 'The news item was edited' })
      } else {
        res.status(422).send({ error: `There is no title value in request body!` })
      }
    })
    .catch(() => res.status(404).send({ error: `Element with ${id} id couldn't be found!` }));
}

module.exports = { getNewsItemById,  deleteNewsItemById, postNewNewsItem, getAllNews, editNewsTitleById };
