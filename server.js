/* eslint-disable import/newline-after-import */
/* eslint-disable quotes */
/* eslint-disable quote-props */
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const port = 3000;

// middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('fonts'));

// db
const pokemon = require('./models/pokemon');

// index route
app.get('/pokemon', (req, res) => {
  res.render('index.ejs', {
    "pokemon": pokemon,
  });
});

// create route pt 1
app.get('/pokemon/create', (req, res) => {
  res.render('create.ejs');
});

// create route pt 2
app.post('/pokemon', (req, res) => {
  console.log('CREATE route accessed');
  console.log('Data within req.body: ', req.body);
  pokemon.push(req.body);
  res.redirect('/pokemon');
});

// show route
app.get('/pokemon/:id', (req, res) => {
  res.render('show.ejs', {
    "aPokemon": pokemon[req.params.id],
  });
});

// listen at the bottom
app.listen(port, () => {
  console.log('App is running on port: ', port);
});

module.exports = app;
