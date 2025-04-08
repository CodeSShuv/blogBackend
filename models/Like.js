const {Schema, model}  = require("mongoose");
const likeSchema = new Schema({
    blogId:{type: Schema.Types.ObjectId, ref:"Blog", required:true},
    likedBy: {type:Schema.Types.ObjectId, ref:"User",required:true}
},{ timestamps: true });
const Like  =  model("Like", likeSchema);
module.exports = {Like};
