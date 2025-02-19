const jwt  = require("jsonwebtoken")
const secretKey = "Its_a_secrete"
const setUser = (user)=>{

    const token =  jwt.sign({ id: user._id,firstName:user.firstName,lastName:user.lastName,email:user.email }, secretKey, { expiresIn: "1h" });
   
    return token
}
const getUser = (token)=>{

    const user =  jwt.verify(token , secretKey);
 
    return user;
}
module.exports ={
    setUser, getUser
}