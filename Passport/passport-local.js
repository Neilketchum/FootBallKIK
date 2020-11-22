'use strict';
const passport = require('passport')
const User = require('../models/users')
const LocalStrategy = require('passport-local').Strategy;
passport.serializeUser(function(user,done){
    done(null,user.id);

});
passport.deserializeUser((id,done)=>{
    User.findById(id,(err,user)=>{
        done(err,user);
    })
})
passport.use('local.signup',new LocalStrategy({
    usernameField:'email',
    passwordField:'password',
    passReqToCallback:true
},(req,email,password,done)=>{
    user.findOne({email:email},(err,user)=>{
        if(err){
            return done(err)
        }
        if(user){
            return done(null,false,req.flash("Error","User with this Email Already Exists"))
        }
        const newUser = new User();
        newUser.username = req.body.username,
        newUser.email = req.body.email,
        newUser.password = req.body.password
        newUser.save((err)=>{
            done(null,newUser);
        })
    })
}))