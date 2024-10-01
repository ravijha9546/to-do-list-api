const jwt = require('jsonwebtoken');
const User= require('../models/userModel');

// Genrate JWT Token
const generateToken = (id)=>{
    return jwt.sign({ id }, 'qwertyuiop1!2@3#4$5%',{ expiresIn : '1h'});
};

//Register User
exports.registerUser = async(req,res)=>{
    const { username , password} = req.body;
    try{
        let user = await User.findOne({username});
        if(user){
            return res.status(400).json({message: 'User already exist'});
        }
        user = new User ({username, password});
        await user.save();
        res.status(201).json({
            token: generateToken(user._id),
        });
    } catch(err){
        res.status(500).json({message: ' Server Error'});
    }
};
//login User
exports.loginUser = async(req,res) =>{
       const { username , password} = req.body;
       try{
        const user = await User.findOne({username});
        if(!user || !(await user.comparePassword(password))){
            return res.status(400).json({message:'Invalid Credantials'});

        }
        return res.status(200).json({token: generateToken(user._id)});
       }catch(err){
        return res.status(500).json({message: 'Server error'});
       }
};

