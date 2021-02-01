const express = require('express');
const path = require('path')
const formData = require('express-form-data');
const exphbs = require('express-handlebars');
const session = require('express-session')
const flash = require('express-flash');
const passport = require('passport')
const localStrategy = require('passport-local').Strategy;

const app = express();

passport.use(new localStrategy(
  function (username, password, done) {
    const user = findUser({username, password}, );
    if(!user) {
      return done(null, false, {msg:"You are not a member, signup first"})
    }
    if(err) return done(err);
  }
))

hb = exphbs.create({
  defaultLayout:'member layout',
  layoutsDir: path.join(__dirname, 'handlebars templates', 'layouts'),
  partialsDir: path.join(__dirname, 'handlebars templates', 'partials')
})
// set multiple views folders
app.set('views', [
  path.join(__dirname, 'handlebars templates', 'librarian views'),
  path.join(__dirname, 'handlebars templates', 'member views'),
]);

// HANDLEBARS MIDDLEWARES
app.engine('handlebars', hb.engine);
app.set('view engine', 'handlebars');

// app.use(methodOverride('__method'))

// USE BODY PARSER MIDDLEWARES
app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use(formData.parse())

// USE SESSION PACKAGE TO SEE IF THE USER IS LOGGED IN
app.use(session({
  secret: 'secret',
  resave:true,
  saveUninitialized: true
}))

// USE STATIC FOLDER
app.use(express.static(path.join(__dirname, 'public', 'styles')))
app.use(express.static(path.join(__dirname, 'public', 'scripts')))

// USE ROUTER TO LOGIN PAGE
app.use('', require('./routes/login page.js'))

// USE ROUTER TO LOGIN
app.use('', require('./routes/forms/gateway.js'))

// USE ROUTER TO LIBRARIAN's BOOK FUNCTIONS 
app.use('', require('./routes/librarian/book functions.js'))
// USE ROUTER TO LIBRARIAN's MEMBER FUNCTIONS
app.use('', require('./routes/librarian/member functions.js'))
// USE ROUTER TO LIBRARIAN's HOME PAGE
app.use('', require('./routes/librarian/librarian home.js'))

// USE ROUTER TO MEMBER's HOME PAGE 
app.use('', require('./routes/member/member home.js'))
// USE ROUTER TO MEMBER's FUNCTIONS
app.use('', require('./routes/member/member functions.js'))
// USE ROUTER THAT POSTS THE FORM DATA FOR A MEMBER    
app.use('', require('./routes/forms/member forms/member forms.js'))

const PORT = process.env.port || 3000
app.listen(PORT, ()=> console.log('server running'))

