const {Router} = require("express");
const {signupController,loginControler} = require("../controllers/userController.js");
const userRouter = Router();
userRouter.post("/signup",signupController ).post("/login",loginControler);
module.exports = userRouter;