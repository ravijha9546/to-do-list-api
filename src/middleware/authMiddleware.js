const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

 const authMiddleware = async(req,res,next)=>{
    const token = req.headers['authorization']?.split(' ')[1];
    if(!token){
        return res.status(401).json({message:'unauthorized'});
    }
    try{
        const decoded = jwt.verify(token, 'qwertyuiop1!2@3#4$5%');
        req.user = await User.findById(decoded.id).select('-password');
        next();
    }catch(err){
        return res.status(401).json({message:'unauthorized'});
    }
 };
 module.exports = authMiddleware;