const {Comment} = require("../models/Comment.js");
const {Blog} = require("../models/Blog.js");


const getCommentsCount = async(blogId)=>{
    try{

        const totalCount = await Comment.countDocuments({blogId:blogId});
        console.log(totalCount)
        return totalCount;
    }catch{
        return null;
    }
}


const handelPostComment = async(req,res)=>{

    const userId= req.user.id;
    const {comment} = req.body;
    const blogId = req.params.id;
   

    try{
        const commentInstance =  new Comment({blogId : blogId, commentedBY:userId, comment:comment});
       
       const  result =  await commentInstance.save();
   
        const newCount =await getCommentsCount(blogId);
        
        await Blog.findByIdAndUpdate({_id:blogId}, {commentsCount:newCount});
        res.status(200).json({msg:"Commented"})
    }catch(e){
        console.log(e)
        res.status(500).json({msg:"Internal Server Error. "});
    }

}


const handelGetComments = async(req,res)=>{
    try{
      
        // const userId = req.user.id;
        const blogId = req.params.id;
        const newComment = await Comment.find({blogId:blogId}).populate("commentedBY", "firstName lastName");
        res.status(200).json({comments:newComment});
    }catch(e)
    {
        res.status(500).json({msg:"Something went wrong."});
    }
    
}



const handelGetCommentsCount = async(req,res)=>{
    const blogId = req.params.id;
    const totalComments = await getCommentsCount(blogId);
    if (totalComments === null) return res.status(500).json({msg: "Internal Server Error."});
    res.status(200).json({commentCount:totalComments});

}
module.exports ={handelPostComment,handelGetCommentsCount,handelGetComments}