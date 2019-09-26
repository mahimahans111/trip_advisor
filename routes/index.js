var express = require("express");
var router = express.Router();
// var Place = require("../models/place");
// var Comment = require("../models/comment");
var passport = require("passport");
var User = require("../models/user");

router.get("/", function(req, res){
  res.render("landing");
});

//=========================
//AUTH ROUTES
//=========================

//show register form
router.get("/register", function(req, res){
  res.render("register");
});

//handle sign up logic
router.post("/register", function(req, res){
  var newUser = new User({username: req.body.username});
  User.register(newUser, req.body.password, function(err, user){
    if(err){
      console.log(err);
      return res.render("register");
    }
    passport.authenticate("local")(req, res, function(){
      res.redirect("/places");
    });
  });
});

//show login form
router.get("/login", function(req, res){
  res.render("login");
});

//handling login logic
router.post("/login",
      passport.authenticate("local",
    {
      successRedirect: "/places",
      failureRedirect: "/login"
    }),function(req, res){
});

//logout ROUTE
router.get("/logout", function(req, res){
  req.logout();
  req.flash("error", "Logged you out!")
  res.redirect("/places");
});

//middleware funcn, added if we want the user to access a prtclr page only when he's logged in
function isLoggedIn(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect("/login");
}

module.exports = router;
