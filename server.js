// nodemon server.js -e js,hbs
// npm start

const express = require('express');
const fs = require('fs');
const hbs = require('hbs');

const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log', log + '\n', err => {
    if (err) {
      console.log('Unable to append to server.log');
    }
  });
  next();
});
// промежуточное ПО останавливает запуск
// app.use((req, res, next) => {
//   res.render('maitenanse.hbs');
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', text => {
  return text.toUpperCase();
});

app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'Home page',
    welcomeMessage: 'Welcome to my website',
    currentYear: new Date().getFullYear(),
  });
});

app.get('/about', (req, res) => {
  // res.send('<h1>Hello Express!</h1>')
  res.render('about.hbs', {
    pageTitle: 'About page',
    currentYear: new Date().getFullYear(),
  });
});

app.get('/bad', (req, res) => {
  // res.send('<h1>Hello Express!</h1>')
  res.send({
    errorMessage: 'Unable to handle request',
  });
});
//
app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});