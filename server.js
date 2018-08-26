const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const app = express();

hbs.registerPartials(__dirname+'/views/partials');
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

app.use((req,res,next) => {
  let now = new Date().toString();
  let log = `${now}: ${req.method} ${req.originalUrl}`;
  console.log(log);
  fs.appendFile('server.log',log + '\n',(err) => {
    if (err) {
      console.log('Unable to append to server.log');
    }
  });
  next();
});

// app.use((req,res,next) => {
//   res.render('maintenance.hbs');
// });

hbs.registerHelper('getCurrentYear',() => {
  return new Date().getFullYear()
});

hbs.registerHelper('screamIt',(text) => {
  return text.toUpperCase();
});

app.get('/',(req,res) => {
  // res.send('<h1>hello express</h1>');
  // res.send({
  //   name: 'Atharva',
  //   likes: [
  //       'Reading','Sports'
  //   ]
  // })
  res.render('home.hbs',{
    welcomeMessage: "Welcome to home page",
    pageTitle: 'Home Page',
  })
});

app.get('/about',(req,res) => {
  res.render('about.hbs',{
    pageTitle: 'About Page',
  });
});

app.get('/bad',(req,res) => {
  res.send({
    errorMessage: 'Unable to fulfill this request'
  })
});
app.listen(3000,() => {
  console.log('Server is now running')
});