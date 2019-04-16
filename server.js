/* eslint-disable import/newline-after-import */
/* eslint-disable quotes */
/* eslint-disable quote-props */
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const methodOverride = require('method-override');
const morgan = require('morgan');

const port = 3000;

// middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(methodOverride('_method'));
app.use(morgan('short'));

// db
const pokemon = require('./models/pokemon');

// INDEX route
app.get('/pokemon', (req, res) => {
  res.render('index.ejs', {
    "pokemon": pokemon,
  });
});

// NEW route
app.get('/pokemon/new', (req, res) => {
  res.render('new.ejs');
});

// CREATE route
app.post('/pokemon', (req, res) => {
  // console.log('CREATE route accessed');
  // console.log('Data within req.body: ', req.body);
  pokemon.push(req.body);
  res.redirect('/pokemon');
});

// SHOW route
app.get('/pokemon/:id', (req, res) => {
  res.render('show.ejs', {
    "pokemon": pokemon[req.params.id],
    "id": req.params.id,
  });
});

// EDIT route
app.get('/pokemon/:id/edit', (req, res) => {
  // res.send('edit route hit');
  res.render('edit.ejs', {
    "pokemon": pokemon[req.params.id],
    "id": req.params.id,
  });
});

// UPDATE route
app.put('/pokemon/:id', (req, res) => {
  // res.send('update route hit');
  console.log('Data within req.body: ', req.body);
  pokemon[req.params.id] = req.body;
  res.redirect('/pokemon');
});

// DELETE route
app.delete('/pokemon/:id', (req, res) => {
  // res.send('delete route hit')
  pokemon.splice(req.params.id, 1);
  res.redirect('/pokemon');
});

// listen at the bottom
app.listen(port, () => {
  console.log('App is running on port: ', port);
});

module.exports = app;
