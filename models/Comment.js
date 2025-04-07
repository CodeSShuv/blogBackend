const {Schema, model} = require("mongoose");

const commentSchema = new Schema({
    blogId:{type: Schema.Types.ObjectId, ref:"Blog"},
    commentedBY:{type: Schema.Types.ObjectId, ref:"User"},
    comment:{type:String, required:true}
});

const Comment = model("Comment", commentSchema);
module.exports = {Comment} 
