'use strict';
const passport = require('passport');
const User = require('../models/users');
const LocalStrategy = require('passport-local').Strategy;

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user);
    });
});
passport.use(
	'local.signup',
	new LocalStrategy(
		{
			usernameField: 'email',
			passwordField: 'password',
			passReqToCallback: true,
		},
		async (req, email, password, done) => {
			try {
				const findUser = await User.findOne({ email });

				if (findUser) {
					return done(
						null,
						false,
						req.flash('error', 'User with email already exist'),
					);
				}

				const newUser = new User();
				newUser.username = req.body.username;
				newUser.fullname = req.body.username;
				newUser.email = req.body.email;
				newUser.password = req.body.password;

				const user = await newUser.save();

				done(null, user);
			} catch (error) {
				done(error);
			}
		},
	),
);



