const ProfileModel = require("../model/ProfileModel");
let jwt = require('jsonwebtoken');


exports.CreateProfile =(req,res)=>{
    let reqBody = req.body;
    ProfileModel.create(reqBody, (err,data)=>{
        if(err){
            res.status(400).json({status:"fail", data: err})
        }else{
            res.status(200).json({status:"success", data: data})
        }
    })
}


exports.UserLogin =(req,res)=>{
    let UserName = req.body["UserName"];
    let Password = req.body["Password"];

    ProfileModel.find({UserName:UserName, Password:Password},(err,data)=>{
        if(err){
            res.status(400).json({status:"fail", data: err})
        }else{
            if(data.length > 0){
                let Payload = {
                    exp: Math.floor(Date.now() / 1000) + ( 24 * 60 * 60),
                    data: data[0]
                }
                let token = jwt.sign( Payload, "SecretKey1234")
                res.status(200).json({status:"success", token:token, data:data[0]})
            }else{
                res.status(401).json({status: "Unauthorized"})
            }
        }
    })
}


exports.SelectProfile=(req,res)=>{
    let UserName = req.headers["UserName"];

    ProfileModel.find({UserName:UserName}, (err,data)=>{
        if(err){
            res.status(400).json({status:"fail", data: err})
        }else{
            res.status(200).json({status: "success", data: data})
        }
    })
}


exports.UpdateProfile=(req,res)=>{
    let UserName = req.headers["UserName"];
    let reqBody = req.body;

    res.status(200).json(reqBody)
}




