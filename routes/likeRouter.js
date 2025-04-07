const express = require("express");
const {handelLikeReq,handelGetLikes,handelGetLikeList} = require("../controllers/likeController.js");
const likeRouter = express.Router();
likeRouter.put("/:id", handelLikeReq);
likeRouter.get("/get-total/:id",handelGetLikes);
likeRouter.get("/get-list/:id",handelGetLikeList)
module.exports={likeRouter};