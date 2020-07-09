const mongoose = require("mongoose");
const campgroundSchema = new mongoose.Schema({
    name:String,
    image:String,
    description:String,
    comments:
    [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref:"comment"
        }

    ],
    author : {
        id:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        },
        username:String
    }
});
const Campgroundmodel=mongoose.model("Campground",campgroundSchema);

module.exports = Campgroundmodel;