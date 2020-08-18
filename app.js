
var express= require("express");
const bodyParser = require("body-parser");
var app=express();
const mongoose =require("mongoose");
const passport =require("passport")
const LocalStrategy =require("passport-local")
const methodOverride = require("method-override");
const User =require("./models/user");
const Campgroundmodel = require("./models/campgrounds");
const comment = require("./models/comment")
const IndexRoutes = require("./routes/index");
const CampgroundRoutes = require("./routes/campground");
const CommentRoutes = require("./routes/comments");
const seedDB = require("./seed");
const flash = require("connect-flash");

//seedDB();

app.use(bodyParser.urlencoded({extended:true}));
app.use(require("express-session")({
   secret:"This is is resume project",
   resave:false,
   saveUninitialized:false 
}));
app.use(flash());
app.use(methodOverride("_method"));

//PASSPORT CONFIG//
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(function(req,res,next){
    res.locals.currentUser=req.user;
    res.locals.error=req.flash("error");
    res.locals.success=req.flash("success");
    next(); 
})

//DB
const URI="#############################################################";
mongoose.connect(URI,{
    useUnifiedTopology: true,
    useNewUrlParser: true 
});
mongoose.connection.on('connected',()=>{
    console.log("DB Connected");
});
app.use(express.static(__dirname +"/public"))

app.set("view engine","ejs");
app.use(IndexRoutes)
app.use(CampgroundRoutes)
app.use(CommentRoutes)


app.listen(process.env.PORT, process.env.IP,()=>{
    console.log("Server running");
});
//app.listen(1000)
