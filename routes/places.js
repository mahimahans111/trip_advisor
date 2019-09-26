var express = require("express");
var router = express.Router();
var Place = require("../models/place");
var Comment = require("../models/comment");
var middleware = require("../middleware");

router.get("/", function(req, res){
  //Get all places from DB
  console.log(req.user);
  Place.find({}, function(err, allPlaces){
    if(err){
      console.log(err);
    }
    else{
      res.render("places/index", {places: allPlaces, currentUser: req.user});
    }
  });
});

router.post("/", middleware.isLoggedIn , function(req, res){
  //get data from form and add to the places array
  var name = req.body.name;
  var image = req.body.image;
  var desc = req.body.description;
  var author = {
    id: req.user._id,
    username: req.user.username
  };
  var newPlace = {name: name, image: image, description: desc, author: author};
  // places.push(newPlace);
  //Create a new place and save to db
  Place.create(newPlace, function(err, newlyCreated){
    if(err){
      console.log(err);
    } else{
      //redirect back to places page
      res.redirect("/places");
    }
  });
});

router.get("/new", middleware.isLoggedIn, function(req, res){
  res.render("places/new.ejs");
});

//SHOW - shows more info about one place
router.get("/:id", function(req, res){
  //find the place with provided id
  //render the show template with that page
  console.log(req.params.id);
  Place.findById(req.params.id).populate("comments").exec(function(err, foundPlace){
    if(err){
      console.log(err);
    } else{
      console.log(foundPlace);
      res.render("places/show", {place: foundPlace});
      // console.log(place);
    }
  });
});

//EDIT place route
router.get("/:id/edit", middleware.checkPlaceOwnership, function(req, res){
  Place.findById(req.params.id, function(err, foundPlace){
          res.render("places/edit", {place: foundPlace});
    });
});

//UPDATE place route
router.put("/:id", middleware.checkPlaceOwnership, function(req, res){
  Place.findByIdAndUpdate(req.params.id, req.body.place, function(err, updatedPlace){
    if(err){
      res.redirect("/places");
    }   else{
      res.redirect("/places/" + req.params.id);
    }
  });
});

//DESTROY place route
router.delete ("/:id",middleware.checkPlaceOwnership, function(req, res){
  Place.findByIdAndRemove(req.params.id, function(err){
    if(err){
      res.redirect("/places");
    } else{
      res.redirect("/places");
    }
  })
});

module.exports = router;
