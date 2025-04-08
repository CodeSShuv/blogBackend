const {handelPostComment} = require("../controllers/commentController.js");
const {Router} = require("express");


const commentRouter = Router();



commentRouter.post("/:id",handelPostComment);



module.exports = {commentRouter}