const express = require('express');
const bodyParser = require('body-parser');
const newsRoutes = require('./newsRoutes');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const passport = require('passport');
mongoose.connect('mongodb://localhost/frontcamp', {useUnifiedTopology: true, useNewUrlParser: true});
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

const port = 3001;
const app = express();

const requestsLogStream = fs.createWriteStream(path.join(__dirname, 'log', 'requests.log'), { flags: 'a' });
morgan.token('date',()=> new Date().toLocaleString());
app.use(morgan(':date Request method - :method, Request url - :url', { stream: requestsLogStream }));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(passport.initialize());
app.use('/', newsRoutes);
app.use(errorHandler);

function errorHandler(err, req, res, next) {
  console.error(err);
  res.status(500).send({ error: 'Something failed!' });
}

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
