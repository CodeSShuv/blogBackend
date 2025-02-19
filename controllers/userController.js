const { User } = require("../models/User.js")
const bcrypt = require('bcrypt');

// const { v4: uuidv4 } = require("uuid")
const { setUser } = require("../services/auth.js")

const signupController = async (req, res) => {

    const { firstName, lastName, email, password } = req.body;
    //checking if the password is a valid string or not..
    if (typeof password != "string" || !password.trim()) return res.status(400).json({ msg: "password cannot be empty password" })
    //for hashing a  passwrd , the password must be a string.
    bcrypt.hash(password, 4, async function (err, hash) {
        if (!err) {
            const user = new User({
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: hash
            })
            await user.save();
           return res.json({ msg: "Received."});
        }
        res.status(500).json({ msg: "Internal Server Error" });

    });

}



const loginControler = async (req, res) => {
    
    try {
        

        const { email, password } = req.body;
        
        if (typeof password != "string") return res.json({ msg: "password must be a string" })
        const user = await User.findOne({ email: email });

        if (!user) return res.json({ msg: "User not found " })
    
        const isMatch = await bcrypt.compare(password, user.password)

        if (isMatch) {
            const json = {
                userId:user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email
            };
           
           const token =  setUser(user)

           res.cookie("token", token);

            return res.json(json);
        } else if (!isMatch) {
            return res.json({ msg: "Incorrect email or password" });
        }
    } catch (e) {
        res.json({ msg: "oops some error occured" })
    }



}
module.exports = {
    signupController,
    loginControler
}