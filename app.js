var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    flash       = require("connect-flash"),
    passport    = require("passport"),
    LocalStrategy = require("passport-local"),
    methodOverride = require("method-override"),
    Place       = require("./models/place"),
    Comment     = require("./models/comment"),
    User        = require("./models/user"),
    seedDB      = require("./seeds");

var commentRoutes = require("./routes/comments"),
    placeRoutes = require("./routes/places"),
    indexRoutes = require("./routes/index");

mongoose.connect("mongodb://localhost/mydb", { useNewUrlParser: true });
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
// seedDB();

//passport configuration
app.use(require("express-session")({
  secret: "Once again, blacky wins the cutest dog",
  resave: false,
  saveUninitialised: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
  res.locals.currentUser = req.user;
  res.locals.message = req.flash("error");
  next();
});

app.use(indexRoutes);
app.use("/places", placeRoutes);
app.use("/places/:id/comments", commentRoutes);

// Place.create(
//   {
//     name: "Red Fort",
//     image: "https://img.traveltriangle.com/blog/wp-content/tr:w-700,h-400/uploads/2015/08/Red-Fort.jpg",
//     description: "The Red Fort is an epitome of the Mughal era in India and is the face of tourist attractions in Delhi. Built in 1638, it is an outstanding marvel of Mughal architecture made of red sandstone. Within its magnanimous walls, the chhata bazaar and every evening sound and light show are special attractions. If you are interested in the history of Red Fort, you will be thrilled to know that the Fort was built when Mughal Emperor, Shah Jahan shifted his capital to Delhi. In 2007, this Fort has declared a UNESCO World Heritage. It is one of the most famous places in Delhi."
//   }, function(err, place){
//     if(err){
//       console.log(err);
//     }
//     else{
//       console.log("Newly created place");
//       console.log(place);
//     }
//   });

app.set('port', process.env.PORT || 3000);
app.listen(3000, function(){
  console.log("The server has started!");
});
