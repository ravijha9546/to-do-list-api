const Task = require('../models/taskModel');

//Create a Task

exports.createTask = async(req,res)=>{
    const {title, description} = req.body;
    try{
        const task = new Task({title, description,userId: req.user._id});
        await task.save();
         res.status(200).json(task);
    }catch(err){
         res.status(500).json({message:'Server Error'});
    }

};
//Get task with optional filtering by status

exports.getTask = async(req,res)=>{
    const {status} = req.query;
    try{
        const query = {userId: req.user._id};
        if(status) query.status=status;
        const tasks = await Task.find(query);
        res.status(200).json(tasks);
    }catch(err){
        res.status(500).json({message:'Server Error'});
    }

};

//Get task by id
 exports.getTaskById = async(req,res)=>{
    try{
        const task = await Task.findOne({_id:req.params.id,userId:req.user._id});
        if(!task) return res.status(404).json({mesaage: ' Task not found'});
        res.status(200).json(task);
    }catch(err){
        res.status(500).json({message:'Server Error'});
    }
 };
 
 //Update Task Status
 exports.updateTask = async(req,res)=>{
    try{
        const task = await Task.findOne({_id:req.params.id,userId:req.user._id});
        if(!task) return res.status(500).json({message:'Task not found'});
        task.status = req.body.status|| task.status;
        await task.save();
        res.status(200).json(task);
    }catch(err){
        res.status(500).json({message:'Server Error'});
    }
 };

 //Delete a task 
 exports.deleteTask = async(req,res)=>{
    try{
        const task = await Task.findOne({_id:req.params.id,userId:req.user._id});
        if(!task) return res.status(404).jspn({message:'Task not found'});
        res.status(204).send();
    }catch(err){
        res.status(500).json({message:'Server Error'});
    }
 };
 