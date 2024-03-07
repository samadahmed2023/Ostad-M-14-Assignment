const TodoListModel = require("../model/TodoListModel");
const ProfileModel = require("../model/ProfileModel");


exports.CreateTodo=(req,res)=>{
    let reqBody = req.body;

    let UserName = req.headers["UserName"];
    let TodoSubject = reqBody["TodoSubject"];
    let TodoDescription = reqBody["TodoDescription"];
    let TodoStatus = "New";
    let TodoCreateDate = Date.now();
    let TodoUpdateDate = Date.now();

    let PostBody={
        UserName: UserName,
        TodoSubject: TodoSubject,
        TodoDescription: TodoDescription,
        TodoStatus: TodoStatus,
        TodoCreateDate: TodoCreateDate,
        TodoUpdateDate: TodoUpdateDate
    }

    TodoListModel.create(PostBody, (err,data)=>{
        if(err){
            res.status(400).json({status: "fail", data: err})
        }else{
            res.status(200).json({status: "success", data: data})
        }
    })

}


exports.SelectTodo=(req,res)=>{
    let UserName = req.headers["UserName"];

    ProfileModel.find({UserName:UserName}, (err,data)=>{
        if(err){
            res.status(400).json({status:"fail", data: err})
        }else{
            res.status(200).json({status: "success", data: data})
        }
    })
}


exports.UpdateTodo=(req,res)=>{
    let _id = req.body["_id"];
    let TodoSubject = req.body["TodoSubject"];
    let TodoDescription = req.body["TodoDescription"];
    let TodoUpdateDate = Date.now();

    let PostBody={
        TodoSubject:TodoSubject,
        TodoDescription:TodoDescription,
        TodoUpdateDate:TodoUpdateDate
    }
    TodoListModel.updateOne({_id:_id},{$set:PostBody},{upsert:true},(err,data)=>{
        if(err){
            res.status(400).json({status: "fail", data: err})
        }else{
            res.status(200).json({status: "success", data: data})
        }
    })
}


exports.UpdateStatusTodo=(req,res)=>{
    let _id = req.body["_id"];
    let TodoStatus = req.body["TodoStatus"];
    let TodoUpdateDate = Date.now();

    let PostBody = {
        TodoStatus:TodoStatus,
        TodoUpdateDate:TodoUpdateDate,
    }
    TodoListModel.updateOne({_id:_id},{$set:PostBody},{upsert:true},(err,data)=>{
        if(err){
            res.status(400).json({status: "fail", data: err})
        }else{
            res.status(400).json({status: "success", data: data})
        }
    })
}


exports.RemoveTodo=(req,res)=>{
    let _id = req.body["_id"];

    TodoListModel.remove({_id:_id},(err,data)=>{
        if(err){
            res.status(400).json({status: "fail", data: err})
        }else{
            res.status(200).json({status: "success", data: data})
        }
    })

}


exports.SelectTodoByStatus=(req,res)=>{
    let UserName = req.headers["UserName"];
    let TodoStatus = req.body["TodoStatus"];

    TodoListModel.find({UserName:UserName,TodoStatus:TodoStatus},(err,data)=>{
        if(err){
            res.status(400).json({status: "fail", data: err})
        }else{
            res.status(200).json({status: "success", data: data})
        }
    })
}


exports.SelectTodoByDate=(req,res)=>{
    let UserName = req.headers["UserName"];
    let FormDate = req.body["FormDate"];
    let ToDate = req.body["ToDate"];

    TodoListModel.find({UserName:UserName, TodoCreateDate:{$gte:new Date(FormDate),$lte: new Date(ToDate)}},(err,data)=>{
        if(err){
            res.status(400).json({status: "fail", data: err})
        }else{
            res.status(200).json({status: "success", data: data})
        }
    })

}