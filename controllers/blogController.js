const { Blog } = require("../models/Blog.js")
const { User } = require("../models/User.js")
const handelGetBlog = async (req, res) => {
    const user = req.user
    const blog = await Blog.find({ userId: user.id })

    if (!blog || blog.length === 0) return res.json({ msg: "no notes Available" })
    res.json({ blogs: blog })
}

const handelGetFeed = async (req, res) => {
    const blog = await Blog.find({ visibility: "Public" }).populate("userId", "firstName lastName");

    console.log(blog)
    if (!blog || blog.length === 0) return res.json({ msg: "no notes available" });
    // const arr = blog.map((ele) => {
    //     const modal = {
    //         _id: ele._id,
    //         userName:
    //         title: ele.title,
    //         content: ele.content,
    //         visibility: ele.visibility,
    //         createdAt: ele.createdAt,
    //         updatedAt: ele.updatedAt,
    //     }
    // })
    res.json({ blogs: blog })
}


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
const handelDeleteBlog = async (req, res) => {
    try {
        const deletedItem = await Blog.deleteOne({ _id: req.params.id });

        if (!deletedItem) return res.status(404).json({ msg: "Item not found" });
        res.json({ msg: "Item deleted successfully" });

    } catch (error) {
        res.status(500).json({ msg: "Internal Server Error" });
    }
}

module.exports = { handelGetBlog, handelPostBlog, handelDeleteBlog, handelGetFeed }