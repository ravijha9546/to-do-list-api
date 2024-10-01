const mongoose = require('mongoose');
const taskSchema = new mongoose.Schema({
    title:{type:String,required:true},
    description:{type:String},
    status:{type:String,default:'pending'},
    userId : {type:mongoose.Schema.Types.ObjectId,ref:'user',required :true},

});
module.export = mongoose.model('Task',taskSchema);