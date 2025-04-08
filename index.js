const express =require("express");
const cors = require("cors")
const cookieParser = require("cookie-parser");
const connectToDb = require("./connectToDb.js");
const signUpRouter = require("./routes/user.js");
const {blogRouter} =require("./routes/blog.js")
const {profileRouter} = require("./routes/profile.js")
const {loggedInUserOnly} = require("./middlewares/loggedInUserOnly.js");
const {likeRouter} =require("./routes/likeRouter.js");
const {commentRouter} =require("./routes/commentRouter.js");
const app = express();
connectToDb();
app.use(cors({origin:true,credentials:true}));
app.options('*', cors());  // This explicitly handles preflight OPTIONS requests
app.use(express.json());
app.use(cookieParser())
app.use("/auth",signUpRouter);
app.use("/profile",profileRouter);
app.use("/blogs",loggedInUserOnly,blogRouter );
app.use("/like",loggedInUserOnly,likeRouter);
app.use("/comment", loggedInUserOnly, commentRouter);
app.listen(8080, ()=>{
    console.log("Server listening at 8080 . ");
});