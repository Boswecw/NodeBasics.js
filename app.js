const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes');

//express app
const app = express();



const dbURI = "mongodb+srv://Kable:kable@nodetuts.frztgqm.mongodb.net/"

//listen for requests
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(result => app.listen(3000))
  .catch(err => console.log(err));

// register view engine
app.set('view engine', 'ejs')

// middleware static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.redirect('/blogs')
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'About' });
});

app.use('/blogs', blogRoutes);


app.get('/create', (req, res) => {
  res.render('create', { title: 'Create a new blog' });
});

// 404 page
app.use((req, res) => {
  res.render('404', { title: '404' });
});

