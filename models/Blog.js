const {Schema,model} = require("mongoose");
const blogSchema = new Schema({
    userId:  { type: Schema.Types.ObjectId, ref: "User" } // Linking to User
    ,
    title:String,
    content:String,
    visibility:{type: String, require:true},
    likesCount:{type:Number, default:0},
    commentsCount:{type:Number, default:0}
    
}, { timestamps: true });
const Blog = model("Blog", blogSchema);
module.exports = {Blog}