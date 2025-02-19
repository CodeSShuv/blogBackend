const {Router} = require("express");
const {loggedInUserOnly} = require("../middlewares/loggedInUserOnly.js")
const {handelGetBlog ,
     handelPostBlog,
    handelDeleteBlog} = require("../controllers/blogController.js");



const blogRouter = Router();

blogRouter.get("/",loggedInUserOnly,handelGetBlog );

blogRouter.post("/publish",loggedInUserOnly,handelPostBlog)
blogRouter.delete("/items/:id",loggedInUserOnly, handelDeleteBlog);



module.exports = {blogRouter}