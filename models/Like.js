const {Schema, model}  = require("mongoose");
const likeSchema = new Schema({
    blogId:{type: Schema.Types.ObjectId, ref:"Blog"},
    LikedBy: {type:Schema.Types.ObjectId, ref:"User"}
},{ timestamps: true });
const Like  =  model("Like", likeSchema);
module.exports = {Like};
