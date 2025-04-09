const {Router} = require("express");
const {loggedInUserOnly} = require("../middlewares/loggedInUserOnly.js");
const {handelGetBlog ,handelGetFeed,
     handelPostBlog,
    handelDeleteBlog, handelGetBlogContent , handelUpdateBlog} = require("../controllers/blogController.js");



const blogRouter = Router();

blogRouter.get("/",loggedInUserOnly,handelGetBlog );
blogRouter.get("/feed",loggedInUserOnly, handelGetFeed);
blogRouter.get("/:id",handelGetBlogContent)
blogRouter.post("/publish",loggedInUserOnly,handelPostBlog)
blogRouter.delete("/items/:id",loggedInUserOnly, handelDeleteBlog);
blogRouter.post('/update/:id',loggedInUserOnly,handelUpdateBlog);



module.exports = {blogRouter}