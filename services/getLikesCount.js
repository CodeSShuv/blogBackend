const {mongoose} = require("mongoose")
const {Like} = require('../models/Like.js');
const getLikesCount = async(blogId)=>{
   
    const totalLikes =await Like.countDocuments({ blogId: new mongoose.Types.ObjectId(blogId) });
    
    return totalLikes-1;
}

module.exports={
    getLikesCount
}