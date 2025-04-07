//This is a handler that handels the request for login 
const handelProfileRequest = (req,res)=>{
   const json = {
      userId:req.user.id,
      firstName:req.user.firstName,
      lastName: req.user.lastName,
      email: req.user.email
  };
   res.json(json);
}
module.exports = { handelProfileRequest}