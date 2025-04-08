const { Blog } = require("../models/Blog.js");
const { Like } = require("../models/Like.js");
const { getLikesCount } = require("../services/getLikesCount.js");

const handelLikeReq = async (req, res) => {
    const userId = req.user.id;

    const blogId = req.params.id;
    try {
        //Searching if the blog is already liked by the user. 
        const existingLike = await Like.findOne({ blogId: blogId, likedBy: userId })

        if (!existingLike) {
            //Not liked yet, Then Like the blog
            const newLike = new Like({ blogId: blogId, likedBy: userId });
            // console.log(newLike)
            await newLike.save();
            const newLikeCount =( await getLikesCount(blogId)+1);

            await Blog.updateOne({ _id: blogId }, { $set: { likesCount: newLikeCount } });


            res.status(200).json({ msg: "Liked" })
        } else {
            //Already Liked, Then Unlike the blog 
            await Like.deleteOne({ _id: existingLike._id });
            const newLikeCount =( await getLikesCount(blogId)+1);
            await Blog.updateOne({ _id: blogId }, { $set: { likesCount: newLikeCount } });

            res.status(200).json({ msg: "Unliked" })

        }

    } catch (e) {
        console.log(e)
        res.status(500).json({ msg: "Something went wrong." })
    }

}




const handelGetLikes = async(req, res) => {
    const blogId = req.params.id;
    const totalLikes =await Like.countDocuments({ blogId: blogId });
    // console.log(totalLikes)
        res.status(200).json({ totalLikes })
    
}

const handelGetLikeList = async (req, res) => {
    const blogId = req.params.id;
    try {
        const likeList = await Like.find({ blogId: blogId })

        res.status(200).json({ likes: likeList });
    } catch (error) {
        res.status(500).json({ msg: "Something went wrong." })
    }
    
}
module.exports = { handelLikeReq, handelGetLikes ,handelGetLikeList}