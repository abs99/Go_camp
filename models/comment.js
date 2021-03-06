const mongoose = require("mongoose");
const commentSchema = mongoose.Schema({
    text:String,
    author:String,
    author:{
        id:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        },
        username:String
    }
});
module.exports = mongoose.model("comment",commentSchema);
