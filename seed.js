const mongoose = require("mongoose");
const Campground = require("./models/campgrounds");
const comments = require("./models/comment");

let data = [
    {
        name:"Cloud's Rest",
        image:"https://images.pexels.com/photos/1061640/pexels-photo-1061640.jpeg?auto=compress&cs=tinysrgb&h=350",
        description:"This is rest in clouds"
    },
    {
        name:"Sun Land",
        image:"https://images.pexels.com/photos/1230302/pexels-photo-1230302.jpeg?auto=compress&cs=tinysrgb&h=350",
        description:"The sunshine land"
    },
    {
        name:"Heaven Trek",
        image:"https://pixabay.com/get/57e1dd4a4350a514f1dc84609620367d1c3ed9e04e507440712e73d7944fc2_340.jpg",
        description:"Trek to heaven"
    }
]
function seedDB(){
    // Remove All Campgrounds
    Campground.deleteMany({},(err)=>{
        // if(err){
        //     console.log(err);
        // }
        // else{
        //     console.log("removed campground");
        // }
        // data.forEach(function(seed){
        //     Campground.create(seed,function(err,campground){
        //         if(err)console.log(err);
        //         else{
        //             console.log("added a campground");
        //             comments.create({
        //                       text:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        //                       author:"Jon Snow"
        //                     })
        //                     .then((comment)=>{
        //                         campground.comments.push(comment);
        //                         campground.save();
        //                         console.log("Added a comment")
        //                     })
        //                     .catch((err)=>console.log(err));
                    
        //         }
        //     });
    
        // })
     })
    //add  a few campgrounds
    
    

}
module.exports = seedDB;