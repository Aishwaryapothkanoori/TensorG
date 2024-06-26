const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const feedbackRoutes = require('./routes/feedback');

const app = express();
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/feedback', { useNewUrlParser: true, useUnifiedTopology: true });


app.use(session({ secret: 'secret', resave: false, saveUninitialized: true }));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new GoogleStrategy({
  clientID: 'YOUR_GOOGLE_CLIENT_ID',
  clientSecret: 'YOUR_GOOGLE_CLIENT_SECRET',
  callbackURL: 'http://localhost:3000/auth/google/callback'
}, (token, tokenSecret, profile, done) => {
  return done(null, profile);
}));

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((obj, done) => done(null, obj));

app.get('/auth/google',
  passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] })
);

app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect('/');
  }
);
app.use('/api/feedback', feedbackRoutes);


app.listen(3000, () => {
  console.log('Server started on http://localhost:3000');
});
