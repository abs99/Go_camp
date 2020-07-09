const  express= require("express");
const router  = express.Router();
const Campgroundmodel = require("../models/campgrounds")
const comment = require("../models/comment");
const middleware = require("../MiddleWare")


router.get("/campgrounds/:id/comments/new",middleware.isLoggedIn,function(req,res){
   
    const id =req.params.id;
    Campgroundmodel.findById(id,function(err,camp){
        if(err){
            console.log(err);
        }
        else{
            res.render("comments/new",{camp:camp})
        }
    })
});
router.post("/campgrounds/:id/comments",middleware.isLoggedIn,(req,res)=>{
    console.log(req.params.id)
    Campgroundmodel.findById(req.params.id)
    .then((camp)=>{
        comment.create(req.body.comment)
        .then((newcomment)=>{
            newcomment.author.id=req.user._id;
            newcomment.author.username=req.user.username;
            newcomment.save();
            console.log(newcomment.author)
            camp.comments.push(newcomment);
            camp.save()
            .then((camp)=>{
                console.log(camp);
                res.redirect("/campgrounds/" + camp._id);
            })
           
        })
        .catch((err)=>{
            console.log(err);
        })
        console.log(camp);
    })
    .catch((err)=>console.log(err));
  
});


router.get("/campgrounds/:id/comments/:comment_id/edit",middleware.CheckCommentOwnership,function(req,res){
    comment.findById(req.params.comment_id,function(err,foundcomment){
        if(err){
            res.redirect("back");
        }else{
            console.log(foundcomment)
            res.render("comments/edit",{camp_id:req.params.id,comment:foundcomment});
        }
    });
    
});

router.put("/campgrounds/:id/comments/:comment_id/",middleware.CheckCommentOwnership,function(req,res){
    comment.findByIdAndUpdate(req.params.comment_id,req.body.comment,function(err,updatedComment){
        if(err){
            res.redirect("back");
        }
        else{
            res.redirect("/campgrounds/"+req.params.id)
        }
    })
});
router.delete("/campgrounds/:id/comments/:comment_id/",middleware.CheckCommentOwnership,function(req,res){
    comment.findByIdAndRemove(req.params.comment_id,function(err){
        if(err){
            req.flash("error","You are not authorized to do that!")
            res.redirect("back");
        }
        else{
            res.redirect("/campgrounds/"+req.params.id)
        }
    })
});





module.exports = router;


