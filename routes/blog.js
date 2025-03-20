const {Router} = require("express");
const {loggedInUserOnly} = require("../middlewares/loggedInUserOnly.js")
const {handelGetBlog ,handelGetFeed,
     handelPostBlog,
    handelDeleteBlog} = require("../controllers/blogController.js");



const blogRouter = Router();

blogRouter.get("/",loggedInUserOnly,handelGetBlog );
blogRouter.get("/feed",loggedInUserOnly, handelGetFeed)
blogRouter.post("/publish",loggedInUserOnly,handelPostBlog)
blogRouter.delete("/items/:id",loggedInUserOnly, handelDeleteBlog);



module.exports = {blogRouter}