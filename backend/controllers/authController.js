const bcrypt = require('bcrypt');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const signup = async (req,res)=>{
    try{
        const {name, email, password} = req.body;
        const user = await User.findOne({email});
        if(user){
            return res.status(409).json({message:"user already Exists", success:false})
        }

        const userData = new User({name, email,password});
        userData.password = await bcrypt.hash(password,10);
        const result = await userData.save();
        return res.status(201).json({message: "User Added Successfully", success : true});
    }catch(err){
        res.status(500)
        .json({
            message:"internal server error",
            success:false
        })
    }

};


const login = async (req,res)=>{
    try{
        const { email, password} = req.body;
        const user = await User.findOne({email});
        const errorMsg = "Email or Password is Incorrect";
        if(!user){
            return res.status(403).json({message:errorMsg, success:false});
        }
        const isPassEqual = await bcrypt.compare(password, user.password); 
        if(!isPassEqual){
            return res.status(403).json({message:errorMsg, success:false});
        }

        const jwtToken = jwt.sign({email:user.email,_id:user._id},process.env.JWT_SECRET,
            {expiresIn:'24h'}
        )

        return res.status(200).json({
            message:"Log in Success",
            success:true,
            jwtToken,
            email,
            name:user.name
        })
    }catch(err){
        res.status(500)
        .json({
            message:"internal server error",
            success:false
        })
    }

};

module.exports = {
    signup,
    login
}