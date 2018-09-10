const express = require('express');
const path = require('path');
const bodyParse = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const Auth0Strategy = require('passport-auth0');


// auth strategy takes in an obj n callback fn:
// once you successfuly login the callback fn gets serialized into our session - can keep track on who is logged in and who isnt:
// Thu this callback fn we are able to access the profile pic, nick-name - e.t.c from their google account:
const strategy = new Auth0Strategy(
 {
    domain: 'rasjoh.auth0.com',
    clientID: 'zLu7syUlGJAHVuu1QPysoCuIX762c08X',
    clientSecret: 'RrWqeSv8TN572sQEMBggon5RRdN6wWKKmBukb-HYbSaHhlcyNoIODqGAZthy75NR',
    callbackURL: 'http://localhost:3000/callback'
 },
 function(accessToken, refreshToken, extraParam, profile, done) {
    return done(null, profile);
 }
);

passport.use(strategy);

// use session to serialize the user:
passport.serializeUser(function(user, done) {
   done(null, user);
});

// use session to de-serialize the user:
passport.deserializeUser(function(user, done) {
   done(null, user);
})