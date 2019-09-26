var Place = require("../models/place");
var Comment = require("../models/comment");
//all the middleware goes here

var middlewareObj = {};
middlewareObj.checkPlaceOwnership = function(req, res, next){
    if(req.isAuthenticated()){
      Place.findById(req.params.id, function(err, foundPlace){
        if(err){
          res.redirect("back");
        } else{
          //does user own the place
          if(foundPlace.author.id.equals(req.user._id)){
            next();
          } else{
            res.redirect("back");
          }
        }
      });
    } else{
       res.redirect("back");
    }
}

middlewareObj.checkCommentOwnership = function(req, res, next){
  if(req.isAuthenticated()){
    Comment.findById(req.params.comment_id, function(err, foundComment){
      if(err){
        res.redirect("back");
      } else{
        //does user own the comment
        if(foundComment.author.id.equals(req.user._id)){
          next();
        } else{
          res.redirect("back");
        }
      }
    });
  } else{
     res.redirect("back");
  }
}

middlewareObj.isLoggedIn = function(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }
  req.flash("error", "Please Login First!");
  res.redirect("/login");
}

module.exports = middlewareObj;
