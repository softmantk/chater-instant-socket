var mongoose = require('mongoose');   
var User = mongoose.model('User');
var LocalStrategy   = require('passport-local').Strategy;
var bCrypt = require('bcrypt-nodejs');

var users = [];
module.exports = function(passport){

	// Passport needs to be able to serialize and deserialize users to support persistent login sessions
	passport.serializeUser(function(user, done) {
		 console.log('serializing user:',user);
		done(null, user);
	});
	passport.deserializeUser(function(id, done) {
			 console.log('deserializing user:',id);
			done(null, id);
	});
	passport.use('login', new LocalStrategy({
            usernameField: 'username',
            passwordField: 'username',
            passReqToCallback : true
		},
		function(req, username, password, done) {
			console.log("Current Users : "+users)
			if(users.indexOf(username) < 0) {
				users.push(username);
				console.log("user ok")
				return done(null, username);
			} else {
			    console.log("Username alredy exist")
                return done(null, false);
			}
		}
	));


};
