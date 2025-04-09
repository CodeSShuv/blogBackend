const {handelPostComment,handelGetComments,handelGetCommentsCount} = require("../controllers/commentController.js");
const {Router} = require("express");
const {loggedInUserOnly} = require("../middlewares/loggedInUserOnly.js")

const commentRouter = Router();



commentRouter.post("/:id", loggedInUserOnly,handelPostComment);
commentRouter.get("/:id", handelGetComments);
commentRouter.get("/count/:id", handelGetCommentsCount);


module.exports = {commentRouter}