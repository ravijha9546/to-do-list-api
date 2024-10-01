const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
 const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
 });
 //Hash the password before saving it to the server
 userSchema.pre('save',async function(next){
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password,10);
    }
    next();
 });
 //compare entered password with stored hash password
 userSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password,this.password);
 };
 module.exports = mongoose.model('user',userSchema);
