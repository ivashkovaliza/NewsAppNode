const express = require('express');
const bodyParser = require('body-parser');
const newsRoutes = require('./newsRoutes');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');

const port = 3000;
const app = express();

const requestsLogStream = fs.createWriteStream(path.join(__dirname, './log/requests.log'), { flags: 'a' });
morgan.token('date',()=> new Date().toLocaleString());
app.use(morgan(':date Request method - :method, Request url - :url', { stream: requestsLogStream }));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/', newsRoutes);
app.use(errorHandler);

function errorHandler(err, req, res, next) {
  console.log(err);
  res.status(500).send({ error: 'Something failed!' });
}


app.listen(port, () => console.log(`Example app listening on port ${port}!`));