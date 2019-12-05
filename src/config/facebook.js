const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const User = require('../models/facebookUser');

passport.use(new FacebookStrategy({
    clientID: 'test',
    clientSecret: 'test',
    callbackURL: "http://localhost:3001/auth/facebook/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
    console.log(accessToken, refreshToken, profile);
    User.findOne({'facebook.id': profile.id}, function(err, user){
      if(err)
        return cb(err);
      if(user)
        return cb(null, user);
      else {
        const newUser = new User();
        newUser.id = profile.id;
        newUser.token = accessToken;
        newUser.name = profile.displayName;
        console.log(newUser);
        newUser.save();
        return cb(null, newUser);
      }
    });
  }
));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});
