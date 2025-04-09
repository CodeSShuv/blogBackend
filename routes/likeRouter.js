const express = require("express");
const {loggedInUserOnly} = require("../middlewares/loggedInUserOnly.js")
const {handelLikeReq,handelGetLikes,handelGetLikeList} = require("../controllers/likeController.js");
const likeRouter = express.Router();
likeRouter.put("/:id",loggedInUserOnly, handelLikeReq);
likeRouter.get("/get-total/:id",handelGetLikes);
likeRouter.get("/get-list/:id",handelGetLikeList)
module.exports={likeRouter};