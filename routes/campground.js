
const  express= require("express");
const router  = express.Router()
const Campgroundmodel = require("../models/campgrounds");
const middleware = require("../MiddleWare")

router.get("/campgrounds",function(req,res){
    Campgroundmodel.find({}).then((data)=>{
     console.log(req.user);
     res.render("campgrounds/campgrounds",{campgrounds:data,currentUser:req.user})  
    }).catch((err)=>{
        console.log(err)
    }) ;  
 });
 router.get("/campgrounds/new",middleware.isLoggedIn,function(req,res){
    
     res.render("campgrounds/new");
 })
 
 router.post("/campgrounds",middleware.isLoggedIn,function(req,res){

    var name= req.body.name;
    var image =req.body.image;
    var description =req.body.description;
    var author={
         id:req.user._id,
         username:req.user.username
    }
    var newcamp={name:name,image:image,description:description,author:author};
    Campgroundmodel.create(newcamp).then((camp)=>{
      console.log(camp)
        res.redirect("/campgrounds");
    }).catch((err)=>{
        console.log(err);
    });
   
 })
 router.get("/campgrounds/:id",function(req,res){
    
     Campgroundmodel.findById(req.params.id).populate("comments").exec(function(err,camp){
         if(err){
             console.log(err);
         }
         else{
            
             res.render("campgrounds/show",{camp:camp});
         }
     })
     
 });
 //EDIT
 router.get("/campgrounds/:id/edit",middleware.CheckOwnership,function(req,res){
        Campgroundmodel.findById(req.params.id,function(err,camp){
            res.render("campgrounds/edit",{camp:camp});              
        })
 });

 //UPDATE

 router.put("/campgrounds/:id",middleware.CheckOwnership,function(req,res){
     Campgroundmodel.findByIdAndUpdate(req.params.id,req.body.camp,function(err,camp){
         if(err){
             res.redirect("/campgrounds");
         }
         else{
             res.redirect("/campgrounds/"+req.params.id)
         }
     })
 });

 router.delete("/campgrounds/:id",middleware.CheckOwnership,function(req,res){
    Campgroundmodel.findByIdAndRemove(req.params.id,function(err){
        if(err){
            res.redirect("/campgrounds")
        }
        else{
            res.redirect("/campgrounds");
        }
    })  
   
 });
 
module.exports = router;
