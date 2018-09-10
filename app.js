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

// PP can now use our strategy object/ has access to our object: (Tell Auth0 to use passport):
passport.use(strategy);

// use session to serialize the user to session: 'done' is our cb fn, it takes in user n session:
passport.serializeUser(function(user, done) {
   done(null, user);
});

// use session to de-serialize the user from session:
passport.deserializeUser(function(user, done) {
   done(null, user);
});

const app = express();

// set/define our path:
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(bodyParse.json());
app.use(bodyParse.urlencoded({ extended: false }))

// intialize session
app.use(
    session({
        secret: 'jaesfj3934009-fdopj-023rkjlsfds',
        resave: true,
        saveUninitialized: true
    })
);


// Tell express js to use passport:
app.use(passport.initialize());

// this makes our app smart enough to know when one is logged in & wont have to loggin every time:
app.use(passport.session());

// After re-freshing this is how we check if your still logged in or not: - we use a function:
// True or False Boolean and the info comes from the server:
app.use(function (req, res, next) {
   res.locals.loggedIn = false;
   if (req.session.passport && typeof req.session.passport.user != 'undefined') {
    res.locals.loggedIn = true;
   }

   // this is the next page the app should redirect to:
   next();
});

app.listen(3000, function() {
   console.log("Server is listening on port 3000!");
});
