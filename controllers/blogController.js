const { Blog,Link } = require("../models/Blog.js")
const {getLikesCount} = require("../services/getLikesCount.js");
// const { User } = require("../models/User.js");

//Getting all private and  public notes .
const handelGetBlog = async (req, res) => {
    const user = req.user
    const blog = await Blog.find({ userId: user.id })
    
    if (!blog || blog.length === 0) return res.json({ msg: "no notes Available" })
    res.json({ blogs: blog })
}
//For getting the full content of a blog. 
const handelGetBlogContent = async (req,res)=>{
    // console.log()
    const blog = await Blog.findById(req.params.id).populate("userId", "firstName lastName");
    // console.log(blog);
    if(!blog) return res.status(404).send("404 not found! ")
        
    res.json({blog:blog});
}
//Feed Creation.
const handelGetFeed = async (req, res) => {
    
    const blog = await Blog.find({ visibility: "Public" }).populate("userId", "firstName lastName");
    
 
    if (!blog || blog.length === 0) return res.json({ msg: "no notes available" });
 
    res.json({ blogs: blog })
} 

//Inserting new blogs 
const handelPostBlog = async (req, res) => {
    const { title, content, visibility } = req.body;
    const user = req.user

    const blog = new Blog({
        userId: user.id,
        title: title,
        content: content,
        visibility: visibility
    });
    await blog.save();
    res.status(200).json({ msg: "blog published" });
}

//Deleting existing blog. 
const handelDeleteBlog = async (req, res) => {
    try {
        const deletedItem = await Blog.deleteOne({ _id: req.params.id });

        if (!deletedItem) return res.status(404).json({ msg: "Item not found" });
        res.json({ msg: "Item deleted successfully" });

    } catch (error) {
        res.status(500).json({ msg: "Internal Server Error" });
    }
}


const handelUpdateBlog = async (req,res) =>{
    const { title, content, visibility} = req.body;
    try{
        const update = {
            ...(title !== null && { title }),
            ...(content !== null && { content }),
            ...(visibility !== null && { visibility }),
          };
      
          const result = await Blog.updateOne({ _id: req.params.id }, { $set: update });
        

        res.json({err:null, msg:"Updated Successfully."})
    }
    catch(e){
        console.log(e);
        res.json({err:"Some error occurred.", msg:null})
    }
}

module.exports = { handelGetBlog, handelPostBlog, handelDeleteBlog, handelGetFeed,handelGetBlogContent,handelUpdateBlog }