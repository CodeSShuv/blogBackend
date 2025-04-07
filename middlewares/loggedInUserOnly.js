const { getUser } = require("../services/auth.js")
const loggedInUserOnly = (req, res, next) => {
try {

    const token = req.cookies.token;
    // console.log(token)
    if (!token) return res.status(400).json({ token: false });
    
    const user = getUser(token);
    if(!user) return  res.json({
        user:false
    });
    // console.log("User", user)
    req.user=user;

} catch (err) {
    if (err.name === "TokenExpiredError") {
        return res.status(401).json({ msg: "Token expired, please log in again" });
    } else {
        console.log("token invalid");
        return res.status(400).json({ msg: "Invalid token" });
    }
}
    

    next()
}
module.exports = {
    loggedInUserOnly
}