"use strict";
// const passport = require("passport")
module.exports = function(_,passport){
    return {
        SetRouting : function(router){
            router.get('/',this.indexPage);
            router.get('/signup',this.signupPage);
            router.get('home',this.homePage)
            router.post('/signup',this.postSignup)
        },
        indexPage:function(req,res){
            return res.render('index',{test:"This is Test"})
        },
        signupPage:function(req,res){
            return res.render('signup')
        },
        homePage:function(req,res){
            return res.render('home')
        },
        postSignup:passport.authenticate('local.signup',{
            successRedirect:'/home',
            failureRedirect: '/signup',
            failureFlash:true,
        })
    }
}