const {Schema,model} = require("mongoose");
const userSchema = new Schema({
    firstName:{type:String, require:true},
    lastName:{type:String},
    email:{type:String, require:true, unique:true },
    password:{type:String, require:true}
});
const User = model("User", userSchema);
module.exports ={ User};