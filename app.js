const express = require('express');
const app = express();
const dotenv = require('dotenv').config(),
    session = require('express-session'),
    flash = require("connect-flash"),
    mongoose        = require("mongoose"),
    passport        = require("passport"),
    LocalStrategy   = require("passport-local"),
    User            = require("./models/user"),
    methodOverride = require('method-override');

const indexRoutes = require('./routes/index');

//mongoose.connect('mongodb://127.0.0.1:27017/Health-Page');

app.use(require("express-session")({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false
}));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'))
app.use(flash())
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

// PASSPORT CONFIGURATION
app.use(require("express-session")({
  secret: "kaidi",
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
  res.locals.currentUser = req.user;
  res.locals.error = req.flash("error");
  res.locals.success = req.flash("success");
  next();
});


app.use(indexRoutes);

app.listen(process.env.PORT, ()=> {
  console.log('Server active and running on port');
})
