const {Router} = require("express");
const {handelProfileRequest} = require("../controllers/profileController.js");
const {loggedInUserOnly} = require("../middlewares/loggedInUserOnly.js");
const profileRouter = Router();
profileRouter.get('/',loggedInUserOnly,handelProfileRequest)
module.exports= {profileRouter};