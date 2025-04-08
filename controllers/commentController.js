const {Comment} = require("../models/Comment.js");
const {Blog} = require("../models/Blog.js");


const getCommentsCount = async(blogId)=>{
    const totalCount = await Comment.find({blogId:blogId});
    return totalCount;
}
const handelPostComment = async(req,res)=>{

    const {userId} = req.user.userId;
    const {comment} = req.body;
    const blogId = req.params.id;

    try{
        const commentInstance =  new Comment({blogId : blogId, commentedBY:userId, comment:comment});
        await commentInstance.save();
        const newCount =await getCommentsCount(blogId);
        await Blog.update({blogId:blogId}, {$set:{commentsCount:newCount}});
    }catch(e){
        res.status(500).json({msg:"Internal Server Error. "});
    }

}

module.exports ={handelPostComment}