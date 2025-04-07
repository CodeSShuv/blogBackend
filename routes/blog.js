const {Router} = require("express");

const {handelGetBlog ,handelGetFeed,
     handelPostBlog,
    handelDeleteBlog, handelGetBlogContent , handelUpdateBlog} = require("../controllers/blogController.js");



const blogRouter = Router();

blogRouter.get("/",handelGetBlog );
blogRouter.get("/feed", handelGetFeed);
blogRouter.get("/:id",handelGetBlogContent)
blogRouter.post("/publish",handelPostBlog)
blogRouter.delete("/items/:id", handelDeleteBlog);
blogRouter.post('/update/:id' ,handelUpdateBlog);



module.exports = {blogRouter}