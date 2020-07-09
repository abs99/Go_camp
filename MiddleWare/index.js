const Campgroundmodel =require("../models/campgrounds")
const comment=require("../models/comment")
const middlewareObj={};

middlewareObj.CheckOwnership = function (req,res,next){
    if(req.isAuthenticated()){
        Campgroundmodel.findById(req.params.id,function(err,camp){
            if(err)console.log(err);
            else{
                if(camp.author.id.equals(req.user._id)){
                    next();
                }
                else{
                   
                    res.redirect("back")
                }
                
            }
        }) 
        
    }
    else{
        req.flash("error","You don't have permission to do that !")
    }
 }
 middlewareObj.CheckCommentOwnership = function(req,res,next){
    if(req.isAuthenticated()){
        comment.findById(req.params.comment_id,function(err,foundcomment){
            if(err){
                req.flash("error","Something Went Wrong")
                console.log(err);
            }
            else{

                if(foundcomment.author.id.equals(req.user._id)){
                    next();
                }
                else{
                    req.flash("error","You don't have permission to do that !")
                    res.redirect("back")
                }
                
            }
        }) 
        
    }
    else{
        req.flash("error","You need to be logged in!")
        res.redirect("back")
    }
 }
 middlewareObj.isLoggedIn = function (req,res,next){
     if(req.isAuthenticated()){
         return next();
     }
     console.log("Not loggen in")
     req.flash("error","You need to be logged in");
     res.redirect("/login");
 }

 module.exports = middlewareObj;